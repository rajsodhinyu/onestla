import {defineField, defineType} from 'sanity'
import {mediaAssetSource} from 'sanity-plugin-media'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Header Image',
      type: 'image',
      options: {sources: [mediaAssetSource], hotspot: true},
    }),
    defineField({
      name: 'worktype',
      title: 'Portfolio Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'portfoliotag'}}],
    }),

    defineField({
      name: 'images',
      type: 'array',
      title: 'Images of Work',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            sources: [mediaAssetSource],
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'slideshow_bool',
      title: 'Check to show as Slideshow instead of Grid',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Write Up',
      type: 'blockContent',
    }),

    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [{type: 'reference', to: {type: 'author'}}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL',
      description: 'onestla.co/work/...',
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
      options: {
        dateFormat: 'D MMMM YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stamp',
      title: 'Stamp',
      type: 'image',
      options: {sources: [mediaAssetSource], hotspot: true},
      validation: (rule) => rule.required(),
    }),
  ],
  initialValue: {
    slideshow_bool: false,
  },
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
