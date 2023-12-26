export const generateCSSElementalClasses = (
  element: string,
  prefix = 'element',
) => {
  return {
    [`${prefix}--water`]: element === 'Water',
    [`${prefix}--fire`]: element === 'Fire',
    [`${prefix}--wood`]: element === 'Wood',
    [`${prefix}--metal`]: element === 'Metal',
    [`${prefix}--earth`]: element === 'Earth',
    [`${prefix}--wind`]: element === 'Wind',
  };
};
