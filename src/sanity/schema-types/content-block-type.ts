import { defineType, defineField } from 'sanity';

export const contentBlockType = defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  groups: [
    { name: 'detail', title: 'Detail' },
    { name: 'list', title: 'List' },
  ],
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      group: 'detail',
      type: 'string',
      options: {
        list: [
          { title: 'Basic Block', value: 'basic' },
          { title: 'List Block', value: 'list' },
          { title: 'Category List', value: 'categoryBlock' },
          { title: 'Post List', value: 'post' },
          { title: 'Testimonial List', value: 'testimonial' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'basic',
      validation: (Rule) => Rule.required(),
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
      name: 'customAttributes',
      title: 'Custom Attributes',
      group: 'detail',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'attribute',
          title: 'Attribute',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              key: 'key',
              value: 'value',
            },
            prepare({ key, value }) {
              return {
                title: `${key}: ${value}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      group: 'detail',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      group: 'detail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: 'application/pdf,video/*,image/*',
      },
    }),
    defineField({
      name: 'listItems',
      title: 'List of Items',
      group: 'list',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
      hidden: ({ parent }) => parent.blockType !== 'list',
    }),
    defineField({
      name: 'categoryBlock',
      title: 'Category List',
      group: 'list',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      hidden: ({ parent }) => parent.blockType !== 'categoryBlock',
    }),
  ],
});

export default contentBlockType;
