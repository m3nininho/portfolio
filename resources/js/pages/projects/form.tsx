import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { store, update } from '@/routes/projects';
import type { Project } from '@/types/project';

export default function ProjectForm({ project }: { project: Project | null }) {
    const form = useForm({
        title: project?.title ?? '',
        category: project?.category ?? '',
        description: project?.description ?? '',
        technologies: project?.technologies.join(', ') ?? '',
        repository_url: project?.repository_url ?? '',
        demo_url: project?.demo_url ?? '',
        image: null as File | null,
        remove_image: false,
        icon: project?.icon ?? 'code',
        sort_order: project?.sort_order ?? 0,
        is_published: project?.is_published ?? false,
        is_featured: project?.is_featured ?? false,
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.transform((data) => ({
            ...data,
            technologies: data.technologies
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean),
            ...(project ? { _method: 'put' } : {}),
        }));
        form.post(project ? update.url(project.id) : store.url(), {
            forceFormData: true,
        });
    }

    const title = project ? 'Editar projeto' : 'Adicionar projeto';
    const errors = form.errors as Record<string, string>;

    return (
        <div className="mx-auto w-full max-w-3xl p-5 sm:p-8">
            <Head title={title} />
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-muted-foreground mt-2 text-sm">
                Salve como rascunho ou publique diretamente no portfólio.
            </p>
            <form onSubmit={submit} className="mt-8 space-y-6">
                {(['title', 'category'] as const).map((field) => (
                    <div key={field} className="grid gap-2">
                        <Label htmlFor={field}>
                            {field === 'title'
                                ? 'Nome do projeto'
                                : 'Categoria'}
                        </Label>
                        <Input
                            id={field}
                            value={form.data[field]}
                            onChange={(event) =>
                                form.setData(field, event.target.value)
                            }
                            maxLength={120}
                            required
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}
                <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <textarea
                        id="description"
                        value={form.data.description}
                        onChange={(event) =>
                            form.setData('description', event.target.value)
                        }
                        required
                        maxLength={3000}
                        rows={5}
                        className="border-input focus-visible:outline-ring w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-2"
                    />
                    <InputError message={errors.description} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="technologies">
                        Tecnologias (separadas por vírgula)
                    </Label>
                    <Input
                        id="technologies"
                        placeholder="Laravel, React, Docker"
                        value={form.data.technologies}
                        onChange={(event) =>
                            form.setData('technologies', event.target.value)
                        }
                        required
                    />
                    {Object.entries(errors)
                        .filter(
                            ([key]) =>
                                key === 'technologies' ||
                                key.startsWith('technologies.'),
                        )
                        .map(([key, error]) => (
                            <InputError key={key} message={error} />
                        ))}
                </div>
                {(['repository_url', 'demo_url'] as const).map((field) => (
                    <div key={field} className="grid gap-2">
                        <Label htmlFor={field}>
                            {field === 'repository_url'
                                ? 'Link do código (opcional)'
                                : 'Link para acessar o projeto (opcional)'}
                        </Label>
                        <Input
                            id={field}
                            type="url"
                            placeholder="https://"
                            value={form.data[field]}
                            onChange={(event) =>
                                form.setData(field, event.target.value)
                            }
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}
                <div className="grid gap-3">
                    <Label htmlFor="image">Imagem do projeto (opcional)</Label>
                    {project?.image_url && (
                        <img
                            src={project.image_url}
                            alt="Imagem atual do projeto"
                            className="aspect-[16/10] w-full max-w-sm rounded-xl border object-cover"
                        />
                    )}
                    <Input
                        id="image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) =>
                            form.setData(
                                'image',
                                event.target.files?.[0] ?? null,
                            )
                        }
                    />
                    <p className="text-muted-foreground text-xs">
                        PNG, JPG ou WebP até 4 MB. Proporção sugerida: 16:10.
                    </p>
                    <InputError message={errors.image} />
                    {project?.image_url && (
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={form.data.remove_image}
                                onChange={(event) =>
                                    form.setData(
                                        'remove_image',
                                        event.target.checked,
                                    )
                                }
                            />
                            Remover imagem atual
                        </label>
                    )}
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="icon">
                            Ícone quando não houver imagem
                        </Label>
                        <select
                            id="icon"
                            value={form.data.icon}
                            onChange={(event) =>
                                form.setData('icon', event.target.value)
                            }
                            className="border-input bg-background h-10 rounded-md border px-3 text-sm"
                        >
                            <option value="code">Código</option>
                            <option value="users">Pessoas</option>
                            <option value="calendar">Calendário</option>
                            <option value="clock">Tempo</option>
                            <option value="search">Busca</option>
                            <option value="layers">Camadas</option>
                        </select>
                        <InputError message={errors.icon} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sort_order">
                            Ordem (menores números primeiro)
                        </Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            max={9999}
                            value={form.data.sort_order}
                            onChange={(event) =>
                                form.setData(
                                    'sort_order',
                                    Number(event.target.value),
                                )
                            }
                            required
                        />
                        <InputError message={errors.sort_order} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-6 rounded-xl border p-4">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.data.is_published}
                            onChange={(event) =>
                                form.setData(
                                    'is_published',
                                    event.target.checked,
                                )
                            }
                        />
                        Publicado no portfólio
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.data.is_featured}
                            onChange={(event) =>
                                form.setData(
                                    'is_featured',
                                    event.target.checked,
                                )
                            }
                        />
                        Dar destaque
                    </label>
                    <InputError
                        message={errors.is_published || errors.is_featured}
                    />
                </div>
                <p className="text-muted-foreground text-xs">
                    Projetos em destaque aparecem primeiro. O primeiro deles
                    recebe o card maior.
                </p>
                {form.progress && (
                    <p role="status" className="text-sm">
                        Enviando imagem: {form.progress.percentage}%
                    </p>
                )}
                <div className="flex gap-3">
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Salvando…' : 'Salvar projeto'}
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={dashboard()}>Cancelar</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}

ProjectForm.layout = {
    breadcrumbs: [{ title: 'Projetos', href: dashboard() }],
};
