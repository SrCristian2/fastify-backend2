import empleadoCtrl from "../controllers/empleado.controller.js";
import { seedDt } from "../seed/seedDb.js";

const empleadoSchema = {
  body: {
    type: "object",
    required: ["nombres", "correo", "edad", "salario", "cargo"],
    properties: {
      nombres: {
        type: "string",
        minLength: 1,
      },
      apellidos: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
      correo: {
        type: "string",
        format: "email",
      },
      edad: {
        type: "number",
        minimum: 1,
        maximum: 100,
      },
      salario: {
        type: "number",
        minimum: 1,
        maximum: 1000000,
      },
      cargo: {
        type: "string",
      },
    },
  },
};

export const empleadoRoute = (fastify, opts, done) => {
  fastify.get("/seed", seedDt);

  fastify.get("/", empleadoCtrl.listar);
  fastify.get("/:id", empleadoCtrl.listById);

  fastify.post(
    "/",
    {
      schema: empleadoSchema,
    },
    empleadoCtrl.guardar
  );
  done();
};
