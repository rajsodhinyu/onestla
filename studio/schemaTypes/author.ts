import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Credit',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      description: 'Only reuse a credit if it is the same person doing the same thing!',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      role: 'role',
      name: 'name',
    },
    prepare(selection) {
      const {role, name} = selection
      return {
        title: `${role}: ${name}`,
      }
    },
  },
})
