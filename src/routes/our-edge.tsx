import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/our-edge")({ component: Page });
function Page() { return <SectionPage kind="edge" number="01" kicker="Our Edge" title={<>Our<br />Edge</>} copy="The intelligence platform transforming clinical and economic outcomes across dentistry." theme="panel-white" previous="/" next="/for-practices" />; }
