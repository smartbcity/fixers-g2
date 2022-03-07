export const objToArray = <T>(obj: {
  [key: string]: T;
}): (T & { key: string })[] => {
  const array: (T & { key: string })[] = [];
  for (var key in obj) {
    array.push({ ...obj[key], key: key });
  }
  return array;
};

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const formatNumber = (
  num: number,
  language: string,
  fractionDigits: number = 2,
  isCurrency: boolean = false
) => {
  const fractions = fractionDigits > 0 ? Math.pow(10, fractionDigits) : 1;
  const fixedValue = Math.round(num * fractions) / fractions;
  return new Intl.NumberFormat(language, {
    style: isCurrency ? "currency" : "decimal",
    currency: "USD",
  }).format(fixedValue);
};

export const distinct = <T>(
  array: T[],
  getKey: (item: T) => string | number = JSON.stringify
) => {
  const seen = new Set();

  return array.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const stringToColor = (str: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringToAvatarAttributs = (name: string) => {
  return {
    color: stringToColor(name),
    label: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
