import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  icon: () => '📍',
  fields: [
    defineField({
      name: 'title',
      title: 'Destination Title',
      type: 'string',
      description: 'Name of the destination (e.g., "Gulmarg", "Srinagar", "Pahalgam")',
      validation: (Rule) => 
        Rule.required()
          .min(3)
          .max(100)
          .error('Title must be between 3 and 100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (auto-generated)',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Brief overview of the destination',
      validation: (Rule) => 
        Rule.required()
          .min(50)
          .max(500)
          .error('Description must be between 50 and 500 characters'),
    }),
    defineField({
      name: 'bestSeason',
      title: 'Best Season to Visit',
      type: 'string',
      description: 'Recommended time of year to visit this destination',
      options: {
        list: [
          { title: 'Spring (March - May)', value: 'spring' },
          { title: 'Summer (June - August)', value: 'summer' },
          { title: 'Autumn (September - November)', value: 'autumn' },
          { title: 'Winter (December - February)', value: 'winter' },
          { title: 'Year Round', value: 'year-round' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Upload multiple images for this destination. They auto-rotate on the website every 2 seconds.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule) => 
        Rule.min(1)
          .error('At least one image is required')
          .max(10)
          .error('Maximum 10 images allowed'),
    }),
    defineField({
      name: 'thingsToDo',
      title: 'Things to Do',
      type: 'array',
      description: 'List of activities and attractions',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'activity',
              title: 'Activity Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'activity',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => 
        Rule.min(3)
          .error('At least 3 activities are required'),
    }),
    defineField({
      name: 'localTips',
      title: 'Local Tips',
      type: 'array',
      description: 'Helpful tips for travelers visiting this destination',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'tip',
              title: 'Tip',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Transportation', value: 'transportation' },
                  { title: 'Accommodation', value: 'accommodation' },
                  { title: 'Food & Dining', value: 'food' },
                  { title: 'Safety', value: 'safety' },
                  { title: 'Weather', value: 'weather' },
                  { title: 'Culture', value: 'culture' },
                  { title: 'Shopping', value: 'shopping' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'tip',
              subtitle: 'category',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Destination',
      type: 'boolean',
      description: 'Show this destination prominently on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'bestSeason',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      const seasonLabels: Record<string, string> = {
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter',
        'year-round': 'Year Round',
      };
      return {
        title,
        subtitle: subtitle ? `Best Season: ${seasonLabels[subtitle] || subtitle}` : 'No season set',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Best Season',
      name: 'seasonAsc',
      by: [{ field: 'bestSeason', direction: 'asc' }],
    },
  ],
});
