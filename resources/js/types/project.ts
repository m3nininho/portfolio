export type Project = {
    id: number;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    repository_url: string | null;
    demo_url: string | null;
    image_url: string | null;
    icon: string;
    is_published: boolean;
    is_featured: boolean;
    sort_order: number;
};

export type DemoProject = Pick<
    Project,
    | 'id'
    | 'title'
    | 'category'
    | 'description'
    | 'sort_order'
    | 'is_published'
    | 'is_featured'
> & {
    cover: boolean;
};
