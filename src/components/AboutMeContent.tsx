"use client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import SectionHeading from "@/components/Helper/SectionHeading";
import { motion } from "framer-motion";

interface AboutProps {
  profileImage: string;
  name: string;
  bio: string;
  introduction: any;
  skills: string[];
  timeline: { year: string; event: string }[];
  hobbies: string[];
  quote: string;
  socialLinks: { platform: string; url: string }[];
}

export default function AboutMeContent({ about }: { about: AboutProps }) {
  const socialIcons = {
    github: FaGithub,
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
  } as const;

  return (
    <div className="bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4 py-28 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: About Me */}
        <motion.div
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }} // Adjusted for smooth animation
         viewport={{ once: false }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <Image
            src={urlFor(about.profileImage).url()}
            alt={`${about.name}'s Profile`}
            width={200}
            height={200}
            className="rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-lg"
            priority
          />
          <h1 className="text-4xl font-bold mb-3 text-blue-800 text-center">
            {about.name}
          </h1>
          <p className="text-xl text-gray-600 text-center">{about.bio}</p>
          <div className="py-8">
            <SectionHeading>About Me</SectionHeading>
            <div className="mt-8 prose max-w-none">
              <PortableText value={about.introduction} />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Skills and Other Sections */}
        <div className="pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} // Adjusted for smooth animation
            viewport={{ once: false }}
            className="space-y-8"
          >
            {/* Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <SectionHeading>Skills</SectionHeading>
              <div className="mt-8 justify-center items-center flex flex-wrap gap-6">
                {about.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm transition-transform hover:scale-105 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Timeline */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <div className="pt-5">
                <SectionHeading>Professional Timeline</SectionHeading>
              </div>
              <div className="mt-12">
                {about.timeline.map((item, index) => (
                  <div key={index} className="flex mb-4">
                    <div className="flex-shrink-0 w-24 text-right mr-4">
                      <span className="font-bold text-blue-600">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-grow pb-4 border-l-2 border-blue-300 pl-4">
                      <p>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies and Interests */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="pt-5">
                <SectionHeading>Hobbies & Interests</SectionHeading>
              </div>
              <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                {about.hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="flex justify-start items-center sm:justify-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                    <span className="truncate">{hobby}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Favorite Quote */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 text-center">
              <div className="pt-5">
                <SectionHeading>Favorite Quote</SectionHeading>
              </div>
              <blockquote className="text-xl italic text-gray-700 mt-12">
                "{about.quote}"
              </blockquote>
            </div>

            {/* Connect with Me */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="pt-5">
                <SectionHeading>Connect with Me</SectionHeading>
              </div>
              <div className="flex justify-center gap-6 mt-12">
                {about.socialLinks.map((link, index) => {
                  const platform = link.platform.toLowerCase();
                  const Icon =
                    socialIcons[platform as keyof typeof socialIcons];
                  const hoverClass =
                    {
                      instagram: "hover:text-pink-500",
                      github: "hover:text-gray-800",
                      facebook: "hover:text-blue-600",
                      linkedin: "hover:text-blue-700",
                    }[platform] || "hover:text-gray-600";

                  return Icon ? (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-600 transition-colors ${hoverClass}`}
                    >
                      <Icon
                        size={32}
                        className="transition-transform hover:scale-110"
                      />
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
