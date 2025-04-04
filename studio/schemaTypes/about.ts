import {defineField, defineType} from 'sanity'
import {mediaAssetSource} from 'sanity-plugin-media'

export default defineType({
  name: 'about',
  title: 'about',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Big Title at the top',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Picture',
      type: 'image',
      options: {sources: [mediaAssetSource], hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'About statement',
      type: 'blockContent',
    }),
  ],
})
