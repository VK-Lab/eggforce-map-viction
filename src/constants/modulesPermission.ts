const MODULES_PERMISSION = {
  USE_CLAIM_WHITELIST: Boolean(
    process.env.REACT_APP_USE_CLAIM_WHITELIST === 'true',
  ),
  USE_NEW_ICON_ON_MAP: Boolean(
    process.env.REACT_APP_USE_NEW_ICON_ON_MAP === 'true',
  ),
  USE_NFT_MINTING: Boolean(process.env.REACT_APP_USE_NFT_MINTING === 'true'),
  USE_NFT_INCUBATING: Boolean(
    process.env.REACT_APP_USE_NFT_INCUBATING === 'true',
  ),
  USE_ADHOC_FORM: Boolean(process.env.REACT_APP_USE_ADHOC_FORM === 'true'),
  USE_HAPPY_HOUR: Boolean(process.env.REACT_APP_USE_HAPPY_HOUR === 'true'),
  USE_BNPL: false,
  LIMIT_EGG_PURCHASE:
    Boolean(process.env.REACT_APP_LIMIT_EGG_PURCHASE === 'true') ?? false,
  USE_MOBILE_SUPPORT: Boolean(
    process.env.REACT_APP_USE_MOBILE_SUPPORT === 'true',
  ),
  USE_SNC_REGISTRATION_FORM: Boolean(
    process.env.REACT_APP_USE_SNC_REGISTRATION_FORM === 'true',
  ),
  USE_DRAGON_HATCH_MODULE: Boolean(
    process.env.REACT_APP_USE_DRAGON_HATCH_MODULE === 'true',
  ),
  // USE_ADHOC_FORM: true,
  // USE_HAPPY_HOUR: true,
};

export default MODULES_PERMISSION;
