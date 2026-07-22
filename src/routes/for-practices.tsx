import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/for-practices")({ component: Page });
function Page() { return <SectionPage kind="practices" number="02" kicker="For Practices" title={<>AI Powered<br />Dentistry</>} copy="Our provider product suite powers your practice with advanced clinical and business intelligence for better patient outcomes." theme="panel-white" previous="/our-edge" next="/for-insurers" />; }
