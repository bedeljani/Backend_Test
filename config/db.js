const config = require('../knexfile')
const knex = require('knex')(config.development);
console.log('You are connected ...');


module.exports = knex;