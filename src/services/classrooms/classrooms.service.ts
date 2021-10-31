// Initializes the `classrooms` service on path `/classrooms`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Classrooms } from './classrooms.class';
import createModel from '../../models/classrooms.model';
import hooks from './classrooms.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'classrooms': Classrooms & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/classrooms', new Classrooms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('classrooms');

  service.hooks(hooks);
}
