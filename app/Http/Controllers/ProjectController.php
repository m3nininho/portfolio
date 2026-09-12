<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'projects' => Project::query()->ordered()->get()->map->portfolioData(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('projects/form', ['project' => null]);
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('projects/form', ['project' => $project->portfolioData()]);
    }

    public function store(SaveProjectRequest $request): RedirectResponse
    {
        $this->save($request, new Project);

        return to_route('dashboard')->with('success', 'Projeto adicionado.');
    }

    public function update(SaveProjectRequest $request, Project $project): RedirectResponse
    {
        $this->save($request, $project);

        return to_route('dashboard')->with('success', 'Projeto atualizado.');
    }

    private function save(SaveProjectRequest $request, Project $project): void
    {
        $data = $request->safe()->except(['image', 'remove_image']);
        $oldImage = $project->image_path;
        $newImage = $request->file('image')?->store('projects', 'public');

        if ($newImage) {
            $data['image_path'] = $newImage;
        } elseif ($request->boolean('remove_image')) {
            $data['image_path'] = null;
        }

        try {
            $project->fill($data)->save();
        } catch (\Throwable $exception) {
            if ($newImage) {
                Storage::disk('public')->delete($newImage);
            }

            throw $exception;
        }

        if ($oldImage && $oldImage !== $project->image_path) {
            Storage::disk('public')->delete($oldImage);
        }
    }
}
