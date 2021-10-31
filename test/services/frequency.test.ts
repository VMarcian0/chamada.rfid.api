import assert from 'assert';
import app from '../../src/app';

describe('\'frequency\' service', () => {
  it('registered the service', () => {
    const service = app.service('frequency');

    assert.ok(service, 'Registered the service');
  });
});
