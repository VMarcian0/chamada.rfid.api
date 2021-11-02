import logger from './logger';
import app from './app';
import { createSysadmin } from './hooks/create-sysadmin.hook';

const port = process?.env?.PORT || app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', async () => {
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
    await createSysadmin().catch(err => logger.error(err));
  }
);
