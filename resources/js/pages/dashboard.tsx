import ProjectStatus from '@/components/project-status';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { create, edit } from '@/routes/projects';
import type { Project } from '@/types/project';

export default function Dashboard({
    projects,
    success,
}: {
    projects: Project[];
    success?: string;
}) {
    return (
        <div className="mx-auto w-full max-w-5xl p-5 sm:p-8">
            <Head title="Meus projetos" />
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Meus projetos</h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Gerencie o que aparece no seu portfólio.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Adicionar projeto
                        </Link>
                    </Button>
                </div>
            </div>
            {success && (
                <p
                    role="status"
                    className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm"
                >
                    {success}
                </p>
            )}
            <div className="mt-8 space-y-3">
                {projects.map((project) => (
                    <article
                        key={project.id}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4"
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            {project.image_url && (
                                <img
                                    src={project.image_url}
                                    alt=""
                                    className="h-14 w-20 rounded-lg object-cover"
                                />
                            )}
                            <div>
                                <h2 className="font-medium">{project.title}</h2>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    Ordem {project.sort_order} ·{' '}
                                    {project.category}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ProjectStatus project={project} />
                            <Button asChild variant="outline" size="sm">
                                <Link
                                    href={edit(project.id)}
                                    aria-label={`Editar ${project.title}`}
                                >
                                    <Pencil />
                                    Editar
                                </Link>
                            </Button>
                        </div>
                    </article>
                ))}
                {projects.length === 0 && (
                    <p className="text-muted-foreground rounded-xl border border-dashed p-10 text-center">
                        Seu primeiro projeto começa aqui. Clique em “Adicionar
                        projeto”.
                    </p>
                )}
            </div>
        </div>
    );
}
Dashboard.layout = { breadcrumbs: [{ title: 'Projetos', href: dashboard() }] };
