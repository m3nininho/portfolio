import { Code2 } from 'lucide-react';
import type { SVGAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <Code2
            {...props}
            aria-hidden="true"
            className={cn(
                props.className,
                'fill-none text-cyan-700 dark:text-cyan-400',
            )}
        />
    );
}
