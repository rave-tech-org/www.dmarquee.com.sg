import { defineQuery } from 'next-sanity';

export const GetPageMeta = defineQuery(`
  *[_type == "page" && slug.current == $name][0] {
    _id,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords
  }
`);

export const GetPage = defineQuery(`
  *[_type == "page" && slug.current == $name][0] {
    ...,
    layout[]->{
      ...,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url,
      listItems[]{
        ...,
        "imageUrl": image.asset->url,
        customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        },
      },
      "categories": categoryBlock[]->{
        ...
      },
      customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
    },
    variants[]->{
      ...
    }
  }
`);

export const GetPages = defineQuery(`
  *[_type == "page"] {
    ...,
    layout[]->{
      ...,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url,
      listItems[]{
        ...,
        "imageUrl": image.asset->url,
        customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        },
      },
      "categories": categoryBlock[]->{
        ...
      },
      customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
    },
    variants[]->{
      ...
    }
  }
`);

export const GetPosts = defineQuery(`
  *[_type == "post"] | order(publishedDate desc) {
    ...,
    contents[] {
      ...,
      "imageUrl": image.asset->url,
    },
    "imageUrl": image.asset->url
  }
`);

export const GetTestimonials = defineQuery(`
  *[_type == "testimonial"] {
    ...,
    "imageUrl": image.asset->url,
    product->{
      ...
    }
  }
`);

export const GetHeaderLayout = defineQuery(`
  *[_type == "page" && slug.current == "header-layout"][0] {
    ...,
    "imageUrl": image.asset->url,
    description,
    layout[]->{
      ...,
      "imageUrl": image.asset->url,
      listItems[]{
        ...,
        "imageUrl": image.asset->url
      }
    }
  }
`);

export const GetFooterLayout = defineQuery(`
  *[_type == "page" && slug.current == "footer-layout"][0] {
    ...,
    "imageUrl": image.asset->url,
    layout[]->{
      ...,
      "imageUrl": image.asset->url,
      listItems[]{
        ...,
        "imageUrl": image.asset->url
      }
    }
  }
`);

export const GetCategoriesByParentCategory = defineQuery(`
  *[_type == "category" && parentCategory->slug.current == $slug] {
    ...
  }
`);

export const GetCategoriesByParentCategories = defineQuery(`
  *[_type == "category" && parentCategory->slug.current in $slugs] {
    ...,
    parentCategory->{
      ...
    }
  }
`);

export const GetProductsByParentCategories = defineQuery(`
  *[_type == "product" && references(
    *[_type == "category" && parentCategory->slug.current in $categories]._id
  )] {
    ...,
    "imageUrl": image.asset->url,
    categories[]->{
      ...
    }
  }
`);

export const GetContentBlockBySlug = defineQuery(`
  *[_type == "contentBlock" && slug.current == $slug][0] {
    ...,
    "imageUrl": image.asset->url,
    listItems[]{
      ...,
      "imageUrl": image.asset->url,
      customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
    },
    "categories": categoryBlock[]->{
      ...
    },
    customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
  }
`);

export const GetProductBySlug = defineQuery(`
  *[_type == "product" && slug.current == $slug && productType == $type][0] {
    ...,
    "imageUrl": image.asset->url,
    "helpIconImageUrl": helpIcon.asset->url,
    itinerary[]{
      ...,
      "imageUrls": images[].asset->url
    },
    tourSummary[]{
      ...,
      "imageUrl": image.asset->url
    },
    categories[]->{
      ...
    }
  }
`);

export const GetProductsByType = defineQuery(`
  *[_type == "product" && productType == $type] {
    ...,
    "imageUrl": image.asset->url,
    categories[]->{
      ...
    }
  }
`);

export const GetPostBySlug = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    "imageUrl": image.asset->url
  }
`);

export const GetProductsByCategory = defineQuery(`
  *[_type == "product" && references(
    *[_type == "category" && slug.current == $categorySlug]._id
  )] {
    ...,
    "imageUrl": image.asset->url,
    categories[]->{
      ...
    }
  }
`);

export const GetProducts = defineQuery(`
  *[_type == "product"] {
    ...,
    "imageUrl": image.asset->url,
    categories[]->{
      ...
    }
  }
`);

export const GetContentBlock = defineQuery(`
  *[_type == "contentBlock"][0] {
    ...,
    "imageUrl": image.asset->url,
    "fileUrl": file.asset->url,
    listItems[]{
      ...,
      "imageUrl": image.asset->url,
      customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
    },
    "categories": categoryBlock[]->{
      ...
    },
    customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
  }
`);

export const GetCategories = defineQuery(`
  *[_type == "category"] {
    ...,
    parentCategory->{
      ...
    }
  }
`);

export const GetContentBlocks = defineQuery(`
  *[_type == "contentBlock"] {
    ...,
    "imageUrl": image.asset->url,
    "fileUrl": file.asset->url,
    listItems[]{
      ...,
      "imageUrl": image.asset->url,
      customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
    },
    "categories": categoryBlock[]->{
      ...
    },
    customAttributes[]{
          ...,
          "imageUrl": image.asset->url
        }
  }
`);
