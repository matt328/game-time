export {};

import yargs from 'yargs';

const main = async () => {
  return yargs
    .scriptName('game-time')
    .usage('$0 <cmd> [args]')
    .option('debug', { alias: 'd', describe: 'Enabled debug output (Extremely Verbose!)', type: 'boolean' })
    .commandDir('cmds')
    .demandCommand()
    .help().argv;
};

const start = () => {
  return main();
};

(async () => {
  await start();
})();
