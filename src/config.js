const isProduction = process.env.NODE_ENV === 'production' && process.env.VUE_APP_IS_STAGE === 'false';
// eslint-disable-next-line import/prefer-default-export
export const IS_PRODUCTION = isProduction;
