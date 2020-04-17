const db = require("./db-config");

module.exports = {
  addResource,
  getResources,
  addProject,
  getProjects,
  addTask,
  getTasks,
};

function addResource(newResource) {
  return db("resources").insert(newResource);
}

function getResources() {
  return db("resources");
}

function addProject() {}
function getProjects() {}

function addTask() {}
function getTasks() {}
