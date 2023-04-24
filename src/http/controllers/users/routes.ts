import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify.jwt';
import { authenticateController } from './authenticate-controller';
import { registerController } from './register-controller';
import { profileController } from './profile-controller';
import { refreshController } from './refresh-controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController);
  app.post('/sessions', authenticateController);

  app.patch('/token/refresh', refreshController);

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profileController);
}
