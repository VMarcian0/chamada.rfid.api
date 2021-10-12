import assert from 'assert';
import app from '../../src/app';

describe('\'classrooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('classrooms');

    assert.ok(service, 'Registered the service');
  });
});
