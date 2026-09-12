import DashboardPreviewForm from '@/components/dashboard-preview-form';
import type { DemoProject } from '@/types/project';
import ProjectStatus from '@/components/project-status';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Code2,
    FolderCode,
    ImagePlus,
    LayoutDashboard,
    ListOrdered,
    Pencil,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const examples: DemoProject[] = [
    {
        id: 1,
        title: 'Estúdio Aurora',
        category: 'Site institucional',
        description:
            'Um site para apresentar os serviços e trabalhos de um estúdio criativo.',
        sort_order: 0,
        is_published: true,
        is_featured: true,
        cover: true,
    },
    {
        id: 2,
        title: 'Agenda Fácil',
        category: 'Aplicação web',
        description:
            'Organização de compromissos em uma interface simples e responsiva.',
        sort_order: 10,
        is_published: true,
        is_featured: false,
        cover: false,
    },
    {
        id: 3,
        title: 'Loja Horizonte',
        category: 'E-commerce',
        description: 'Uma vitrine digital em desenvolvimento.',
        sort_order: 20,
        is_published: false,
        is_featured: false,
        cover: false,
    },
];

export default function DashboardPreview() {
    const [projects, setProjects] = useState(examples);
    const [editing, setEditing] = useState<DemoProject | null>(null);
    const [message, setMessage] = useState('');
    const heading = useRef<HTMLHeadingElement>(null);

    function focusHeading() {
        requestAnimationFrame(() => {
            heading.current?.focus({ preventScroll: true });
            heading.current?.scrollIntoView({ block: 'nearest' });
        });
    }

    return (
        <Dialog
            onOpenChange={() => {
                setProjects(examples);
                setEditing(null);
                setMessage('');
            }}
        >
            <DialogTrigger asChild>
                <Button
                    variant="portfolio-outline"
                    className="mt-6 hover:text-cyan-800 dark:hover:text-cyan-400"
                >
                    <LayoutDashboard aria-hidden="true" />
                    Conheça o painel
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-4xl">
                <DialogHeader className="pr-6">
                    <DialogTitle>Por trás do portfólio</DialogTitle>
                    <DialogDescription>
                        Experimente editar os projetos fictícios. As mudanças
                        valem apenas nesta demonstração e são descartadas ao
                        fechar.
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-background overflow-hidden rounded-xl border sm:grid sm:grid-cols-[160px_1fr]">
                    <aside className="bg-muted/30 border-b p-4 sm:border-r sm:border-b-0">
                        <p className="flex items-center gap-2 text-sm font-semibold">
                            <AppLogoIcon
                                aria-hidden="true"
                                className="size-5 text-cyan-600 dark:text-cyan-400"
                            />
                            LM.
                        </p>
                        <p className="mt-6 flex items-center gap-2 rounded-lg bg-cyan-500/10 p-2 text-sm text-cyan-700 dark:text-cyan-400">
                            <FolderCode aria-hidden="true" className="size-4" />
                            Projetos
                        </p>
                    </aside>
                    <div
                        key={editing?.id ?? 'list'}
                        className="motion-safe:animate-in motion-safe:fade-in min-w-0 p-4 motion-safe:duration-200 sm:p-6"
                    >
                        <h3
                            ref={heading}
                            tabIndex={-1}
                            className="mb-2 font-semibold outline-none"
                        >
                            {editing ? 'Editar projeto' : 'Meus projetos'}
                        </h3>
                        {editing ? (
                            <DashboardPreviewForm
                                project={editing}
                                onCancel={() => {
                                    setEditing(null);
                                    focusHeading();
                                }}
                                onSave={(updated) => {
                                    setProjects((current) =>
                                        current
                                            .map((project) =>
                                                project.id === updated.id
                                                    ? updated
                                                    : project,
                                            )
                                            .sort(
                                                (a, b) =>
                                                    Number(b.is_featured) -
                                                        Number(a.is_featured) ||
                                                    a.sort_order -
                                                        b.sort_order ||
                                                    a.id - b.id,
                                            ),
                                    );
                                    setEditing(null);
                                    setMessage(
                                        'Alterações aplicadas apenas à demonstração.',
                                    );
                                    focusHeading();
                                }}
                            />
                        ) : (
                            <>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-muted-foreground mt-1 text-xs">
                                            Gerencie o que aparece no seu
                                            portfólio.
                                        </p>
                                    </div>
                                    <Badge variant="outline">
                                        Demonstração interativa
                                    </Badge>
                                </div>
                                <p
                                    role="status"
                                    className="mt-3 text-xs text-cyan-700 dark:text-cyan-400"
                                >
                                    {message ||
                                        'Clique em Editar para experimentar o painel.'}
                                </p>
                                <div className="mt-6 space-y-3">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
                                        >
                                            <div className="min-w-0">
                                                {project.cover && (
                                                    <div
                                                        aria-label="Capa ilustrativa"
                                                        className="mb-3 flex h-14 w-24 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/20 to-slate-500/10"
                                                    >
                                                        <Code2
                                                            aria-hidden="true"
                                                            className="size-6 text-cyan-600 dark:text-cyan-400"
                                                        />
                                                    </div>
                                                )}
                                                <p className="text-sm font-medium">
                                                    {project.title}
                                                </p>
                                                <p className="text-muted-foreground mt-1 text-xs">
                                                    Ordem {project.sort_order} ·{' '}
                                                    {project.category}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ProjectStatus
                                                    project={project}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    aria-label={`Editar ${project.title}`}
                                                    onClick={() => {
                                                        setEditing(project);
                                                        setMessage('');
                                                        focusHeading();
                                                    }}
                                                >
                                                    <Pencil
                                                        aria-hidden="true"
                                                        className="size-3"
                                                    />
                                                    Editar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="grid gap-3 text-sm sm:grid-cols-3">
                    {[
                        {
                            icon: FolderCode,
                            title: 'Gestão de projetos',
                            description:
                                'Cadastro, edição e controle entre rascunhos e publicados.',
                        },
                        {
                            icon: ImagePlus,
                            title: 'Imagens próprias',
                            description:
                                'Upload de capas para apresentar cada trabalho.',
                        },
                        {
                            icon: ListOrdered,
                            title: 'Ordem e destaque',
                            description:
                                'Escolha do projeto principal e da sequência dos cards.',
                        },
                    ].map(({ icon: Icon, title, description }) => (
                        <div key={title} className="rounded-lg border p-4">
                            <Icon
                                aria-hidden="true"
                                className="mb-3 size-5 text-cyan-600 dark:text-cyan-400"
                            />
                            <p className="font-medium">{title}</p>
                            <p className="text-muted-foreground mt-1 text-xs leading-5">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
