export const hasDigits = (value: string) => {
  return (
    value.split('').filter(item => isNaN(+item / 1) === false).length !== 0
  );
};

export const hasUppercase = (value: string) => {
  return (
    value
      .split('')
      .filter(item => isNaN(+item / 1) === true && item === item.toUpperCase())
      .length !== 0
  );
};

export const hasLowercase = (value: string) => {
  return (
    value
      .split('')
      .filter(item => isNaN(+item / 1) === true && item === item.toLowerCase())
      .length !== 0
  );
};

export const hasSpecialChar = (value: string) => {
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return specialChars.test(value);
};

export const defineStrength = (value: string): string => {
  let strength = 0;

  if (hasDigits(value)) strength += 1;
  if (hasLowercase(value)) strength += 1;
  if (hasUppercase(value)) strength += 1;
  if (hasSpecialChar(value)) strength += 1;

  switch (strength) {
    case 1:
      return 'poor';
    case 2:
      return 'weak';
    case 3:
      return 'medium';
    case 4:
      return 'strong';
    default:
      return '';
  }
};
