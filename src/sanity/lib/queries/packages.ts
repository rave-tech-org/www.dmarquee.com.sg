const GET_PRODUCTS = `
  *[_type == "product"]{
    _id,
    name,
    slug,
    price,
    images[] {
      asset-> {
        _id,
        url
      }
    },
    category-> { _id, name },
    productType
  }|order(date desc)
`;
