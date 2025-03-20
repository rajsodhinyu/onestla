import {defineField, defineType} from 'sanity'
import {mediaAssetSource} from 'sanity-plugin-media'

export default defineType({
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Header',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheader',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Thumbnail',
      type: 'image',
      options: {sources: [mediaAssetSource], hotspot: true},
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'blogtag'}}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
