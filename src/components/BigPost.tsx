import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

// Add type for the BigPost data
type BigPost = {
  heading: string
  paragraph: string
  buttonText: string
  tag: string
  image: any
}

export default async function BigPosts() {
  // Update query to fetch all bigPosts
  const query = `*[_type == "bigPost"]{
    heading,
    paragraph,
    buttonText,
    tag,
    image
  }`

  const bigPostsData: BigPost[] = await client.fetch(query)

  return (
    <main className="py-16 bg-white min-h-screen">
      <div className="flex flex-col gap-16">
        {bigPostsData.map((post, index) => (
          <div key={index} className="flex justify-center items-center">
            <div className="relative w-[80%] h-[550px]">
              <Image
                src={urlFor(post.image).url()}
                alt={`${post.heading} background`}
                fill
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30" />
              
              <div className="relative h-full max-w-[1200px] mx-auto px-4 flex flex-col items-center justify-center text-center">
                <span className="text-white mb-6 text-sm tracking-wide uppercase">
                  {post.tag}
                </span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-[800px] mb-4 leading-tight">
                  {post.heading}
                </h2>
                
                <p className="text-base md:text-lg text-white/90 max-w-[650px] mb-8 leading-relaxed">
                  {post.paragraph}
                </p>
                
                <button className="bg-white hover:bg-white/90 text-gray-900 px-8 py-3 rounded-sm text-sm font-bold transition-colors">
                  {post.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
