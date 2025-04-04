import type {StructureResolver} from 'sanity/structure'
import {FaPassport, FaMap, FaHeadSideVirus, FaTag} from 'react-icons/fa'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Blog').icon(FaPassport),
      S.documentTypeListItem('portfolio').title('Portfolio').icon(FaMap),
      S.divider(),
      S.documentTypeListItem('author').title('Credits').icon(FaHeadSideVirus),
      S.documentTypeListItem('blogtag').title('Categories and Tags').icon(FaTag),
      S.listItem()
        .id('about-page-list')
        .schemaType('about')
        .title('Mission Statement')
        .child(S.editor().id('about-page').schemaType('about').documentId('aboutpage')),
    ])
