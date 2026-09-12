<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'projects' => Project::query()
                ->published()
                ->orderByDesc('is_featured')
                ->ordered()
                ->get()
                ->map->portfolioData(),
        ]);
    }
}
