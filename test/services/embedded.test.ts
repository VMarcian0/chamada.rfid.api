import assert from 'assert';
import app from '../../src/app';

describe('\'embedded\' service', () => {
  it('registered the service', () => {
    const service = app.service('embedded');

    assert.ok(service, 'Registered the service');
  });
});
