import { defineField, defineType } from 'sanity'

export const textInBoxBlock = defineType({
  name: 'textInBoxBlock',
  title: 'Text in Box',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Neutral', value: 'neutral' },
        ],
        layout: 'radio',
      },
      initialValue: 'neutral',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Text in Box Block' }),
  },
})
