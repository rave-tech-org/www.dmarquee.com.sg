import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'detail', title: 'Detail' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      group: 'detail',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Blog', value: 'blog' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'news',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'detail',
      validation: (Rule) => Rule.required().error('Title is required'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'detail',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug is required to generate a URL'),
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      group: 'detail',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Published date is required'),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      description: 'Upload an image for preview purpose',
      type: 'image',
      options: { hotspot: true },
      group: 'detail',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'detail',
      validation: (Rule) => Rule.required().error('Summary of a news or blog is required for preview'),
    }),

    defineField({
      name: 'contents',
      title: 'Contents',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'content',
          title: 'Content',
          fields: [
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required().error('Content is required'),
            },
            {
              name: 'image',
              title: "Content's Image",
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string', title: 'Caption' }],
            },
            {
              name: 'isGrayBackground',
              title: 'Gray Background Color?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'leftImage',
              title: 'Image on the left side?',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedDate: 'publishedDate',
      type: 'type',
    },
    prepare({ title, publishedDate, type }) {
      const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date';
      return {
        title,
        subtitle: `${(type as string).toUpperCase()}, ${formattedDate}`,
      };
    },
  },
});
