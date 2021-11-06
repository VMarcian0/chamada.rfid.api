// Initializes the `embedded` service on path `/embedded`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Embedded } from './embedded.class';
import hooks from './embedded.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'embedded': Embedded & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/embedded', new Embedded(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('embedded');

  service.hooks(hooks);
}
