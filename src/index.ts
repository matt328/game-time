export {};

import Samsung, { KEYS } from 'samsung-tv-control';
import { Logger } from 'tslog';

const config = {
  debug: false, // Default: false
  ip: '192.168.50.44',
  mac: '8CEA4825E370',
  nameApp: 'NodeJS-Test', // Default: NodeJS
  port: 8002, // Default: 8002
  token: '12402750',
};

const log: Logger = new Logger();

const main = async (): Promise<void> => {
  const control = new Samsung(config);

  log.debug('turnOn: ', await control.turnOn());

  log.debug('isAvailable: ', await control.isAvailable());

  // // const token = await control.getTokenPromise();
  // // log.debug({ token });

  // Comment this line out, and it exits correctly.  Uncommented the application just runs forever.
  log.debug('sendKey: ', await control.sendKeyPromise(KEYS.KEY_SOURCE));

  // await control.sendKeyPromise(KEYS.KEY_POWER);

  // control.closeConnection();

  log.debug('hello');

  await Promise.resolve();

  return;
};

main();
