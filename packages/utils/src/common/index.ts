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
