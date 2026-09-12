<?php

use App\Models\Project;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('administrators can visit the dashboard', function () {
    $user = User::factory()->create(['is_portfolio_admin' => true]);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard includes drafts and orders projects by position then id', function () {
    $admin = User::factory()->create(['is_portfolio_admin' => true]);
    $first = Project::factory()->create(['sort_order' => 10]);
    $second = Project::factory()->create(['sort_order' => 10, 'is_published' => true]);
    $featured = Project::factory()->create(['sort_order' => 20, 'is_featured' => true, 'is_published' => true]);

    $this->actingAs($admin)->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('projects', 3)
            ->where('projects.0.id', $first->id)
            ->where('projects.0.is_published', false)
            ->where('projects.1.id', $second->id)
            ->where('projects.2.id', $featured->id));
});
