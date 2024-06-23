// utils/getLocalePath.ts
export const getLocalePath = (locale: string, path: string): string => {
    if (!path.startsWith(`/${locale}`)) {
      return `/${locale}${path}`;
    }
    return path;
  };
  