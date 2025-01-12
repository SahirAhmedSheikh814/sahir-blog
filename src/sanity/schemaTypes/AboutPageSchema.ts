const aboutPageSchema = {
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Your full name',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A short bio about yourself',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a profile picture',
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      description: 'A detailed introduction about yourself and your blog',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List your key skills',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
      description: 'Links to your social media profiles',
    },
    {
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of your hobbies or interests',
    },
    {
      name: 'quote',
      title: 'Favorite Quote',
      type: 'text',
      description: 'Your favorite quote',
    },
    {
      name: 'timeline',
      title: 'Professional Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year', type: 'string' },
            { name: 'event', title: 'Event', type: 'text' },
          ],
          preview: {
            select: { title: 'year', subtitle: 'event' },
          },
        },
      ],
      description: 'Your professional timeline or key milestones',
    },
  ],
};

export default aboutPageSchema;