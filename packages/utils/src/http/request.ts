import { t } from "i18next";
export type HttpContentType =
  | "application/json"
  | "text/plain"
  | "application/octet-stream"
  | "application/x-www-form-urlencoded"
  | "none";

export interface HttpOptions {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: BodyInit;
  formData?: FormData;
  jwt?: string;
  contentType?: HttpContentType;
  returnType?: "json" | "text" | "objectUrl";
  errorHandler?: (error: Error, responseCode?: number) => void;
  withAccessControl?: boolean;
  redirect?: RequestRedirect;
}

export const request = <T>(options: HttpOptions): Promise<Nullable<T>> => {
  const {
    method,
    url,
    body,
    formData,
    contentType = "application/json",
    jwt,
    errorHandler = () => {},
    returnType = "json",
    withAccessControl = true,
    redirect,
  } = options;
  return fetch(url, {
    method: method,
    redirect: redirect,
    headers: {
      ...(jwt !== undefined && jwt !== ""
        ? {
            Authorization: `Bearer ${jwt}`,
          }
        : {}),
      ...(contentType !== "none"
        ? {
            "Content-Type": contentType,
          }
        : {}),
      ...(withAccessControl
        ? {
            "Access-Control-Allow-Origin": "*",
          }
        : {}),
    },
    body: formData ?? body,
  })
    .then((response) => {
      if (!response.ok) {
        response
          .text()
          .then((error) => {
            throw new Error(error);
          })
          .catch((error) => {
            errorHandler(error, response.status);
            throw error;
          });
        return;
      } else {
        if (returnType === "json") {
          return response.json();
        }
        if (returnType === "text") {
          return response.text();
        }
        const blob = response.blob().then((myBlob: Blob) => {
          return URL.createObjectURL(myBlob);
        });
        return blob;
      }
    })
    .catch((error) => {
      errorHandler(error, 600);
      throw error;
    });
};

export const errorHandler =
  (key: string) => (_: Error, responseCode?: number) => {
    const c = responseCode;
    const sendAlert = (errorType: string) => {
      const message = geTranslatedMessageOrUndefined("http.errors." + key);
      if (message) {
        console.log(t("http." + errorType, { errorMessage: message }));
        // pushAlert({
        //   message: t("http." + errorType, { errorMessage: message }) as string,
        //   severity: "error",
        // });
      }
    };
    if (c === 401 || c === 403) {
      sendAlert("401");
    } else if (c === 500 || c === 503 || c === 504 || c === 400) {
      sendAlert("500");
    } else if (c === 600) {
      sendAlert("600");
    }
  };

export const successHandler = (key: string) => {
  const message = geTranslatedMessageOrUndefined("http.success." + key);
  if (message) {
    console.log(message);
    // pushAlert({ message: message, severity: "success", persist: false });
  }
};

const geTranslatedMessageOrUndefined = (key: string): string | undefined => {
  const message = t(key);
  if (message === key) {
    return undefined;
  }
  return message;
};
