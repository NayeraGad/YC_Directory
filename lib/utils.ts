import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(date: string) {
  return new Date(date).toLocaleString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formateNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return number.toString();
  }
}

export function parseServerResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((str) => str[0])
    .join("")
    .toUpperCase();
}
