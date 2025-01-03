// src/utils/env.ts

export const getStorageUrl = () => {
  return import.meta.env.VITE_STORAGE_URL || ""
}

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return ""
  if (typeof path !== 'string') return ""
  const storageUrl = getStorageUrl().replace(/\/$/, "")
  const cleanPath = path.replace(/^\//, "")

  return `${storageUrl}/${cleanPath}`
}
