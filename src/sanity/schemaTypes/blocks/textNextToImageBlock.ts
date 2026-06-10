import { defineField, defineType } from 'sanity'

export const textNextToImageBlock = defineType({
  name: 'textNextToImageBlock',
  title: 'Text Next to Image',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'imageCaption', title: 'Image Caption', type: 'string' }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: { title: 'imagePosition' },
    prepare: ({ title }: { title?: string }) => ({
      title: 'Text Next to Image',
      subtitle: `Image: ${title ?? 'right'}`,
    }),
  },
})
