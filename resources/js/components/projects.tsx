import ExternalLink from '@/components/external-link';
import { getProjectIcon } from '@/lib/project-icons';
import { ArrowUpRight, ChevronDown, FolderCode, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PortfolioPreview from '@/components/portfolio-preview';
import DashboardPreview from '@/components/dashboard-preview';
import type { Project } from '@/types/project';

function ProjectLinks({ project }: { project: Project }) {
    return (
        <div className="mt-7 flex flex-wrap gap-3">
            {[
                {
                    label: 'Ver código',
                    url: project.repository_url,
                    icon: Github,
                },
                {
                    label: 'Acessar projeto',
                    url: project.demo_url,
                    icon: ArrowUpRight,
                },
            ].map(
                (link) =>
                    link.url && (
                        <Button
                            key={link.label}
                            asChild
                            variant="portfolio-outline"
                        >
                            <ExternalLink
                                href={link.url}
                                aria-label={`${link.label}: ${project.title} (abre em nova aba)`}
                            >
                                <link.icon
                                    aria-hidden="true"
                                    className="size-4"
                                />
                                {link.label}
                            </ExternalLink>
                        </Button>
                    ),
            )}
        </div>
    );
}

export default function Projects({ projects }: { projects: Project[] }) {
    const featured = projects.find((project) => project.is_featured);
    const FeaturedIcon = getProjectIcon(featured?.icon);
    const remaining = projects.filter((project) => project.id !== featured?.id);
    return (
        <section
            id="projects"
            aria-labelledby="projects-title"
            className="mx-auto w-full max-w-5xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-24"
        >
            <div className="mb-8 max-w-xl sm:mb-10">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-400">
                    <FolderCode aria-hidden="true" className="size-4" />
                    Código na prática
                </p>
                <h1
                    id="projects-title"
                    className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100"
                >
                    Projetos
                    <span className="text-cyan-600 dark:text-cyan-400">.</span>
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Um espaço para compartilhar o que estou construindo, as
                    escolhas por trás do código e o que aprendo no caminho.
                </p>
            </div>

            {featured && (
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid sm:grid-cols-2 dark:border-white/10 dark:bg-slate-800/30">
                    <div className="flex min-h-64 items-center justify-center border-b border-slate-200 bg-linear-to-br from-cyan-50 via-slate-100 to-slate-50 p-8 sm:border-r sm:border-b-0 dark:border-white/10 dark:from-cyan-950/40 dark:via-slate-800/60 dark:to-slate-900">
                        {featured.image_url ? (
                            <img
                                src={featured.image_url}
                                alt=""
                                className="aspect-[16/10] w-full rounded-xl object-cover"
                            />
                        ) : featured.icon !== 'layers' ? (
                            <FeaturedIcon
                                aria-hidden="true"
                                className="size-24 text-cyan-600 dark:text-cyan-400"
                            />
                        ) : (
                            <PortfolioPreview
                                featured={featured}
                                projects={remaining}
                            />
                        )}
                    </div>

                    <div className="flex flex-col items-start p-6 sm:p-8">
                        <Badge
                            variant="outline"
                            className="gap-1.5 border-cyan-600/20 bg-cyan-600/5 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/5 dark:text-cyan-300"
                        >
                            <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-current"
                            />
                            Projeto em destaque
                        </Badge>
                        <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                            {featured.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 whitespace-pre-line text-slate-600 dark:text-slate-400">
                            {featured.description}
                        </p>
                        <ul
                            aria-label="Tecnologias utilizadas"
                            className="mt-6 flex flex-wrap gap-2"
                        >
                            {featured.technologies.map((technology) => (
                                <li key={technology}>
                                    <Badge
                                        variant="outline"
                                        className="border-slate-200 font-normal text-slate-600 dark:border-white/10 dark:text-slate-300"
                                    >
                                        {technology}
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                        <ProjectLinks project={featured} />
                        {featured.icon === 'layers' && <DashboardPreview />}
                    </div>
                </article>
            )}

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {remaining.slice(0, 2).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {remaining.length > 2 && (
                <details className="group mt-8">
                    <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-cyan-600/20 bg-cyan-600/5 px-5 py-3 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-600/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 dark:border-cyan-400/20 dark:text-cyan-300 [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">
                            Explore meus projetos recentes
                        </span>
                        <span className="hidden group-open:inline">
                            Mostrar menos projetos
                        </span>
                        <ChevronDown
                            aria-hidden="true"
                            className="size-4 transition-transform group-open:rotate-180"
                        />
                    </summary>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        {remaining.slice(2).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </details>
            )}
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const Icon = getProjectIcon(project.icon);
    return (
        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-slate-800/30">
            {project.image_url && (
                <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                    className="mb-6 aspect-[16/10] w-full rounded-lg object-cover"
                />
            )}
            <div className="flex items-center justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl border border-cyan-600/15 bg-cyan-600/5 text-cyan-700 dark:border-cyan-400/15 dark:bg-cyan-400/10 dark:text-cyan-400">
                    <Icon aria-hidden="true" className="size-6" />
                </span>
                <Badge
                    variant="outline"
                    className="border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                >
                    {project.repository_url
                        ? 'Repositório público'
                        : 'Projeto pessoal'}
                </Badge>
            </div>
            <p className="mt-7 text-xs font-medium text-cyan-700 dark:text-cyan-400">
                {project.category}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                {project.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {project.description}
            </p>
            <ul
                aria-label="Tecnologias do projeto"
                className="mt-6 flex flex-wrap gap-2"
            >
                {project.technologies.map((technology) => (
                    <li key={technology}>
                        <Badge
                            variant="outline"
                            className="border-slate-200 font-normal text-slate-600 dark:border-white/10 dark:text-slate-300"
                        >
                            {technology}
                        </Badge>
                    </li>
                ))}
            </ul>
            <ProjectLinks project={project} />
        </article>
    );
}
