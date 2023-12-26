import ASSETS_URL from '@/constants/assetsURL';

const MeLemLogo = ({ skipText = false }: any) => (
  <div className="logo--melem--wrapper">
    <a
      href="https://melem.io/"
      rel="nofollow noopener noreferrer"
      target="_blank"
      title="Powered By Melem"
      className="logo--melem link"
    >
      {!skipText && <span className="text">Powered By</span>}
      <img className="logo" src={ASSETS_URL.Melem} alt="Powered By Melem" />
    </a>
  </div>
);
export default MeLemLogo;
