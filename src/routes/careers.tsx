import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/careers")({ component: Page });
function Page() { return <SectionPage kind="careers" number="05" kicker="Careers" title={<>Work<br />With Us</>} copy="We are on a journey to transform the dental industry. Join us." theme="panel-white" previous="/about" next="/press" />; }
