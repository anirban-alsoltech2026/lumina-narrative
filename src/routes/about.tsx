import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/SectionPage";
export const Route = createFileRoute("/about")({ component: Page });
function Page() { return <SectionPage kind="about" number="04" kicker="About Us" title={<>Meet the<br />Videa Team</>} copy="Our team is committed to unlocking dentistry's full potential for better patient experiences and outcomes." theme="panel-black" previous="/for-insurers" next="/careers" />; }
