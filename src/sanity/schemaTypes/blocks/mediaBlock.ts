import { defineField, defineType } from 'sanity'

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }: { parent: Record<string, unknown> }) => parent.mediaType !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }: { parent: Record<string, unknown> }) => parent.mediaType !== 'video',
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
  ],
  preview: {
    select: { title: 'mediaType' },
    prepare: ({ title }: { title?: string }) => ({
      title: 'Media Block',
      subtitle: title ?? 'image',
    }),
  },
})
