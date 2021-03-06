require("dotenv").config();

const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  findBy,
  remove,
  updateHouse,
  createHouse,
  getHouseById
};

async function add(house) {
  const [id] = await db("houses").insert(house);
  return findById(id);
}

function createHouse(house) {
  return db("houses").insert(house);
}

function getHouseById(id) {
  return db("houses")
    .where({ user_id: id })
    .select();
}

function find() {
  return db("houses").select();
}

function findBy(filter) {
  return db("houses").where(filter);
}

function findById(id) {
  return db("houses")
    .where({ id })
    .first();
}

function remove(id) {
  return db("houses")
    .where({ id })
    .del();
}

function updateHouse(id, changes) {
  return db("houses")
    .where({ id })
    .returning("*")
    .update(changes, "*");
}
