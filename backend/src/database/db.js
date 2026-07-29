const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const adapter = new JSONFile('src/database/db.json');
const db = new Low(adapter, { users: [] });

async function initDB() {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
}

module.exports = {
  db,
  initDB
};
