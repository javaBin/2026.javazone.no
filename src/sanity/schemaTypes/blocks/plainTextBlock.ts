import { defineField, defineType } from 'sanity'

export const plainTextBlock = defineType({
  name: 'plainTextBlock',
  title: 'Plain Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Plain Text Block' }),
  },
})
