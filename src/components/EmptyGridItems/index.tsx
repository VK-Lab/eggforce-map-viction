import imgGameplayImg1 from '@/assets/images/gameplay--img-1.webp';

const EmptyGridItems = () => (
  <div className="empty-slot--wrapper">
    {new Array(9).fill(1).map((_, index) => (
      <div key={`empty-item--${index}`} className="empty-slot--item">
        <img loading="lazy" src={imgGameplayImg1} alt="Sample NFT" />
      </div>
    ))}
  </div>
);

export default EmptyGridItems;
