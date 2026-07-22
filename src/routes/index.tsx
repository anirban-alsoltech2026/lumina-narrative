import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/sections/HeroSection";
import { StoryTransition } from "@/sections/StoryTransition";
import { EditorialStatement } from "@/sections/EditorialStatement";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Aether — Clinical intelligence, quietly" },
      {
        name: "description",
        content:
          "Aether is a clinical intelligence layer that listens between the signals and returns time to the people who practice medicine.",
      },
      { property: "og:title", content: "Aether — Clinical intelligence, quietly" },
      {
        property: "og:description",
        content:
          "A quiet intelligence for human health. Aether returns attention to the practice of medicine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  useLenis();
  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <Nav />
      <main>
        <HeroSection />
        <StoryTransition />
        <EditorialStatement />
      </main>
    </div>
  );
}
