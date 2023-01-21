import Fastify from "fastify";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import { empleadoRoute } from "./routes/empleado.routes.js";
import { connectDb } from "./database.js";

connectDb();

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, { origin: "*" });
fastify.register(formBody);

//ROUTES
fastify.register(empleadoRoute, { prefix: "/empleados" });

const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
