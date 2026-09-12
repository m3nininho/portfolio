import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    minimal = false,
    children,
}: {
    title?: string;
    description?: string;
    minimal?: boolean;
    children: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            minimal={minimal}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
