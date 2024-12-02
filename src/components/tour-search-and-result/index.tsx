'use client';

import NextImage from '@/elements/next-image';
import SkeletonLoader from '@/elements/skeleton-loader';
import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import { RightOutlined } from '@ant-design/icons';
import HotDealsCard from '@components/hot-deals-card';
import { Checkbox, Collapse, CollapseProps, GetProps, Input, Pagination, Select, Slider } from 'antd';
import { useState } from 'react';

type SearchProps = GetProps<typeof Input.Search>;

const CheckboxGroup = Checkbox.Group;

const { Search } = Input;

const TourSearchResult = ({ entries }: ContentBlockRegistry) => {
  const [destinationCheckedList, setDestinationCheckedList] = useState<string[]>([]);
  const [hotDealsCheckedList, setHotDealsCheckedList] = useState<string[]>([]);

  const productEntries = entries?.products;
  const productSlugs = ['tour'];
  const categoryEntries = entries?.categories;
  const categorySlugs = ['hot-deals', 'destination'];

  const products = productEntries
    ?.filter((product) => product.productType === 'tour')
    .filter((product) =>
      productSlugs?.some((categorySlug) =>
        product.categories?.some((category) => category.slug?.current === categorySlug)
      )
    )
    .map((product) => ({
      ...product,
      categories:
        product.categories?.filter((category) => !productSlugs?.includes(category?.slug?.current || '')) || null,
    }));

  const categories = categoryEntries
    ?.filter((category) => categorySlugs.includes(category.parentCategory?.slug?.current || ''))
    .filter((category) => !categorySlugs.includes(category.slug?.current || ''));

  if (!products) {
    return <SkeletonLoader />;
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const destinationOptions = categories
    ?.filter((cat) => cat.parentCategory?.slug?.current === 'destination')
    .map((cat) => cat.name || '');
  const hotDetalsOptions = categories
    ?.filter((cat) => cat.parentCategory?.slug?.current === 'hot-deals')
    .map((cat) => cat.name || '');

  const onDestinationChange = (list: string[]) => {
    setDestinationCheckedList(list);
  };

  const onHotDealsChange = (list: string[]) => {
    setHotDealsCheckedList(list);
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Destinations',
      children: (
        <div>
          <CheckboxGroup options={destinationOptions} value={destinationCheckedList} onChange={onDestinationChange} />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Hot Deals',
      children: (
        <div>
          <CheckboxGroup options={hotDetalsOptions} value={hotDealsCheckedList} onChange={onHotDealsChange} />
        </div>
      ),
    },
  ];

  const activeCategories = [...destinationCheckedList, ...hotDealsCheckedList];

  const filteredProducts =
    activeCategories.length === 0
      ? products
      : products.filter((product) => {
          return product.categories?.some((category) => activeCategories.includes(category.name || ''));
        });

  return (
    <div className="lago-tour-search-result">
      <div className="tour-search-header wrapper">
        <div className="result-info">
          <h5>Search results</h5>
          <p>
            <strong>{filteredProducts.length} TOURS</strong> found
          </p>
        </div>
        <div className="result-filter">
          <Select
            defaultValue="discount"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[{ value: 'discount', label: 'Discount' }]}
          />

          <div className="vertical-divider"></div>

          <Select
            defaultValue="popularity"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[{ value: 'popularity', label: 'Popularity' }]}
          />

          <div className="filter-icon-wrapper active">
            <NextImage src="/assets/images/tour/list-top.svg" width={24} height={24} alt="list top" />
          </div>

          <div className="filter-icon-wrapper">
            <NextImage src="/assets/images/tour/grid-fill.svg" width={24} height={24} alt="list top" />
          </div>
        </div>
      </div>

      <div className="tour-search-result wrapper">
        <div className="tour-filter">
          <Search placeholder="Search by tour" allowClear onSearch={onSearch} />

          <div className="price-range">
            <h6>Price range</h6>
            <p>1000 - 10000 SGD</p>
            <Slider range defaultValue={[20, 50]} />
          </div>

          <Collapse
            items={items}
            defaultActiveKey={['1', '2']}
            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 270 : 90} />}
          />
        </div>
        <div className="tour-result-wrapper">
          <div className="tour-result">
            {filteredProducts.map((product, index) => (
              <HotDealsCard key={`tour-search-product-${index}`} {...product} />
            ))}
          </div>
          <div className="tour-pagination">
            <Pagination align="center" defaultCurrent={1} defaultPageSize={6} total={products.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSearchResult;
