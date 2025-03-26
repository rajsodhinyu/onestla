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
      description: 'Small intro/lede/scene setting. No images please.',
      type: 'blockContent',
    }),

    defineField({
      name: 'bigtag',
      title: 'Category',
      description: 'This tag will be visible above the heading',
      type: 'reference',
      to: {type: 'blogtag'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Thumbnail',
      type: 'image',
      options: {sources: [mediaAssetSource], hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
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
      name: 'slideshow',
      type: 'array',
      title: 'Slideshow',
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
      name: 'smalltag',
      title: 'Other tags',
      description: 'these tags will be at the bottom of the article',
      type: 'array',
      of: [{type: 'reference', to: {type: 'blogtag'}}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'site.com/blog/...',
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
