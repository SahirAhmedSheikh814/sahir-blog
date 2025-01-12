import { Rule } from "sanity";

const navbarSchema = {
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Logo displayed in the navbar",
      options: { hotspot: true },
    },
    {
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      description: "Links to be displayed in the navbar",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              description: "Text for the link",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "URL",
              type: "string", // Changed from 'url' to 'string'
              description: "Target URL for the link",
              validation: (Rule: Rule) =>
                Rule.required().custom((value: string) => {
                  if (!value) return "URL is required.";
                  // Allow both relative and full URLs
                  const isValidUrl = /^(\/|https?:\/\/)/.test(value);
                  return isValidUrl ? true : "Invalid URL. Must start with '/' or 'http(s)://'";
                }),
            },
          ],
        },
      ],
    },
    {
      name: "button",
      title: "Button",
      type: "object",
      description: "Call-to-action button",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: "url",
          title: "Button URL",
          type: "string", // Changed from 'url' to 'string'
          validation: (Rule: Rule) =>
            Rule.required().custom((value: string) => {
              if (!value) return "Button URL is required.";
              // Allow both relative and full URLs
              const isValidUrl = /^(\/|https?:\/\/)/.test(value);
              return isValidUrl ? true : "Invalid URL. Must start with '/' or 'http(s)://'";
            }),
        },
      ],
    },
  ],
};

export default navbarSchema;
