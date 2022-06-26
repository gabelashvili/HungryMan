/* eslint-disable no-useless-escape */
export const generatePath = (url: string, thumbnail?: boolean) => {
  if (thumbnail) {
    const lastIndex = url.lastIndexOf('.');
    const newUrl = `${url.slice(0, lastIndex)}-thumb${url.slice(lastIndex)}`;
    return `${process.env.REACT_APP_BASE_URL}${newUrl}`;
  }
  return `${process.env.REACT_APP_BASE_URL}${url}`;
};

export const getBase64 = (file:File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const fetchSvgData = async (url: string) => fetch(url).then((res) => res.blob()).then((blob) => new File([blob], 'wall.svg', { type: 'image/svg+xml' }));

export const getCssMatrix = (el:Element) => (getComputedStyle(el)
  .transform.split('matrix(')[1].slice(0, -1).split(','))
  .map((el) => Number(el));

export async function base64ToFile(dataUrl: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], 'result.png', { type: 'image/png' });
}
