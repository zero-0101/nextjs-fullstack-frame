import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setStorage(data: any, key: string) {
  if (typeof window === "undefined") {
    return false;
  }
  const _data = typeof data !== "object" ? data : JSON.stringify(data);
  sessionStorage.setItem(key, _data);
  return true;
}

export function getStorage(key: string) {
  if (typeof window === "undefined") {
    return {};
  }
  const _data = sessionStorage.getItem(key) || "";
  let newData;
  try {
    newData = _data ? JSON.parse(_data) : "";
  } catch (error) {
    newData = _data;
  }
  return newData;
}

export function clearStorage(key: string) {
  if (typeof window === "undefined") {
    return false;
  }
  sessionStorage.removeItem(key);
  return true;
}
