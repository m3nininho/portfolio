import { portfolio } from '@/lib/portfolio';
import { Head } from '@inertiajs/react';
import Header from '@/components/header';
import GithubSection from '@/components/github-section';
import Projects from '@/components/projects';
import LinkedinSection from '@/components/linkedin-section';
import ContactSection from '@/components/contact-section';
import StacksSection from '@/components/stacks-section';
import type { Project } from '@/types/project';

export default function Welcome({ projects }: { projects: Project[] }) {
    return (
        <>
            <Head title="Portfólio" />
            <Header />
            <main>
                <Projects projects={projects} />
                <StacksSection />
                <GithubSection />
                <LinkedinSection profileUrl={portfolio.linkedinUrl} />
                <ContactSection
                    email={portfolio.email}
                    linkedinUrl={portfolio.linkedinUrl}
                />
            </main>
        </>
    );
}
