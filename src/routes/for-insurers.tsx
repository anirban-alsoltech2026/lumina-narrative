import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/for-insurers")({ component: Page });
function Page() { return <SectionPage kind="insurers" number="03" kicker="For Insurers" title={<>Intelligent<br />Claim Review</>} copy="Our insurance product suite powers your operations for faster and more consistent claim review and lower costs." theme="panel-cyan" previous="/for-practices" next="/about" />; }
