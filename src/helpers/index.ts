/* eslint-disable no-useless-escape */
export const generatePath = (url: string, thumbnail?: boolean) => {
  if (thumbnail) {
    const lastIndex = url.lastIndexOf('.');
    const newUrl = `${url.slice(0, lastIndex)}-thumb${url.slice(lastIndex)}`;
    return `${process.env.REACT_APP_BASE_URL}${newUrl}`;
  }
  return `${process.env.REACT_APP_BASE_URL}${url}`;
};

export const getBase64 = (file: File, callback: (val: string | ArrayBuffer) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    reader.result && callback(reader.result);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
};

export const getBase64Test = (file:File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const fetchSvgData = async (url: string) => fetch(url).then((res) => res.blob()).then((blob) => new File([blob], 'wall.svg', { type: 'image/svg+xml' }));

export const generateFile = async (el:Node) => {
  // get svg source.
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(el);
  // add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  // add xml declaration
  source = `<?xml version="1.0" standalone="no"?>\r\n${source}`;
  // convert svg source to URI data scheme.
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
  const res = fetchSvgData(url);
  return res;
  // generate file
};

export const getCssMatrix = (el:Element) => (getComputedStyle(el)
  .transform.split('matrix(')[1].slice(0, -1).split(','))
  .map((el) => Number(el));
