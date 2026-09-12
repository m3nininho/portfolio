import ExternalLink from '@/components/external-link';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LinkedinSection({
    profileUrl,
}: {
    profileUrl: string;
}) {
    return (
        <section
            id="linkedin"
            aria-labelledby="linkedin-title"
            className="mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-16 sm:px-8 sm:pb-20"
        >
            <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/10 dark:bg-slate-800/30">
                <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan-600/5 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                        <Linkedin aria-hidden="true" className="size-6" />
                    </span>
                    <div>
                        <h2
                            id="linkedin-title"
                            className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
                        >
                            Vamos nos conectar?
                        </h2>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Minha trajetória e novas conexões no{' '}
                            <ExternalLink
                                href={profileUrl}
                                className="rounded font-medium transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:hover:text-cyan-400"
                            >
                                LinkedIn
                            </ExternalLink>
                            .
                        </p>
                    </div>
                </div>
                <Button asChild variant="portfolio" className="shrink-0">
                    <ExternalLink
                        href={profileUrl}
                        aria-label="Ver perfil no LinkedIn (abre em nova aba)"
                    >
                        Ver meu LinkedIn
                        <ArrowUpRight aria-hidden="true" />
                    </ExternalLink>
                </Button>
            </div>
        </section>
    );
}
