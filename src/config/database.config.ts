/* eslint-disable prettier/prettier */
import testConfig from './test.config';
import developmentConfig from './development.config';

const configuration =
  process.env.NODE_ENV === 'test' ? testConfig : developmentConfig;
export default () => configuration;
