const db = require('./db');
const helper = require('../helper')
const config = require('../config');

module.exports.getList = async () => {
    const sql = "SELECT * FROM actualite"
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);
    return data;
}

