import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl border border-cyan-600/20 bg-cyan-600/5 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-400">
                <AppLogoIcon aria-hidden="true" className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    LM
                    <span className="text-cyan-600 dark:text-cyan-400">.</span>
                </span>
                <span className="text-muted-foreground truncate text-xs">
                    Painel de projetos
                </span>
            </div>
        </>
    );
}
