import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { useAppearance } from '@/hooks/use-appearance';

const navigation = [
    { label: 'Projetos', href: '#projects' },
    { label: 'Stacks', href: '#stacks' },
    { label: 'GitHub', href: '#github' },
    { label: 'LinkedIn', href: '#linkedin' },
    { label: 'Contato', href: '#contact' },
];

export default function Header() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const themeLabel =
        resolvedAppearance === 'dark'
            ? 'Ativar modo claro'
            : 'Ativar modo escuro';
    return (
        <header className="mx-auto w-full max-w-5xl px-5 sm:px-8">
            <div className="flex flex-col gap-5 border-b border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8 dark:border-white/10">
                <a
                    href="#"
                    aria-label="LM — início"
                    className="group flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
                >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-cyan-600/20 bg-cyan-600/5 text-cyan-700 transition-colors group-hover:bg-cyan-600/10 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-400">
                        <AppLogoIcon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        LM
                        <span className="text-cyan-600 dark:text-cyan-400">
                            .
                        </span>
                    </span>
                </a>

                <nav aria-label="Navegação principal">
                    <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
                        {navigation.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="group flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-cyan-300"
                                >
                                    {label}
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="size-3.5 text-slate-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
                                    />
                                </a>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                aria-label={themeLabel}
                                title={themeLabel}
                                onClick={() =>
                                    updateAppearance(
                                        resolvedAppearance === 'dark'
                                            ? 'light'
                                            : 'dark',
                                    )
                                }
                                className="flex size-11 items-center justify-center rounded-lg border border-cyan-600/20 bg-cyan-600/5 text-cyan-700 transition-colors hover:bg-cyan-600/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:border-cyan-400/20 dark:text-cyan-400"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                ) : (
                                    <Moon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
