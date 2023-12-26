import configs from '@/constants/settings';

export const isVideo = (rawUrl?: string): boolean => {
  try {
    if (!rawUrl) {
      return false;
    }
    const videos = ['mp4', 'webm', '3gp', 'ogg'];
    const url = new URL(rawUrl);
    const extension = url.pathname.split('.')[1];

    return videos.includes(extension);
  } catch (error: any) {
    return false;
  }
};

export const isGif = (rawUrl?: string): boolean => {
  try {
    if (!rawUrl) {
      return false;
    }

    const url = new URL(rawUrl);
    const extension = url.pathname.split('.')[1];

    return ['gif'].includes(extension);
  } catch (error: any) {
    return false;
  }
};

export const log = (prefix: string, msg?: string | number) => {
  if (configs.DEBUG_ENV) {
    console.log(prefix, msg);
  }
};
