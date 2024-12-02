import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'detail', title: 'Detail' },
    { name: 'block', title: 'Block' },
    { name: 'seo', title: 'SEO' },
    { name: 'variants', title: 'Variants', hidden: ({ document }) => document?.pageType !== 'multiple' },
  ],
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'detail',
      options: {
        list: [
          { title: 'Single', value: 'single' },
          { title: 'Multiple', value: 'multiple' },
        ],
        layout: 'radio',
      },
      readOnly: true,
      initialValue: 'single',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      group: 'detail',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      group: 'detail',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      group: 'detail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      group: 'detail',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'layout',
      title: 'Page Layout',
      group: 'block',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'contentBlock' }],
        },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('SEO titles are better when they’re under 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('SEO descriptions are better when they’re under 160 characters.'),
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      group: 'variants',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      hidden: ({ document }) => document?.pageType !== 'multiple',
    }),
  ],
});
