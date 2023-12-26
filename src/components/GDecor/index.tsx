// import imageDecorTop from '@/assets/images/decor--1.svg';
// import imageDecorBottom from '@/assets/images/decor--2.svg';
// import imageDecorTop from '@/assets/images/divider--white-1.png';
// import imageDecorBottom from '@/assets/images/divider--white-2.png';
import imageDecorTop from '@/assets/images/divider--yellow-1.png';
import imageDecorBottom from '@/assets/images/divider--yellow-2.png';

const DecorTop = () => {
  return <img src={imageDecorTop} alt="Decor" className="image--decor top" />;
};

const DecorBottom = () => {
  return (
    <img
      src={imageDecorBottom}
      alt="Decor bottom"
      className="image--decor bottom"
    />
  );
};

const Decor = () => {
  return null;
};
Decor.Top = DecorTop;
Decor.Bottom = DecorBottom;

export default Decor;
