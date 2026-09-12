import ExternalLink from '@/components/external-link';
import { portfolio } from '@/lib/portfolio';
import { ArrowUpRight, BookOpen, Github, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GithubSection() {
    return (
        <section
            id="github"
            aria-labelledby="github-title"
            className="mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-20 sm:px-8 sm:pb-28"
        >
            <div className="relative overflow-hidden rounded-2xl border border-cyan-600/15 bg-linear-to-br from-cyan-50 to-white p-6 sm:p-10 dark:border-cyan-400/15 dark:from-cyan-950/30 dark:to-slate-900">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-400">
                            <Github aria-hidden="true" className="size-4" />
                            Além da interface
                        </p>
                        <h2
                            id="github-title"
                            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100"
                        >
                            O código também
                            <br />
                            conta uma história
                            <span className="text-cyan-600 dark:text-cyan-400">
                                .
                            </span>
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Os projetos continuam no GitHub. Explore a
                            estrutura, acompanhe as mudanças e veja como cada
                            ideia foi construída, do primeiro commit aos
                            próximos passos.
                        </p>
                        <Button asChild variant="portfolio" className="mt-6">
                            <ExternalLink
                                href={portfolio.githubUrl}
                                aria-label="Visitar perfil no GitHub (abre em nova aba)"
                            >
                                <Github aria-hidden="true" />
                                Visitar meu GitHub
                                <ArrowUpRight aria-hidden="true" />
                            </ExternalLink>
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/80">
                        <div className="flex items-center gap-3 border-b border-slate-200 p-5 dark:border-white/10">
                            <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                <Github aria-hidden="true" className="size-6" />
                            </span>
                            <div>
                                <ExternalLink
                                    href={portfolio.githubUrl}
                                    className="rounded font-semibold text-slate-900 transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:text-slate-100 dark:hover:text-cyan-400"
                                >
                                    {portfolio.githubUsername}
                                </ExternalLink>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Projetos, estudos e experimentos
                                </p>
                            </div>
                        </div>
                        <ExternalLink
                            href={`${portfolio.githubUrl}?tab=repositories`}
                            className="flex items-start gap-3 p-5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-500 dark:hover:bg-white/5"
                        >
                            <BookOpen
                                aria-hidden="true"
                                className="mt-1 size-5 shrink-0 text-cyan-600 dark:text-cyan-400"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    Explorar os repositórios
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Veja outros projetos e os detalhes de
                                    implementação.
                                </p>
                            </div>
                            <ArrowUpRight
                                aria-label="Abre em nova aba"
                                className="size-4 shrink-0 text-slate-400"
                            />
                        </ExternalLink>
                        <ExternalLink
                            href="https://github.com/brewerytools/zentra-hub"
                            className="flex items-start gap-3 border-t border-slate-200 p-5 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-500 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            <GitBranch
                                aria-hidden="true"
                                className="mt-1 size-5 shrink-0 text-cyan-600 dark:text-cyan-400"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    brewerytools / zentra-hub
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    Explore também o projeto na organização
                                    Brewerytools.
                                </p>
                            </div>
                            <ArrowUpRight
                                aria-label="Abre em nova aba"
                                className="size-4 shrink-0 text-slate-400"
                            />
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
