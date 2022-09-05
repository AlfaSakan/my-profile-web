const envDev = {
  BASE_URL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
};

const envPro = {
  BASE_URL: process.env.BASE_URL,
};

export const exportEnv =
  process.env.NODE_ENV === 'development' ? envDev : envPro;
