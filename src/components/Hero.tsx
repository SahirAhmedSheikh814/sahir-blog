
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default async function Home() {
  const query = `*[_type == "heroPage"][0]{
    heading,
    paragraph,
    buttonText,
    image
  }`;

  const heroData = await client.fetch(query);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={urlFor(heroData.image).url()}
          alt="Hero section Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{
            objectFit: "cover",
            filter: "brightness(0.7)",
          }}
          quality={100}
          priority
        />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-6xl leading-[84px] font-bold text-[64px] tracking-[0.5px] text-white mb-4 drop-shadow-lg">
          {heroData.heading}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl font-normal text-[36px] leading-9 text-[#ffffff] mb-6 drop-shadow-md">
          {heroData.paragraph}
        </p>
        <button className="bg-white hover:bg-slate-200 text-[#121416] px-6 py-3 mb-4 rounded-lg text-sm md:text-lg font-bold text-[20px] leading-6 z-10 transition">
          {heroData.buttonText}
        </button>
      </div>
    </div>
  );
}
