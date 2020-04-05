import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Cauê Kotarski',
        email: 'caue1017@hotmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
