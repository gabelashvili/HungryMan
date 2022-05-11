export const generatePath = (url: string, thumbnail?: boolean) => {
  if (thumbnail) {
    const lastIndex = url.lastIndexOf('.');
    const newUrl = `${url.slice(0, lastIndex)}-thumbnail${url.slice(lastIndex)}`;
    return `${process.env.REACT_APP_BASE_URL}${newUrl}`;
  }
  return `${process.env.REACT_APP_BASE_URL}${url}`;
};
