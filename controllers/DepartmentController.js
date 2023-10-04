const {
  successResponse,
  errorResponse,
  validationResponse,
} = require("../helper/response");
const Department = require("../models/department");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  const { name, status } = req.body;

  try {
    const existingDepartment = await Department.findOne({ where: { name } });
    if (existingDepartment) {
      return validationResponse(res, "Department name already exists.", {
        email: "Department name already exists.",
      });
    }
    const newDepartment = await Department.create({
      name,
      status,
    });
    return successResponse(res, "Department created successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department created failed.");
  }
};

exports.update = async (req, res) => {
  const { id } = req.params; // Extracting department ID from URL params
  const { name, status } = req.body;

  try {
    const existingDepartment = await Department.findByPk(id);
    if (!existingDepartment) {
      return errorResponse(res, "Department not found.");
    }

    const departmentWithSameName = await Department.findOne({
      where: {
        name,
        id: { [Op.not]: id },
      },
    });

    if (departmentWithSameName)
      return errorResponse(res, "Department name already exists.");

    existingDepartment.name = name;
    existingDepartment.status = status;
    await existingDepartment.save();

    return successResponse(
      res,
      "Department updated successfully",
      existingDepartment
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department update failed.");
  }
};

exports.list = async (req, res) => {
  try {
    const existingDepartment = await Department.findAll({});
    return successResponse(
      res,
      "Department fetch successfully",
      existingDepartment
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department fetched failed.");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.destroy({
      where: {
        id: id,
      },
    });
    return successResponse(res, "Department deleted successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department deleted failed.");
  }
};

exports.status = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return errorResponse(res, "Department not found.");
    }
    department.status = department.status ? 0 : 1;
    await department.save();
    return successResponse(res, "Department status changed successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department deleted failed.");
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return errorResponse(res, "Department not found.");
    }
    department.status = department.status ? "1" : "0";
    return successResponse(
      res,
      "Department status changed successfully",
      department
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Department deleted failed.");
  }
};
