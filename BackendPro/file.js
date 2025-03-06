const fs = require("fs");
const path = require("path");
function readData(filename) {
    try {
      const data = fs.readFileSync(`${filename}.json`, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return []; // Return an empty array instead of crashing
    }
  }


function writeData(file, data) {
    fs.writeFileSync(`${file}.json`, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
