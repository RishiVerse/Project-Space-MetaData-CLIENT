const NASA_LARGE_VARIANT = /~large(?=\.jpe?g(?:$|[?#]))/i;

export const getCardImageUrl = (url) => {
  if (typeof url !== 'string') return '';
  return url.replace(NASA_LARGE_VARIANT, '~medium');
};
