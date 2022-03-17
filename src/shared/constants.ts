export const resizeImage = (url: string, width = "", height = "") => {
  // return `https://agvmolqooq.cloudimg.io/v7/${url}?width=${width}&height=${height}`;
  if(width) width = Math.round(+width) + "";
  if(height) height = Math.round(+height) + "";
  if(width && height) {
    return `${url}?imageView2/1/format/webp/w/${width}/h/${height}`;
  }
  if (height) {
    return `${url}?imageView2/1/format/webp/w/${Math.round(
      (+height * 380) / 532
    )}/h/${height}`;
  }
  if (width) {
    return `${url}?imageView2/1/format/webp/w/${width}/h/${Math.round(
      (+width * 532) / 380
    )}`;
  }
  return `${url}?imageView2/1/format/webp`;
}

export const subtitleProxy = (url: string) =>
  `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`;

export const IMAGE_CARD_SIZE = {
  0: {
    width: 200,
    height: 100,
  },
  1: {
    width: 175,
    height: 246,
  },
};
