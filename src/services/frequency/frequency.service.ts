// Initializes the `frequency` service on path `/frequency`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Frequency } from './frequency.class';
import createModel from '../../models/frequency.model';
import hooks from './frequency.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'frequency': Frequency & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/frequency', new Frequency(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('frequency');

  service.hooks(hooks);
}
