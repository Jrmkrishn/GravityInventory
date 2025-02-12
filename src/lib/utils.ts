import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ConfigProps {
  preferredGraphType?: "line" | "bar"
  lastView?: "dashboard" | "graph"
}

export const localStorageUtil = {
  set: (key: string, value: ConfigProps) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get: (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}