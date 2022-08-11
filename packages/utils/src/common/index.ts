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
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });

export const Base64ToFile = (base64: string, fileName?: string) => {
  var arr = base64.split(","),
    //@ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName ?? "", { type: mime });
};

export const openBase64InNewWindow = (url: string, fileName: string) => {
  var win = window.open("about:blank", "_blank");
  if (win) {
    win.document.write(
      '<iframe id="documentVizualizer" src="' +
        url +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
    win.document.body.style.margin = "0px";
    win.document.title = fileName;
    win.name = fileName;
    const iframe = win.document.querySelector(
      "#documentVizualizer"
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.ownerDocument.title = fileName;
      iframe.contentDocument!.title = fileName;
      iframe.name = fileName;
      iframe.contentWindow!.name = fileName;
    }
  }
};

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
  const splited = name.split(" ");
  return {
    color: stringToColor(name),
    label: `${splited[0][0]}${splited[1] ? splited[1][0] : ""}`,
  };
};
