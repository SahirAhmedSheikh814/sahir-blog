import { Rule } from '@sanity/types';

const bigPostSchema = {
  name: 'bigPost',
  title: 'Big Post',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(5).max(100),
    },
    {
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      validation: (Rule: Rule) => Rule.required().min(10).max(500),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().max(50),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().max(30), 
    },
  ],
};

export default bigPostSchema;
