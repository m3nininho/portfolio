import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/project';

export default function ProjectStatus({
    project,
}: {
    project: Pick<Project, 'is_published' | 'is_featured'>;
}) {
    return (
        <>
            <Badge variant="outline">
                {project.is_published ? 'Publicado' : 'Rascunho'}
            </Badge>
            {project.is_featured && <Badge variant="secondary">Destaque</Badge>}
        </>
    );
}
