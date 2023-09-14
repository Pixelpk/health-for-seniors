import { config } from '@config';

/**
 * Adds prefix in the following format
 *
 * `{PROJECT NAME}-{CURRENT ENV}-{PASSED STRING}`
 */
export const projectPrefix = (str?: string) => {
  const prefix = `${config.app}-${config.app}`;

  return str ? `${prefix}-${str}` : prefix;
};
