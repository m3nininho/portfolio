import ExternalLink from '@/components/external-link';
import { portfolio } from '@/lib/portfolio';
import { getProjectIcon } from '@/lib/project-icons';
import AppLogoIcon from '@/components/app-logo-icon';
import { Github, Linkedin, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Project } from '@/types/project';

export default function PortfolioPreview({
    featured,
    projects,
}: {
    featured: Project;
    projects: Project[];
}) {
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);
    const pageCount = Math.ceil(projects.length / 2);
    const currentPage = page % Math.max(pageCount, 1);

    useEffect(() => {
        if (paused || pageCount < 2) {
            return;
        }

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const timer = window.setInterval(() => {
            if (!motion.matches && !document.hidden) {
                setPage((previous) => (previous + 1) % pageCount);
            }
        }, 4500);

        return () => window.clearInterval(timer);
    }, [paused, pageCount]);

    return (
        <div className="w-full max-w-xs">
            <div
                data-portfolio-preview
                className="w-full max-w-xs rotate-[-2deg] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/10"
            >
                <div className="flex items-center gap-1 border-b border-slate-200 px-3 py-2 dark:border-white/10">
                    <span className="size-1.5 rounded-full bg-cyan-500/70" />
                    <span className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="size-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <span className="ml-auto font-mono text-[8px] text-slate-500">
                        LM
                    </span>
                </div>
                <div className="space-y-4 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
                        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-900 dark:text-slate-100">
                            <AppLogoIcon className="size-4" />
                            LM
                            <span className="text-cyan-600 dark:text-cyan-400">
                                .
                            </span>
                        </span>
                        <span className="text-[6px] text-slate-500 dark:text-slate-400">
                            Projetos · GitHub · LinkedIn · Contato
                        </span>
                    </div>
                    <div>
                        <p className="text-[6px] font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-400">
                            Código na prática
                        </p>
                        <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                            Projetos
                            <span className="text-cyan-600 dark:text-cyan-400">
                                .
                            </span>
                        </p>
                    </div>
                    <div
                        data-preview-project={featured.id}
                        className="grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10"
                    >
                        <div className="flex items-center justify-center bg-cyan-500/5 p-3">
                            <AppLogoIcon className="size-8" />
                        </div>
                        <div className="min-w-0 space-y-2 p-2.5">
                            <p className="text-[6px] font-medium text-cyan-700 dark:text-cyan-400">
                                Projeto em destaque
                            </p>
                            <p className="truncate text-[8px] font-semibold text-slate-900 dark:text-slate-100">
                                {featured.title}
                            </p>
                            <p className="line-clamp-2 text-[6px] leading-relaxed text-slate-500 dark:text-slate-400">
                                {featured.description}
                            </p>
                        </div>
                    </div>
                    {projects.length > 0 && (
                        <div
                            key={currentPage}
                            className="motion-safe:animate-in motion-safe:fade-in grid grid-cols-2 gap-2 motion-safe:duration-500"
                        >
                            {projects
                                .slice(currentPage * 2, currentPage * 2 + 2)
                                .map((project) => {
                                    const Icon = getProjectIcon(project.icon);
                                    return (
                                        <div
                                            key={project.id}
                                            data-preview-project={project.id}
                                            className="h-32 min-w-0 space-y-2 overflow-hidden rounded-lg border border-slate-200 p-2.5 dark:border-white/10 dark:bg-slate-800/30"
                                        >
                                            {project.image_url ? (
                                                <img
                                                    src={project.image_url}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-10 w-full rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 items-center">
                                                    <Icon className="size-4 text-cyan-600 dark:text-cyan-400" />
                                                </div>
                                            )}
                                            <p className="truncate text-[8px] font-semibold text-slate-900 dark:text-slate-100">
                                                {project.title}
                                            </p>
                                            <p className="line-clamp-2 text-[6px] leading-relaxed text-slate-500 dark:text-slate-400">
                                                {project.description}
                                            </p>
                                            <p className="truncate text-[6px] text-cyan-700 dark:text-cyan-400">
                                                {project.technologies
                                                    .slice(0, 2)
                                                    .join(' · ')}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {projects.length > 2 && (
                        <p className="text-center text-[6px] font-medium text-cyan-700 dark:text-cyan-400">
                            Explore meus projetos recentes ↓
                        </p>
                    )}
                    <ExternalLink
                        href={portfolio.githubUrl}
                        aria-label="Visitar meu GitHub (abre em nova aba)"
                        className="flex min-h-11 items-center gap-2 rounded-lg border border-cyan-600/15 bg-cyan-500/5 p-2.5 text-slate-700 transition-colors hover:bg-cyan-500/10 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:border-cyan-400/15 dark:text-slate-300 dark:hover:text-cyan-400"
                    >
                        <Github
                            aria-hidden="true"
                            className="size-4 shrink-0 text-cyan-600 dark:text-cyan-400"
                        />
                        <span className="text-[8px] font-medium">
                            {portfolio.githubUsername}
                        </span>
                    </ExternalLink>
                    <ExternalLink
                        href={portfolio.linkedinUrl}
                        aria-label="Visitar meu LinkedIn (abre em nova aba)"
                        className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-cyan-500/5 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:border-white/10 dark:text-slate-300 dark:hover:text-cyan-400"
                    >
                        <Linkedin
                            aria-hidden="true"
                            className="size-3 text-cyan-600 dark:text-cyan-400"
                        />
                        <span className="text-[7px]">Vamos nos conectar?</span>
                    </ExternalLink>
                    <p className="border-t border-slate-200 pt-3 text-center text-[8px] font-semibold text-slate-700 dark:border-white/10 dark:text-slate-300">
                        Vamos conversar
                        <span className="text-cyan-600 dark:text-cyan-400">
                            .
                        </span>
                    </p>
                </div>
            </div>
            {pageCount > 1 && (
                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded px-2 transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 motion-reduce:hidden dark:hover:text-cyan-400"
                    >
                        {paused ? (
                            <Play aria-hidden="true" className="size-3" />
                        ) : (
                            <Pause aria-hidden="true" className="size-3" />
                        )}
                        {paused ? 'Reproduzir prévia' : 'Pausar prévia'}
                    </button>
                    <button
                        type="button"
                        aria-label="Ver próximos projetos na prévia"
                        onClick={() => {
                            setPaused(true);
                            setPage((previous) => (previous + 1) % pageCount);
                        }}
                        className="min-h-9 rounded px-2 transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:hover:text-cyan-400"
                    >
                        {currentPage + 1} / {pageCount} →
                    </button>
                </div>
            )}
        </div>
    );
}
