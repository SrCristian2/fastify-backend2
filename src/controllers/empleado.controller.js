import { response } from "../helpers/response.js";
import { empleadoModel } from "../models/empleado.model.js";

const empleadoCtrl = {};

//listar a todos los empleados
empleadoCtrl.listar = async (req, reply) => {
  try {
    const options = {
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
    };

    const empleados = await empleadoModel.paginate({}, options);
    response(reply, 200, true, empleados, "lista de empleados");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

//listar empleado por id
empleadoCtrl.listById = async (req, reply) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(reply, 404, false, "", "registro no encontrado");
    }
    response(reply, 200, true, empleado, "empleado encontrado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

//guardar empleado
empleadoCtrl.guardar = async (req, reply) => {
  try {
    const { correo } = req.body;
    const empleado = await empleadoModel.findOne({ correo });

    if (empleado) {
      return response(
        reply,
        400,
        false,
        "",
        `el correo ${correo} ya existe en otro registro`
      );
    }

    const newEmpleado = await empleadoModel.create(req.body);
    // const newEmpleado = new empleadoModel({
    //   nombreply,
    //   apellido,
    //   correo,
    //   edad,
    //   salario,
    //   cargo,
    // });

    // await newEmpleado.save()
    response(reply, 201, true, newEmpleado, "empleado creado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

//actualizar empleado

empleadoCtrl.actualizar = async (req, reply) => {
  try {
    const { id } = req.params;
    const { correo } = req.body;
    // await empleadoModel.findByIdAndUpdate({_id:id}, req.body);
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(reply, 404, false, "", "registro no encontrado");
    }

    if (empleado.correo !== correo) {
      const empleadoCorreo = await empleadoModel.findOne({ correo });
      if (empleadoCorreo) {
        return response(
          reply,
          400,
          false,
          "",
          `el correo ${correo} ya existe en otro registro`
        );
      }
    }
    await empleado.updateOne(req.body);
    response(reply, 200, true, "", "registro actualizado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

//eliminar empleado

empleadoCtrl.eliminar = async (req, reply) => {
  try {
    const { id } = req.params;
    const empleado = await empleadoModel.findById(id);
    if (!empleado) {
      return response(reply, 404, false, "", "registro no encontrado");
    }
    await empleado.deleteOne();
    response(reply, 200, true, "", "empleado eliminado");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default empleadoCtrl;
