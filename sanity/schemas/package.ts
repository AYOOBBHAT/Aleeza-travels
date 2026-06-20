import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'package',
  title: 'Travel Package',
  type: 'document',
  icon: () => '🎒',
  fields: [
    defineField({
      name: 'title',
      title: 'Package Title',
      type: 'string',
      description: 'Name of the travel package',
      validation: (Rule) => 
        Rule.required()
          .min(5)
          .max(100)
          .error('Title must be between 5 and 100 characters'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
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
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Length of the package (e.g., "5 Days / 4 Nights")',
      placeholder: 'e.g., 5 Days / 4 Nights',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Background image shown on package cards and detail page (recommended: 1200x800px)',
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
      ],
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'object',
      description: 'Pricing information for the package',
      fields: [
        {
          name: 'startingFrom',
          title: 'Starting From',
          type: 'string',
          placeholder: 'e.g., ₹25,000',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'perPerson',
          title: 'Per Person',
          type: 'boolean',
          description: 'Is this price per person?',
          initialValue: true,
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'Indian Rupee (₹)', value: 'INR' },
              { title: 'US Dollar ($)', value: 'USD' },
              { title: 'Euro (€)', value: 'EUR' },
            ],
          },
          initialValue: 'INR',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destinationsCovered',
      title: 'Destinations Covered',
      type: 'array',
      description: 'Select all destinations included in this package',
      of: [
        {
          type: 'reference',
          to: [{ type: 'destination' }],
        },
      ],
      validation: (Rule) => 
        Rule.min(1)
          .error('At least one destination must be selected'),
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-wise Itinerary',
      type: 'array',
      description: 'Detailed day-by-day itinerary',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day Number',
              type: 'number',
              validation: (Rule) => 
                Rule.required()
                  .positive()
                  .integer()
                  .error('Day must be a positive integer'),
            },
            {
              name: 'title',
              title: 'Day Title',
              type: 'string',
              placeholder: 'e.g., Arrival in Srinagar',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Activities & Details',
              type: 'text',
              rows: 4,
              description: 'Detailed description of the day\'s activities',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'meals',
              title: 'Meals Included',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                list: [
                  { title: 'Breakfast', value: 'breakfast' },
                  { title: 'Lunch', value: 'lunch' },
                  { title: 'Dinner', value: 'dinner' },
                ],
              },
            },
            {
              name: 'accommodation',
              title: 'Accommodation',
              type: 'string',
              description: 'Where you\'ll stay this night',
            },
          ],
          preview: {
            select: {
              day: 'day',
              title: 'title',
            },
            prepare({ day, title }) {
              return {
                title: `Day ${day}: ${title}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => 
        Rule.min(1)
          .error('At least one day must be added to the itinerary'),
    }),
    defineField({
      name: 'includes',
      title: 'What\'s Included',
      type: 'array',
      description: 'List of items/services included in the package',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item/Service',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Accommodation', value: 'accommodation' },
                  { title: 'Transportation', value: 'transportation' },
                  { title: 'Meals', value: 'meals' },
                  { title: 'Activities', value: 'activities' },
                  { title: 'Guide Services', value: 'guide' },
                  { title: 'Permits & Fees', value: 'permits' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'item',
              subtitle: 'category',
            },
          },
        },
      ],
      validation: (Rule) => 
        Rule.min(3)
          .error('At least 3 items must be included'),
    }),
    defineField({
      name: 'excludes',
      title: 'What\'s Not Included',
      type: 'array',
      description: 'List of items/services NOT included in the package',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'hotelType',
      title: 'Hotel Type',
      type: 'string',
      description: 'Type of accommodation provided',
      options: {
        list: [
          { title: 'Budget (2-3 Star)', value: 'budget' },
          { title: 'Standard (3 Star)', value: 'standard' },
          { title: 'Deluxe (4 Star)', value: 'deluxe' },
          { title: 'Luxury (5 Star)', value: 'luxury' },
          { title: 'Heritage/Resort', value: 'heritage' },
          { title: 'Houseboat', value: 'houseboat' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transportDetails',
      title: 'Transportation Details',
      type: 'object',
      description: 'Information about transportation',
      fields: [
        {
          name: 'pickupLocation',
          title: 'Pickup Location',
          type: 'string',
          placeholder: 'e.g., Srinagar Airport',
        },
        {
          name: 'dropoffLocation',
          title: 'Drop-off Location',
          type: 'string',
          placeholder: 'e.g., Srinagar Airport',
        },
        {
          name: 'vehicleType',
          title: 'Vehicle Type',
          type: 'string',
          options: {
            list: [
              { title: 'Sedan (4 seater)', value: 'sedan' },
              { title: 'SUV (6-7 seater)', value: 'suv' },
              { title: 'Tempo Traveller (12 seater)', value: 'tempo' },
              { title: 'Bus (20+ seater)', value: 'bus' },
              { title: 'Not Included', value: 'not-included' },
            ],
          },
        },
        {
          name: 'driverIncluded',
          title: 'Driver Included',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'fuelIncluded',
          title: 'Fuel Included',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'safetyNotes',
      title: 'Safety Notes & Important Information',
      type: 'array',
      description: 'Important safety information and travel advisories',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'note',
              title: 'Note',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'priority',
              title: 'Priority',
              type: 'string',
              options: {
                list: [
                  { title: 'High', value: 'high' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Low', value: 'low' },
                ],
              },
              initialValue: 'medium',
            },
          ],
          preview: {
            select: {
              title: 'note',
              subtitle: 'priority',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Package',
      type: 'boolean',
      description: 'Show this package prominently on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      price: 'priceRange.startingFrom',
      media: 'coverImage',
    },
    prepare({ title, subtitle, price }) {
      return {
        title,
        subtitle: `${subtitle} • Starting from ${price || 'Price TBD'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Duration, Shortest First',
      name: 'durationAsc',
      by: [{ field: 'duration', direction: 'asc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
