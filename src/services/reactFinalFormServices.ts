import Big from 'big.js';

export const required = (value: any) => (value ? undefined : 'Required');

export const composeValidators =
  (...validators: any[]) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

export const mustBeGreaterThan = (minValue: any) => (value: any) => {
  if (value === undefined) {
    return undefined;
  }
  const fieldValue = Big(value);
  const minValueBig = Big(minValue);

  if (fieldValue.lte(minValueBig)) {
    return `Amount must be greater than ${minValue} SNC`;
  }

  return undefined;
};

export const mustBeSmallerThan = (maxValue: any) => (value: any) => {
  if (value === undefined) {
    return undefined;
  }
  const fieldValue = Big(value);
  const maxValueBig = Big(maxValue);

  if (fieldValue.gt(maxValueBig)) {
    return `Amount must be smaller than ${maxValue} SNC`;
  }

  return undefined;
};
