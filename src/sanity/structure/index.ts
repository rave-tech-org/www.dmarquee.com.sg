import {
  BlockContentIcon,
  CommentIcon,
  DocumentIcon,
  DocumentTextIcon,
  ImageIcon,
  ImagesIcon,
  StringIcon,
} from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('All Pages'))
        .icon(DocumentIcon),

      S.listItem()
        .title('Content Blocks')
        .schemaType('contentBlock')
        .child(S.documentTypeList('contentBlock').title('All Content Blocks'))
        .icon(BlockContentIcon),
      S.listItem()
        .title('News & Blog')
        .schemaType('post')
        .child(S.documentTypeList('post').title('All News & Blog'))
        .icon(StringIcon),
      // S.listItem()
      //   .title('Testimonial')
      //   .schemaType('testimonial')
      //   .child(S.documentTypeList('testimonial').title('All Testimonials'))
      //   .icon(CommentIcon),

      S.listItem()
        .title('Assets')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('All Assets')
            .items([
              S.listItem()
                .title('Images')
                .icon(ImagesIcon)
                .child(S.documentList().title('All Images').filter('_type == "sanity.imageAsset"')),
              S.listItem()
                .icon(DocumentTextIcon)
                .title('Files')
                .child(S.documentList().title('All Files').filter('_type == "sanity.fileAsset"')),
            ])
        ),
    ]);
