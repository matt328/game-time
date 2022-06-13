import { Logger } from 'tslog';

import Samsung, { KEYS } from 'samsung-tv-control';

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

exports.handler = async (argv: TvArgs): Promise<any> => {
  const log: Logger = new Logger(!argv.debug ? { minLevel: 'info' } : {});
  const newConfig = { ...config, debug: argv.debug };

  log.debug('Setting up TV Connection with config: ', newConfig);

  const control = new Samsung(newConfig);

  switch (argv.onoff) {
    case 'on':
      await control.turnOn();
      await control.isAvailable();
      // const token = await control.getTokenPromise();
      // log.debug('token: ', token);

      return control.sendKeyPromise(KEYS.KEY_HOME);

    case 'off':
      break;

    default:
      break;
  }
};
