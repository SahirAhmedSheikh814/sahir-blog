'use client'

import { useState, useEffect } from "react"
import BlogCard from "@/components/BlogCard"
import { client } from "@/sanity/lib/client"
import { motion } from "framer-motion"

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = [
    { label: "All", value: "all" },
    { label: "Traveling", value: "traveling" },
    { label: "Technology", value: "technology" },
    { label: "Cricket", value: "cricket" },
  ]

  const query = `*[_type == 'blogPost' ${
    activeCategory !== "all" ? `&& category == '${activeCategory}'` : ""
  }] | order(_createdAt asc) {
    description,
    title,
    id,
    image,
    date,
    shares,
    category,
    "author": author-> {
      name,
      image
    }
  }`

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await client.fetch(query)
      setPosts(fetchedPosts)
    }
    fetchPosts()
  }, [activeCategory, query])

  return (
    <div className="min-h-screen mx-auto px-2 sm:px-4 md:px-6">
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 sm:mb-8 text-primary">
        Explore Our Captivating Blog
      </h1>

      {/* Categories */}
      <div className="flex items-center justify-center sm:justify-center overflow-x-auto mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            className={`text-sm sm:text-lg md:text-xl font-medium transition-all hover:text-primary relative px-3 py-2 flex-shrink-0
              ${activeCategory === category.value
                ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-primary"
                : "text-muted-foreground"}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} // Adjusted for smooth animation
            viewport={{ once: false }} // Keeps animation triggered every time the card comes into view
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
