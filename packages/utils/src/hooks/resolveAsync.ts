import { AsyncStatus } from ".";

export type AsyncObject<T extends object> = { status: AsyncStatus } & T;

export const resolveAsync = async <T>(
  asyncResponse: () => Promise<T>,
  status: AsyncStatus = "IDLE"
): Promise<T | undefined> => {
  if (status === "IDLE") {
    const resolved = await asyncResponse();
    return resolved;
  }
  return;
};
