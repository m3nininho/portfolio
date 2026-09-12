<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3), 'category' => 'Aplica??o web',
            'description' => fake()->paragraph(), 'technologies' => ['Laravel', 'React'],
            'repository_url' => 'https://github.com/example/project',
            'demo_url' => null, 'image_path' => null, 'icon' => 'code',
            'is_published' => false, 'is_featured' => false, 'sort_order' => 0,
        ];
    }
}
