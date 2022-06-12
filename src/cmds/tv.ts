import { Logger } from 'tslog';

import Samsung from 'samsung-tv-control';

const config = {
  debug: false, // Default: false
  ip: '192.168.50.44',
  mac: '8CEA4825E370',
  nameApp: 'NodeJS-Test', // Default: NodeJS
  port: 8002, // Default: 8002
  token: '12345678',
};

exports.command = 'tv [on off]';
exports.desc = 'Control the TV';

type TvArgs = { onoff: 'on' | 'off'; debug: boolean };

exports.handler = async (argv: TvArgs): Promise<void> => {
  const log: Logger = new Logger(!argv.debug ? { minLevel: 'info' } : {});
  const newConfig = { ...config, debug: argv.debug };

  log.debug('Setting up TV Connection with config: ', newConfig);

  const control = new Samsung(newConfig);

  switch (argv.onoff) {
    case 'on':
      try {
        const turnedOn = await control.turnOn();
        log.info('Connection created');
        if (turnedOn) {
          try {
            if (await control.isAvailable()) {
              log.info('TV Connection available and ready to send commands');
              return;
            } else {
              log.warn('Timed out negotiating TV Connection');
            }
          } catch (e) {
            log.error('Timed out waiting for TV Connection to become available', e);
            return;
          }
        } else {
          log.warn('Failed to initialize TV Connection');
          return;
        }
      } catch (e) {
        log.error('Failed to create TV Connection', e);
      } finally {
        control.closeConnection();
      }

      break;

    case 'off':
      break;

    default:
      break;
  }
};
