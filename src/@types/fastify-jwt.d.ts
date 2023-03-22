// fastify-jwt.d.ts
import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { name: string; email: string };
    user: {
      sub: string;
      name: string;
      email: string;
    };
  }
}
