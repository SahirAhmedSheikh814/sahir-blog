import BlogGrid from "@/app/blog/page";
import Hero from "@/components/Hero";
import BigPost from "@/components/BigPost"

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mt-24 mb-16">
        <BlogGrid />
      </div>
      <BigPost />
    </main>
  );
}
