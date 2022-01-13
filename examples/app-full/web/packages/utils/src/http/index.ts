export interface HttpOptions {
  url: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: string;
  jwt?: string;
  contentType?: "application/json" | "text/plain" | "none";
  returnType?: "json" | "text";
  errorHandler?: (error: Error, responseCode?: number) => void;
}

export const request = <T>(options: HttpOptions): Promise<Nullable<T>> => {
  const {
    method,
    url,
    body,
    contentType = "application/json",
    jwt,
    errorHandler = () => {},
    returnType = "json",
  } = options;
  return fetch(url, {
    method: method,
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
      "Access-Control-Allow-Origin": "*",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        response
          .text()
          .then((error) => {
            throw new Error(error);
          })
          .catch((error) => errorHandler(error, response.status));
        return;
      } else {
        if (returnType === "json") {
          return response.json();
        }
        return response.text();
      }
    })
    .catch((error) => errorHandler(error, 600));
};
