export interface HttpOptions {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: string;
  jwt?: string;
  contentType?: "application/json" | "text/plain" | "none";
  returnType?: "json" | "text";
  formData?: FormData;
  errorHandler?: (error: Error, responseCode?: number) => void;
}

export const request = <T>(options: HttpOptions): Promise<T | undefined> => {
  const {
    method,
    url,
    body,
    contentType = "application/json",
    jwt,
    errorHandler = () => {},
    returnType = "json",
    formData,
  } = options;
  return fetch(url, {
    method: method,
    headers: {
      ...(jwt !== undefined && jwt !== ""
        ? {
            Authorization: `Bearer ${jwt}`,
          }
        : {}),
      ...(contentType !== "none" && !formData
        ? {
            "Content-Type": contentType,
          }
        : {}),
      "Access-Control-Allow-Origin": "*",
    },
    body: formData ?? body,
  })
    .then((response) => {
      if (!response.ok) {
        response.text().then((error) => {
          const localError = new Error(error);
          errorHandler(localError, response.status);
          throw localError;
        });
        return;
      } else {
        if (returnType === "json") {
          return response.json();
        }
        return response.text();
      }
    })
    .catch((error) => {
      errorHandler(error, 600);
      throw error;
    });
};
