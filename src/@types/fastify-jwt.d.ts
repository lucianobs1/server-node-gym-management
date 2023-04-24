// fastify-jwt.d.ts
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      name: string;
      email: string;
      role: 'ADMIN' | 'MEMBER';
    };
  }
}
