import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify.jwt';
import { authenticateController } from './authenticate-controller';
import { registerController } from './register-controller';
import { profileController } from './profile-controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController);
  app.post('/sessions', authenticateController);

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profileController);
}
