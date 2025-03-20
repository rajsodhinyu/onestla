import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfoliotag',
  title: 'Types of Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
