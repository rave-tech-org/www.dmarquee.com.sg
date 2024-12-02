import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    { name: 'tourDetails', title: 'Tour Details' },
    { name: 'destinationDetails', title: 'Destination Details' },
  ],
  fields: [
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tour', value: 'tour' },
          { title: 'Transport', value: 'transport' },
          { title: 'Destination', value: 'destination' },
          { title: 'Ticket', value: 'ticket' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Product name is required'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required().error('Slug is required to generate a URL'),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one category is required'),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'tourDetails',
      validation: (Rule) => Rule.min(0).error('Price must be a positive number'),
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'customPrices',
      title: 'Custom Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'price',
          title: 'Price',
          fields: [
            { name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { key: 'key', value: 'value' },
            prepare({ key, value }) {
              return { title: `${key}: ${value}` };
            },
          },
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'departureDateRanges',
      title: 'Departure Date Ranges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'datetime',
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'datetime',
            },
          ],
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'duration',
      title: 'Duration (Hours or Days)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
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

    defineField({
      name: 'helpIcon',
      title: 'Help Icon',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            { name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { key: 'key', value: 'value' },
            prepare({ key, value }) {
              return { title: `${key}: ${value}` };
            },
          },
        },
      ],
    }),

    defineField({
      name: 'areaName',
      title: 'Area Name',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'landArea',
      title: 'Land Area',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'travelDuration',
      title: 'Travel Duration',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'averageClimate',
      title: 'Average Climate',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'peakSeason',
      title: 'Peak Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'midSeason',
      title: 'Mid Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'monsoonSeason',
      title: 'Monsoon Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'travelGuide',
      title: 'Travel Guide',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
    }),

    defineField({
      name: 'tourSummary',
      title: 'Tour Summary',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tourSummaryItem',
          title: 'Tour Summary Item',
          fields: [
            {
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              options: {
                withLabel: true,
              },
              initialValue: true,
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'title', image: 'image' },
            prepare({ title, image }) {
              return { title: title || 'Tour Summary Item', media: image };
            },
          },
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      description: 'Add images in supported formats (excluding SVG)',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'itineraryItem',
          title: 'Itinerary Item',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image' }],
              options: { layout: 'grid' },
            },
          ],
          preview: {
            select: { title: 'title', image: 'images.0' },
            prepare({ title, image }) {
              return {
                title: title || 'Itinerary Item',
                media: image,
              };
            },
          },
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'transportation',
      title: 'Transportation',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'accommodation',
      title: 'Accommodation',
      description: 'Add images in supported formats (excluding SVG)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }, { type: 'post' }] }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'thingsToNote',
      title: 'Things to Note',
      type: 'array',
      description: 'Add images in supported formats (excluding SVG)',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      productType: 'productType',
      image: 'image',
    },
    prepare({ title, productType, image }) {
      return {
        title: `${title} - ${productType}`,
        media: image || EarthGlobeIcon,
      };
    },
  },
});
