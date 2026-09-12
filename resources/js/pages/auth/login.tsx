import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { home } from '@/routes';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Entrar no painel" />
            <h1 className="sr-only">Entrar no painel</h1>
            <Link
                href={home()}
                className="flex w-fit items-center gap-2 rounded text-sm text-slate-500 transition-colors hover:text-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 dark:text-slate-400 dark:hover:text-cyan-300"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Voltar ao portfólio
            </Link>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-11 rounded-lg border-slate-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 dark:border-white/15"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-cyan-700 decoration-cyan-600/30 hover:decoration-cyan-600 dark:text-cyan-300"
                                            tabIndex={5}
                                        >
                                            Esqueceu a senha?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Sua senha"
                                    className="h-11 rounded-lg border-slate-200 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 dark:border-white/15"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:border-cyan-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white dark:data-[state=checked]:border-cyan-400 dark:data-[state=checked]:bg-cyan-400 dark:data-[state=checked]:text-slate-950"
                                />
                                <Label htmlFor="remember">
                                    Manter conectado
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 min-h-11 w-full rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 focus-visible:ring-cyan-500/30 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Entrar
                                {!processing && (
                                    <ArrowRight aria-hidden="true" />
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    minimal: true,
};
