const fs = require("fs");

const parserClients = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
  // one line
};

const addClient = (path,data) => {
  fs.writeFileSync(path,JSON.stringify(data));
  // if you dont return anything it is a good thing that this is not in one line
};


module.exports = {parserClients, addClient};
