import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/press")({ component: Page });
function Page() { return <SectionPage kind="press" number="06" kicker="Press" title={<>Stay<br />Up to Date</>} copy="Check out our latest announcements to learn more." theme="panel-blue" previous="/careers" next="/" />; }
