import {
    Atom,
    ArrowLeftRight,
    Bot,
    Boxes,
    Code2,
    Container,
    FileCode2,
    Github,
    GitBranch,
    PanelsTopLeft,
    TestTube2,
    Wind,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const stacks = [
    { name: 'Laravel', detail: 'Backend e aplicações web', icon: Boxes },
    { name: 'React', detail: 'Interfaces e componentes', icon: Atom },
    {
        name: 'Inertia.js',
        detail: 'Integração entre Laravel e React',
        icon: ArrowLeftRight,
    },
    { name: 'Pest', detail: 'Testes automatizados', icon: TestTube2 },
    { name: 'Docker', detail: 'Ambientes em containers', icon: Container },
    { name: 'Git', detail: 'Controle de versão', icon: GitBranch },
    { name: 'GitHub', detail: 'Código e colaboração', icon: Github },
    {
        name: 'Tailwind CSS',
        detail: 'Estilos e interfaces responsivas',
        icon: Wind,
    },
    { name: 'Bootstrap', detail: 'Componentes e layouts', icon: PanelsTopLeft },
    {
        name: 'TypeScript',
        detail: 'Tipagem no desenvolvimento',
        icon: FileCode2,
    },
    { name: 'IA', detail: 'Apoio para explorar e construir', icon: Bot },
];

export default function StacksSection() {
    const section = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!section.current || !('IntersectionObserver' in window)) {
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(section.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={section}
            id="stacks"
            aria-labelledby="stacks-title"
            className="mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-20 sm:px-8 sm:pb-28"
        >
            <div className="mb-8 max-w-xl">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-400">
                    <Code2 aria-hidden="true" className="size-4" />
                    Minhas ferramentas
                </p>
                <h2
                    id="stacks-title"
                    className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100"
                >
                    Stacks
                    <span className="text-cyan-600 dark:text-cyan-400">.</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    As tecnologias que uso para transformar ideias em projetos,
                    organizar o código e seguir aprendendo.
                </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {stacks.map(({ name, detail, icon: Icon }, index) => (
                    <li
                        key={name}
                        style={{ animationDelay: `${index * 65}ms` }}
                        className={
                            visible
                                ? 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-backwards motion-safe:duration-500'
                                : ''
                        }
                    >
                        <div className="group flex h-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-cyan-600/30 hover:bg-cyan-50/50 motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-300 motion-safe:hover:-translate-y-1 dark:border-white/10 dark:bg-slate-800/30 dark:hover:border-cyan-400/30 dark:hover:bg-cyan-950/30">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan-600/5 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                                <Icon
                                    aria-hidden="true"
                                    className={`size-6 motion-safe:transition-transform motion-safe:duration-300 ${name === 'IA' ? 'motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-12' : 'motion-safe:group-hover:scale-110'}`}
                                />
                            </span>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {name}
                                    {name === 'IA' && (
                                        <span className="ml-2 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-700 dark:text-cyan-400">
                                            No dia a dia
                                        </span>
                                    )}
                                </h3>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    {detail}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
