
import AboutMeContent from "@/components/AboutMeContent";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export default async function AboutMePage() {
  const query = groq`
    *[_type == "aboutMe"][0] {
      name,
      bio,
      profileImage,
      introduction,
      skills,
      socialLinks[] {
        platform,
        url
      },
      hobbies,
      quote,
      timeline[] {
        year,
        event
      }
    }
  `;

  const about = await client.fetch(query);

  return <AboutMeContent about={about} />;
}
