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
    _id,
    title,
    slug,
    pageType,
    layout[]->{
      _id,
      slug,
      blockType,
      title,
      description,
      image,
      "imageUrl": image.asset->url,
      "fileUrl": file.asset->url,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image,
        "imageUrl": image.asset->url,
      },
      "categories": categoryBlock[]->{
        _id,
        slug,
      }
    },
    variants[]->{
      _id,
      title,
      slug
    }
  }
`);

export const GetPosts = defineQuery(`
  *[_type == "post"] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    "imageUrl": image.asset->url,
    content,
    tags
  }
`);

export const GetTestimonials = defineQuery(`
  *[_type == "testimonial"]{
    name,
    slug,
    testimonialText,
    "imageUrl": image.asset->url,
    rating,
    dateTime,
    product->{
      name,
      slug
    }
  }
`);

export const GetHeaderLayout = defineQuery(`
  *[_type == "page" && slug.current == "header-layout"][0] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    description,
    layout[]->{
      _id,
      slug,
      blockType,
      title,
      description,
      image,
      "imageUrl": image.asset->url,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image,
        "imageUrl": image.asset->url,
      },
    }
  }
`);

export const GetFooterLayout = defineQuery(`
  *[_type == "page" && slug.current == "footer-layout"][0] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    description,
    layout[]->{
      _id,
      slug,
      blockType,
      title,
      description,
      image,
      "imageUrl": image.asset->url,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image,
        "imageUrl": image.asset->url,
      },
    }
  }
`);

export const GetCategoriesByParentCategory = defineQuery(`
  *[_type == "category" && parentCategory->slug.current == $slug] {
    _id,
    name,
    slug,
    description
  }
`);

export const GetCategoriesByParentCategories = defineQuery(`
  *[_type == "category" && parentCategory->slug.current in $slugs] {
    _id,
    name,
    slug,
    description,
    parentCategory-> {
      _id,
      slug,
    }
  }
`);

export const GetProductsByParentCategories = defineQuery(`
  *[_type == "product" && references(
    *[_type == "category" && parentCategory->slug.current in $categories]._id
  )] {
    _id,
    name,
    slug,
    price,
    "imageUrl": image.asset->url,
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    },
    features,
    customPrices
  }
`);

export const GetContentBlockBySlug = defineQuery(`
  *[_type == "contentBlock" && slug.current == $slug][0] {
    _id,
    slug,
    blockType,
    title,
    description,
    image,
    "imageUrl": image.asset->url,
    customAttributes,
    listItems[]{
      title,
      slug,
      description,
      image,
      "imageUrl": image.asset->url,
    },
    "categories": categoryBlock[]->{
      _id,
      slug,
    }
  }
`);

export const GetProductBySlug = defineQuery(`
  *[_type == "product" && slug.current == $slug && productType == $type][0]{
    name,
    productType,
    slug,
    price,
    customPrices,
    availableDate,
    duration,
    description,
    "imageUrl": image.asset->url,
    "helpIconImageUrl": helpIcon.asset->url,
    landArea,
    averageClimate,
    travelDuration,
    peakSeason,
    midSeason,
    monsoonSeason,
    travelGuide,
    bookingUrl,
    features,
    overview,
    itinerary[]{
      title,
      "imageUrls": images[].asset->url,
      description
    },
    accommodation,
    thingsToNote,
    tourSummary[]{
      "imageUrl": image.asset->url,
      isActive,
      title,
      description
    },
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    }
  }
`);

export const GetProductsByType = defineQuery(`
  *[_type == "product" && productType == $type]{
    _id,
    name,
    slug,
    price,
    "imageUrl": image.asset->url,
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    },
    features,
    customPrices
  }
`);

export const GetPostBySlug = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    price,
    publishedDate,
    excerpt,
    "imageUrl": image.asset->url,
    content,
    tags,
  }
`);

export const GetProductsByCategory = defineQuery(`
  *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] {
    _id,
    name,
    slug,
    price,
    "imageUrl": image.asset->url,
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    },
    features,
    customPrices
  }
`);

export const GetProducts = defineQuery(`
  *[_type == "product"] {
    _id,
    name,
    slug,
    price,
    productType,
    "imageUrl": image.asset->url,
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    },
    features,
    customPrices
  }
`);

export const GetContentBlock = defineQuery(`
  *[_type == "contentBlock"][0] {
    _id,
    slug,
    blockType,
    title,
    description,
    image,
    "imageUrl": image.asset->url,
    "fileUrl": file.asset->url,
    customAttributes,
    listItems[]{
      title,
      slug,
      description,
      image,
      "imageUrl": image.asset->url,
    },
    "categories": categoryBlock[]->{
      _id,
      slug,
    }
  }
`);

export const GetCategories = defineQuery(`
  *[_type == "category"] {
    _id,
    name,
    slug,
    parentCategory-> {
      slug
    }
  }
`);

export const GetContentBlocks = defineQuery(`
  *[_type == "contentBlock"] {
    _id,
    slug,
    blockType,
    title,
    description,
    image,
    "imageUrl": image.asset->url,
    "fileUrl": file.asset->url,
    customAttributes,
    listItems[]{
      title,
      slug,
      description,
      image,
      "imageUrl": image.asset->url,
    },
    "categories": categoryBlock[]->{
      _id,
      slug,
    }
  }
`);
