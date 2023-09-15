import { t } from "i18next";
import { getTranslatedMessageOrUndefined } from "../common";
import { enqueueSnackbar } from "notistack";
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
  errorHandler?: (
    error: Error,
    responseCode?: number,
    backendError?: BackendError
  ) => void;
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
        const contentType = response.headers.get("content-type");
        if (contentType === "application/json") {
          response.json().then((backendError: BackendError) => {
            errorHandler(
              new Error("backend error"),
              response.status,
              backendError
            );
          });
        } else {
          response
            .text()
            .then((error) => {
              throw new Error(error);
            })
            .catch((error) => {
              errorHandler(error, response.status);
              throw error;
            });
        }

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

export interface BackendError {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  message: string;
  requestId: string;
  code: number;
}

export const errorHandler =
  (key: string) =>
  (_: Error, responseCode?: number, backendError?: BackendError) => {
    const res = backendErrorHandler(backendError);
    if (res) return;
    const c = responseCode;
    const sendAlert = (errorType: string) => {
      const message = getTranslatedMessageOrUndefined("http.errors." + key);
      if (message) {
        //@ts-ignore
        enqueueSnackbar(t("http." + errorType, { errorMessage: message }), {
          variant: "G2Alert",
          severity: "error",
        });
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

export const backendErrorHandler = (
  backendError?: BackendError
): string | undefined => {
  if (!backendError) return;
  const message = getTranslatedMessageOrUndefined(
    "http.backendErrors." + backendError.code
  );
  if (message) {
    //@ts-ignore
    enqueueSnackbar(message, { variant: "G2Alert", severity: "error" });
  }
  return message;
};

export const successHandler = (key: string) => {
  const message = getTranslatedMessageOrUndefined("http.success." + key);
  if (message) {
    //@ts-ignore
    enqueueSnackbar(message, {
      variant: "G2Alert",
      severity: "success",
      persist: false,
    });
  }
};
