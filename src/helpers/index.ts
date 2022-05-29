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
