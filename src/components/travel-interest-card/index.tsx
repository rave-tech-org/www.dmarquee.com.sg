import AspectRatioImage from '@elements/aspect-ratio-image';
import { TravelInterestCardProps } from './type';

const TravelInterestCard = ({ imageUrl, title, desc }: TravelInterestCardProps) => {
  return (
    <div className="lago-travel-interest-card">
      <div className="image-circle-wrapper">
        <AspectRatioImage
          src={imageUrl || '/assets/images/tour/tour-default.webp'}
          alt="Default Tour Image"
          aspectRatio="1/1"
          priority
        />
      </div>
      <div className="content">
        <p>{title}</p>
        <span className="text-ellipsis">{desc}</span>
      </div>
    </div>
  );
};

export default TravelInterestCard;
