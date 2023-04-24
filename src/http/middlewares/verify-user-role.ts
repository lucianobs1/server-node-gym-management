import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    try {
      const { role } = request.user;

      if (role !== roleToVerify) {
        return replay.status(401).send({ message: 'Unauthorized' });
      }
    } catch (err) {
      return replay.status(401).send({ message: 'Unauthorized.' });
    }
  };
}
