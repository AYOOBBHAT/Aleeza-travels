import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (Rule) => 
        Rule.required()
          .min(10)
          .max(200)
          .error('Question must be between 10 and 200 characters'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      description: 'Detailed answer to the question',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .error('Answer is required'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Organize FAQs by category',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Booking & Payments', value: 'booking' },
          { title: 'Travel & Transportation', value: 'travel' },
          { title: 'Accommodation', value: 'accommodation' },
          { title: 'Destinations', value: 'destinations' },
          { title: 'Packages', value: 'packages' },
          { title: 'Safety & Health', value: 'safety' },
          { title: 'Visa & Documents', value: 'visa' },
          { title: 'Weather & Seasons', value: 'weather' },
          { title: 'Culture & Customs', value: 'culture' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this FAQ appears (lower numbers appear first)',
      initialValue: 0,
      validation: (Rule) => 
        Rule.integer()
          .min(0)
          .error('Order must be a non-negative integer'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured FAQ',
      type: 'boolean',
      description: 'Show this FAQ prominently',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
    },
    prepare({ question, category }) {
      const categoryLabels: Record<string, string> = {
        general: 'General',
        booking: 'Booking & Payments',
        travel: 'Travel & Transportation',
        accommodation: 'Accommodation',
        destinations: 'Destinations',
        packages: 'Packages',
        safety: 'Safety & Health',
        visa: 'Visa & Documents',
        weather: 'Weather & Seasons',
        culture: 'Culture & Customs',
      };
      return {
        title: question,
        subtitle: categoryLabels[category] || category || 'Uncategorized',
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Question, A-Z',
      name: 'questionAsc',
      by: [{ field: 'question', direction: 'asc' }],
    },
  ],
});

