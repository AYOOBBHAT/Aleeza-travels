import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the blog post',
      validation: (Rule) => 
        Rule.required()
          .min(10)
          .max(100)
          .error('Title must be between 10 and 100 characters'),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Short summary for previews and SEO (150-160 characters recommended)',
      validation: (Rule) => 
        Rule.required()
          .min(100)
          .max(200)
          .error('Excerpt must be between 100 and 200 characters for optimal SEO'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image for the blog post (recommended: 1200x630px for social sharing)',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Author Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'bio',
          title: 'Author Bio',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this post was/will be published',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g., "5 min read"',
      placeholder: 'e.g., 5 min read',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Destinations', value: 'destinations' },
          { title: 'Travel Tips', value: 'travel-tips' },
          { title: 'Culture & Heritage', value: 'culture' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Food & Cuisine', value: 'food' },
          { title: 'Photography', value: 'photography' },
          { title: 'Seasonal Guides', value: 'seasonal' },
        ],
      },
      validation: (Rule) => 
        Rule.min(1)
          .error('At least one category is required'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Main content of the blog post',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'code',
              type: 'text',
              title: 'Code',
            },
            {
              name: 'language',
              type: 'string',
              title: 'Language',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                ],
              },
            },
          ],
        },
      ],
      validation: (Rule) => 
        Rule.min(1)
          .error('Content is required'),
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search Engine Optimization settings',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters recommended)',
          validation: (Rule) => 
            Rule.max(60)
              .warning('Meta titles should be under 60 characters for optimal SEO'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (150-160 characters recommended)',
          validation: (Rule) => 
            Rule.max(160)
              .warning('Meta descriptions should be under 160 characters for optimal SEO'),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          description: 'Relevant keywords for SEO (comma-separated)',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px recommended). Falls back to cover image if not set.',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Canonical URL if this content is republished from another source',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post prominently on the blog page',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      return {
        title,
        subtitle: author 
          ? `by ${author} • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'}`
          : publishedAt 
            ? new Date(publishedAt).toLocaleDateString()
            : 'Draft',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});

