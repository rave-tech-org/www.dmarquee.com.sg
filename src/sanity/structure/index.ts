import type { StructureResolver } from 'sanity/structure';
import { TagIcon, PackageIcon, UserIcon, DocumentIcon, DashboardIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('CMS')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem().title('Pages').schemaType('page').child(S.documentTypeList('page').title('All Pages')),

              S.listItem()
                .title('Content Blocks')
                .schemaType('contentBlock')
                .child(S.documentTypeList('contentBlock').title('All Content Blocks')),
              S.listItem()
                .title('Testimonial')
                .schemaType('testimonial')
                .child(S.documentTypeList('testimonial').title('All Testimonials')),
              S.listItem().title('Post').schemaType('post').child(S.documentTypeList('post').title('All Posts')),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Package Lists')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Package Lists')
            .items([
              // Products
              S.listItem()
                .title('Products')
                .icon(PackageIcon)
                .child(
                  S.list()
                    .title('Products')
                    .items([
                      S.listItem()
                        .title('All Products')
                        .schemaType('product')
                        .child(S.documentTypeList('product').title('All Products')),

                      S.listItem()
                        .title('Tour')
                        .schemaType('product')
                        .child(S.documentList().title('Tour').filter('_type == "product" && productType == "tour"')),

                      S.listItem()
                        .title('Transport')
                        .schemaType('product')
                        .child(
                          S.documentList().title('Transport').filter('_type == "product" && productType == "transport"')
                        ),

                      S.listItem()
                        .title('Destination')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Destination')
                            .filter('_type == "product" && productType == "destination"')
                        ),

                      S.listItem()
                        .title('Ticket')
                        .schemaType('product')
                        .child(
                          S.documentList().title('Ticket').filter('_type == "product" && productType == "ticket"')
                        ),
                    ])
                ),

              // Categories
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .schemaType('category')
                .child(S.documentTypeList('category').title('All Categories')),
            ])
        ),

      S.divider(),
    ]);
