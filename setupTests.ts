// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { loadEnvConfig } from '@next/env';
import '@testing-library/jest-dom/extend-expect';
import { TextDecoder, TextEncoder } from 'util';

loadEnvConfig(process.cwd());
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('jest-fetch-mock').enableMocks();
