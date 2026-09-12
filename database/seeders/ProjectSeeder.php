<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [[
            'title' => 'Portfólio com painel de gestão',
            'category' => 'Desenvolvimento full stack',
            'description' => "Além de apresentar meus projetos, este portfólio possui um painel próprio para cadastrar trabalhos, enviar imagens, definir destaques e organizar a publicação. Uma interface responsiva, com temas claro e escuro, conectada ao conteúdo que gerencio no dia a dia.\n\nGestão de projetos · Upload de imagens · Ordenação e publicação",
            'technologies' => ['Laravel', 'React', 'Inertia', 'Tailwind CSS'],
            'repository_url' => null,
            'demo_url' => null,
            'icon' => 'layers',
            'is_featured' => true,
            'is_published' => true,
            'sort_order' => 0,
        ], [
            'title' => 'Snippets',
            'category' => 'Ferramentas para desenvolvimento',
            'description' => 'Organize trechos de código em um só lugar, agrupe em coleções e mantenha seus favoritos à mão. Uma aplicação com área autenticada para facilitar a consulta e reutilização de código.',
            'technologies' => ['Laravel', 'React', 'Inertia', 'Tailwind CSS', 'Docker'],
            'repository_url' => 'https://github.com/m3nininho/snippets',
            'demo_url' => null,
            'icon' => 'code',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 10,
        ], [
            'title' => 'Zentra Hub',
            'category' => 'Organização & gestão',
            'description' => 'Organize tarefas em um calendário e mantenha um cadastro de produtos integrado ao trabalho do dia a dia. Projeto disponível na organização brewerytools.',
            'technologies' => ['Laravel', 'React', 'Inertia', 'SQLite', 'Docker'],
            'repository_url' => 'https://github.com/brewerytools/zentra-hub',
            'demo_url' => null,
            'icon' => 'calendar',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 20,
        ], [
            'title' => 'Dokonix',
            'category' => 'Gestão de pessoas',
            'description' => 'Centralize informações de colaboradores e simplifique a gestão de pessoas. Um sistema para organizar usuários e consultar relatórios, com ambiente de desenvolvimento em Docker.',
            'technologies' => ['PHP', 'MySQL', 'Docker'],
            'repository_url' => 'https://github.com/m3nininho/dokonix',
            'demo_url' => null,
            'icon' => 'users',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 30,
        ], [
            'title' => 'FreelanceHours',
            'category' => 'Freelance & colaboração',
            'description' => 'Uma aplicação em que freelancers enviam propostas de horas para contribuir em projetos. Desenvolvida como estudo a partir de um curso da Rocketseat.',
            'technologies' => ['PHP', 'Laravel', 'Livewire', 'Tailwind CSS'],
            'repository_url' => 'https://github.com/m3nininho/freelancerHours',
            'demo_url' => null,
            'icon' => 'clock',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 40,
        ], [
            'title' => 'Typesense Snippets',
            'category' => 'Busca & ferramentas para desenvolvimento',
            'description' => 'Encontre trechos de código com busca em tempo real usando Typesense. Os snippets ficam armazenados em SQLite, com interface em Bootstrap.',
            'technologies' => ['PHP', 'Typesense', 'SQLite', 'Bootstrap', 'Docker'],
            'repository_url' => 'https://github.com/m3nininho/typesense-snippets',
            'demo_url' => null,
            'icon' => 'search',
            'is_featured' => false,
            'is_published' => true,
            'sort_order' => 50,
        ]];
        foreach ($projects as $project) {
            Project::firstOrCreate(['title' => $project['title']], $project);
        }
    }
}
