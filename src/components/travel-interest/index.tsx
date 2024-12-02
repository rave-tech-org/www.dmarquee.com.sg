import { ContentBlockRegistry } from '@/hooks/local/use-content-blocks';
import TravelInterestCard from '@components/travel-interest-card';
import { PortableText } from 'next-sanity';

const TravelInterestGroup = ({ block }: ContentBlockRegistry) => {
  const title = block?.title;
  const listItems = block?.listItems;
  const description = block?.description;

  const cards = listItems?.map(({ title, description, imageUrl }) => ({
    title: title,
    desc: description ? <PortableText value={description} /> : '',
    imageUrl,
  }));
  return (
    <div className="lago-travel-interest-group wrapper">
      {description && <PortableText value={description} />}
      <h3>{title}</h3>
      <div className="interest-cards-wrapper">
        {cards?.map((card, key) => <TravelInterestCard key={`lago-travel-card-${key}`} {...card} />)}
      </div>
    </div>
  );
};

export default TravelInterestGroup;
