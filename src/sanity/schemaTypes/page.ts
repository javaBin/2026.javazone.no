import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showInHeader',
      title: 'Show in Header',
      type: 'boolean',
      description: 'Enable to show this page as a link in the site navigation.',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'subheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'ctaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Hero CTA Button URL',
      type: 'url',
      group: 'hero',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [{ type: 'plainTextBlock' }, { type: 'textInBoxBlock' }, { type: 'textNextToImageBlock' }, { type: 'mediaBlock' }],
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Content' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
