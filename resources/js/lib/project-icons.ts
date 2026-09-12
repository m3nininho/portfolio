import {
    CalendarDays,
    Clock3,
    Code2,
    Layers3,
    Search,
    Users,
} from 'lucide-react';

const projectIcons = {
    code: Code2,
    users: Users,
    calendar: CalendarDays,
    clock: Clock3,
    search: Search,
    layers: Layers3,
};

export function getProjectIcon(icon?: string) {
    return projectIcons[icon as keyof typeof projectIcons] ?? Code2;
}
