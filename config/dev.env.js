/* eslint-disable */
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"/api"',
    // NODE_ENV: '"http://localhost:8080"',
    FILE_PRE_SERVER: '"http://192.168.6.166/"'
});
