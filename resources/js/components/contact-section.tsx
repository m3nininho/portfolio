import ExternalLink from '@/components/external-link';
import { ArrowUpRight, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection({
    email,
    linkedinUrl,
}: {
    email?: string;
    linkedinUrl?: string;
}) {
    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-10 sm:px-8"
        >
            <div className="border-t border-slate-200 py-14 sm:py-20 dark:border-white/10">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl border border-cyan-600/20 bg-cyan-600/5 text-cyan-700 dark:border-cyan-400/20 dark:text-cyan-400">
                        <MessageCircle aria-hidden="true" className="size-6" />
                    </span>
                    <p className="mb-3 text-xs font-semibold tracking-widest text-cyan-700 uppercase dark:text-cyan-400">
                        Vamos conversar
                    </p>
                    <h2
                        id="contact-title"
                        className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100"
                    >
                        Sua próxima ideia
                        <br />
                        pode começar aqui
                        <span className="text-cyan-600 dark:text-cyan-400">
                            .
                        </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400">
                        Tem um projeto em mente, uma oportunidade ou quer trocar
                        uma ideia sobre código? Escolha o melhor canal e me
                        conte.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {email && (
                            <Button
                                asChild
                                variant="portfolio"
                                className="min-h-12 px-6"
                            >
                                <a href={`mailto:${email}`}>
                                    <Mail aria-hidden="true" />
                                    Enviar um e-mail
                                    <ArrowUpRight aria-hidden="true" />
                                </a>
                            </Button>
                        )}
                        {linkedinUrl && (
                            <Button
                                asChild
                                variant="outline"
                                className="min-h-12 border-slate-200 px-6 dark:border-white/15"
                            >
                                <ExternalLink
                                    href={linkedinUrl}
                                    aria-label="Conversar pelo LinkedIn (abre em nova aba)"
                                >
                                    <Linkedin aria-hidden="true" />
                                    Conversar pelo LinkedIn
                                    <ArrowUpRight aria-hidden="true" />
                                </ExternalLink>
                            </Button>
                        )}
                        {!email && !linkedinUrl && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Canais de contato em breve.
                            </p>
                        )}
                    </div>
                    {email && (
                        <p className="mt-4 text-sm break-all text-slate-500 dark:text-slate-400">
                            {email}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
