import { push } from "connected-react-router";

const pushUrl = (url: string) => push(url);

export const goto = {
  push: pushUrl,
};
