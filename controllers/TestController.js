const {
  successResponse,
  errorResponse,
  validationResponse,
} = require("../helper/response");
const Test = require("../models/Test");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  const {
    department,
    name,
    code,
    gender,
    color_code,
    type,
    sample_qty,
    remark,
    report_type,
    sort_name,
    rate,
    mrp,
    auto_consume,
    concent_form,
    billing_category,
    max_discount,
    reporting,
    is_sample_name,
    is_booking,
    is_name_in_report,
    is_name_in_analysis,
    is_auto_store,
    urgent,
    print_seprate,
    is_organism,
    is_culture_report,
    is_mic,
    set_prot_target,
    ht_wt_lmp_group,
  } = req.body;

  try {
    const existingTest = await Test.findOne({ where: { name } });
    if (existingTest) {
      return validationResponse(res, "Test name already exists.", {
        email: "Test name already exists.",
      });
    }
    const newTest = await Test.create({
      department,
      name,
      code,
      gender,
      color_code,
      type,
      sample_qty,
      remark,
      report_type,
      sort_name,
      rate,
      mrp,
      auto_consume,
      concent_form,
      billing_category,
      max_discount,
      reporting,
      is_sample_name,
      is_booking,
      is_name_in_report,
      is_name_in_analysis,
      is_auto_store,
      urgent,
      print_seprate,
      is_organism,
      is_culture_report,
      is_mic,
      set_prot_target,
      ht_wt_lmp_group,
    });
    return successResponse(res, "Test created successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test created failed.");
  }
};

exports.update = async (req, res) => {
  const { id } = req.params; // Extracting Test ID from URL params
  const { name, status } = req.body;

  try {
    const existingTest = await Test.findByPk(id);
    if (!existingTest) {
      return errorResponse(res, "Test not found.");
    }

    const testWithSameName = await Test.findOne({
      where: {
        name,
        id: { [Op.not]: id },
      },
    });

    if (testWithSameName)
      return errorResponse(res, "Test name already exists.");

    existingTest.name = name;
    existingTest.status = status;
    await existingTest.save();

    return successResponse(res, "Test updated successfully", existingTest);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test update failed.");
  }
};

exports.list = async (req, res) => {
  try {
    const existingTest = await Test.findAll({});
    return successResponse(res, "Test fetch successfully", existingTest);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test fetched failed.");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Test.destroy({
      where: {
        id: id,
      },
    });
    return successResponse(res, "Test deleted successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test deleted failed.");
  }
};

exports.status = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findByPk(id);
    if (!test) {
      return errorResponse(res, "Test not found.");
    }
    test.status = test.status ? 0 : 1;
    await test.save();
    return successResponse(res, "Test status changed successfully", []);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test deleted failed.");
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findByPk(id);
    if (!test) {
      return errorResponse(res, "Test not found.");
    }
    test.status = test.status ? "1" : "0";
    return successResponse(res, "Test status changed successfully", test);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Test deleted failed.");
  }
};

exports.autocomplete = async (req, res) => {
  try {
    const { query } = req.query;
    const filteredSuggestions = await Test.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query.toLowerCase()}%`, // Case-insensitive search using LIKE and LOWER() for name column
            },
          },
          {
            sort_name: {
              [Op.like]: `%${query.toLowerCase()}%`, // Case-insensitive search using LIKE and LOWER() for sort_name column
            },
          },
        ],
      },
      limit: 10, // Limit the number of suggestions to 10
    });

    // Extracting suggestion names from filtered Test records
    // const suggestionNames = filteredSuggestions.map((suggestion) => [
    //   suggestion.name,
    //   suggestion.sort_name,
    //   suggestion.id,
    // ]);
    return successResponse(
      res,
      "Test suggestions fetched successfully",
      filteredSuggestions
    );
  } catch (error) {
    console.log("error", error);
    return errorResponse(res, "Something went wrong.");
  }
};
