<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage-projects') ?? false;
    }

    /** @return array<string, array<mixed>> */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'category' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:3000'],
            'technologies' => ['required', 'array', 'min:1', 'max:12'],
            'technologies.*' => ['required', 'string', 'max:40', 'distinct'],
            'repository_url' => ['nullable', 'url:http,https', 'max:2048'],
            'demo_url' => ['nullable', 'url:http,https', 'max:2048'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'remove_image' => ['sometimes', 'boolean'],
            'icon' => ['required', Rule::in(['code', 'users', 'calendar', 'clock', 'search', 'layers'])],
            'is_published' => ['required', 'boolean'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0', 'max:9999'],
        ];
    }
}
