const envDev = {
  BASE_URL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
};

const envTest = {
  BASE_URL: process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL,
};

const envPro = {
  BASE_URL: process.env.BASE_URL,
};

let env;

switch (process.env.NODE_ENV) {
  case 'development':
    env = envDev;
    break;
  case 'production':
    env = envPro;
    break;
  case 'test':
    env = envTest;
    break;
  default:
    env = envDev;
    break;
}

export const exportEnv = env;
