import { ArrowLeft, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DemoProject } from '@/types/project';

export default function DashboardPreviewForm({
    project,
    onSave,
    onCancel,
}: {
    project: DemoProject;
    onSave: (project: DemoProject) => void;
    onCancel: () => void;
}) {
    return (
        <form
            className="space-y-5"
            onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const text = (name: string): string => {
                    const value = data.get(name);
                    return typeof value === 'string' ? value.trim() : '';
                };
                const updated = {
                    ...project,
                    title: text('title'),
                    category: text('category'),
                    description: text('description'),
                    sort_order: Number(data.get('sort_order')),
                    is_published: data.has('is_published'),
                    is_featured: data.has('is_featured'),
                    cover: data.has('cover'),
                };
                onSave(updated);
            }}
        >
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                <ArrowLeft aria-hidden="true" />
                Voltar aos projetos
            </Button>
            <div className="grid gap-2">
                <Label htmlFor="demo-title">Nome do projeto</Label>
                <Input
                    id="demo-title"
                    name="title"
                    defaultValue={project.title}
                    required
                    maxLength={120}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="demo-category">Categoria</Label>
                <Input
                    id="demo-category"
                    name="category"
                    defaultValue={project.category}
                    required
                    maxLength={120}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="demo-description">Descrição</Label>
                <textarea
                    id="demo-description"
                    name="description"
                    defaultValue={project.description}
                    required
                    maxLength={3000}
                    rows={3}
                    className="border-input focus-visible:outline-ring w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-2"
                />
            </div>
            <div className="rounded-xl border border-dashed p-4">
                <ImagePlus
                    aria-hidden="true"
                    className="mb-3 size-6 text-cyan-600 dark:text-cyan-400"
                />
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="cover"
                        defaultChecked={project.cover}
                    />
                    Usar capa ilustrativa
                </label>
                <p className="text-muted-foreground mt-2 text-xs">
                    No painel real, você envia a imagem do projeto. Aqui usamos
                    uma capa de exemplo.
                </p>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="demo-order">
                    Ordem (menores números primeiro)
                </Label>
                <Input
                    id="demo-order"
                    name="sort_order"
                    type="number"
                    min={0}
                    max={9999}
                    defaultValue={project.sort_order}
                    required
                />
            </div>
            <div className="flex flex-wrap gap-4 rounded-xl border p-4">
                <label className="flex items-center gap-2 text-sm">
                    <input
                        name="is_published"
                        type="checkbox"
                        defaultChecked={project.is_published}
                    />
                    Publicado no portfólio
                </label>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        name="is_featured"
                        type="checkbox"
                        defaultChecked={project.is_featured}
                    />
                    Dar destaque
                </label>
            </div>
            <Button type="submit">Aplicar na demonstração</Button>
        </form>
    );
}
