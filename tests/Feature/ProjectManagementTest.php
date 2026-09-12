<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('public registration is unavailable', function () {
    $this->get('/register')->assertNotFound();
    $this->post('/register', ['name' => 'Visitor', 'email' => 'visitor@example.com', 'password' => 'password', 'password_confirmation' => 'password'])->assertNotFound();
    $this->assertDatabaseCount('users', 0);
});

test('only administrators can manage projects', function () {
    $visitor = User::factory()->create();
    $admin = User::factory()->create(['is_portfolio_admin' => true]);
    expect(Gate::forUser($visitor)->allows('manage-projects'))->toBeFalse();
    expect(Gate::forUser($admin)->allows('manage-projects'))->toBeTrue();

    $project = Project::factory()->create();
    $this->get(route('projects.create'))->assertRedirect(route('login'));
    $this->post(route('projects.store'), [])->assertRedirect(route('login'));
    $this->actingAs($visitor)->get(route('dashboard'))->assertForbidden();
    $this->actingAs($visitor)->get(route('projects.edit', $project))->assertForbidden();
    $this->actingAs($visitor)->put(route('projects.update', $project), ['title' => 'Changed'])->assertForbidden();
    $this->actingAs($visitor)->post(route('projects.store'), [])->assertForbidden();
    expect($project->fresh()->title)->not->toBe('Changed');
    $this->assertDatabaseCount('projects', 1);
});

test('administrator can create a draft with an image and publish edits', function () {
    Storage::fake('public');
    $admin = User::factory()->create(['is_portfolio_admin' => true]);
    $payload = Project::factory()->make()->only(['title', 'category', 'description', 'technologies', 'repository_url', 'demo_url', 'icon', 'is_published', 'is_featured', 'sort_order']);
    $this->actingAs($admin)->post(route('projects.store'), [
        ...$payload, 'image' => UploadedFile::fake()->image('cover.png'),
    ])->assertRedirect(route('dashboard'))->assertSessionHas('success');
    $project = Project::query()->sole();
    expect($project->title)->toBe($payload['title'])
        ->and($project->is_published)->toBeFalse();
    Storage::disk('public')->assertExists($project->image_path);
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page->component('welcome')->has('projects', 0));

    $this->get(route('projects.edit', $project))->assertInertia(fn (Assert $page) => $page->component('projects/form')->where('project.id', $project->id));
    $oldImage = $project->image_path;
    $this->post(route('projects.update', $project), [
        ...$payload, '_method' => 'put', 'title' => 'Updated project', 'is_published' => true,
        'sort_order' => 12, 'image' => UploadedFile::fake()->image('new.png'),
    ])->assertRedirect(route('dashboard'));
    $project->refresh();
    expect($project->title)->toBe('Updated project')->and($project->is_published)->toBeTrue()->and($project->sort_order)->toBe(12);
    Storage::disk('public')->assertMissing($oldImage);
    Storage::disk('public')->assertExists($project->image_path);

    $this->put(route('projects.update', $project), [...$payload, 'remove_image' => true])->assertRedirect(route('dashboard'));
    Storage::disk('public')->assertMissing($project->image_path);
    expect($project->fresh()->image_path)->toBeNull();
});

test('project validation rejects unsafe links and non images without saving', function () {
    Storage::fake('public');
    $admin = User::factory()->create(['is_portfolio_admin' => true]);
    $payload = Project::factory()->make()->toArray();
    $this->actingAs($admin)->post(route('projects.store'), [
        ...$payload, 'repository_url' => 'javascript:alert(1)', 'demo_url' => 'data:text/html,bad',
        'image' => UploadedFile::fake()->create('script.svg', 1, 'image/svg+xml'),
        'sort_order' => -1, 'title' => '', 'technologies' => [],
    ])->assertSessionHasErrors(['title', 'technologies', 'repository_url', 'demo_url', 'image', 'sort_order']);
    $this->assertDatabaseCount('projects', 0);
    Storage::disk('public')->assertDirectoryEmpty('projects');
});

test('portfolio shows only published projects in configured order', function () {
    Project::factory()->create(['title' => 'Draft', 'is_featured' => true]);
    Project::factory()->create(['title' => 'Last', 'is_published' => true, 'sort_order' => 20]);
    Project::factory()->create(['title' => 'First', 'is_published' => true, 'sort_order' => 5]);
    Project::factory()->create(['title' => 'Same position', 'is_published' => true, 'sort_order' => 5]);
    Project::factory()->create(['title' => 'Featured', 'is_published' => true, 'is_featured' => true, 'sort_order' => 30]);
    $this->get(route('home'))->assertInertia(fn (Assert $page) => $page->component('welcome')
        ->has('projects', 4)->where('projects.0.title', 'Featured')->where('projects.1.title', 'First')->where('projects.2.title', 'Same position')->where('projects.3.title', 'Last'));
});

test('administrator can save without replacing an existing image and cannot assign an arbitrary path', function () {
    $admin = User::factory()->create(['is_portfolio_admin' => true]);
    $project = Project::factory()->create(['image_path' => 'projects/existing.png']);
    $payload = $project->only(['title', 'category', 'description', 'technologies', 'repository_url', 'demo_url', 'icon', 'is_published', 'is_featured', 'sort_order']);
    $this->actingAs($admin)->put(route('projects.update', $project), [...$payload, 'image_path' => '../secret'])->assertRedirect(route('dashboard'));
    expect($project->fresh()->image_path)->toBe('projects/existing.png');
});

test('admin command authorizes an existing account without changing its password', function () {
    $user = User::factory()->create();
    $password = $user->password;
    $this->artisan('portfolio:admin', ['email' => $user->email])->assertSuccessful();
    expect($user->fresh()->is_portfolio_admin)->toBeTrue()->and($user->fresh()->password)->toBe($password);
    $this->artisan('portfolio:admin', ['email' => 'missing@example.com'])->assertFailed();
});

test('published project text is escaped in the public page', function () {
    Project::factory()->create(['title' => '<script>alert(1)</script>', 'is_published' => true]);
    $this->get(route('home'))->assertDontSee('<script>alert(1)</script>', false)
        ->assertInertia(fn (Assert $page) => $page->where('projects.0.title', '<script>alert(1)</script>'));
});
