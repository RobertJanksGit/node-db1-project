db = require("../../data/db-config");

const getAll = async () => {
  const result = await db("accounts");
  return result;
};

const getById = async (id) => {
  const result = await db("accounts").where("id", id).first();
  return result;
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  const result = await getById(id);
  return result;
};

const updateById = async (id, updateData) => {
  const { name, budget } = updateData;
  const oldData = await getById(id);
  if (oldData.name === name && oldData.budget === budget) {
    throw new Error("No changes made to account");
  }
  if (oldData.name !== name) {
    await db("accounts").where("id", id).update({ name: name });
  }
  if (oldData.budget !== budget) {
    await db("accounts").where("id", id).update({ budget: budget });
  }
  const result = await getById(id);
  return result;
};

const deleteById = async (id) => {
  const result = getById(id);
  await db("accounts").where("id", id).delete();
  return result();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
