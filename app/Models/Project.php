<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property array<int, string> $technologies
 */
#[Fillable([
    'title',
    'category',
    'description',
    'technologies',
    'repository_url',
    'demo_url',
    'image_path',
    'icon',
    'is_published',
    'is_featured',
    'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /** @param Builder<Project> $query */
    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('is_published', true);
    }

    /** @param Builder<Project> $query */
    #[Scope]
    protected function ordered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * @return array{
     *     id: int, title: string, category: string, description: string,
     *     technologies: array<int, string>, repository_url: string|null,
     *     demo_url: string|null, image_url: string|null, icon: string,
     *     is_published: bool, is_featured: bool, sort_order: int
     * }
     */
    public function portfolioData(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'description' => $this->description,
            'technologies' => $this->technologies,
            'repository_url' => $this->repository_url,
            'demo_url' => $this->demo_url,
            'image_url' => $this->image_path ? Storage::disk('public')->url($this->image_path) : null,
            'icon' => $this->icon,
            'is_published' => $this->is_published,
            'is_featured' => $this->is_featured,
            'sort_order' => $this->sort_order,
        ];
    }
}
