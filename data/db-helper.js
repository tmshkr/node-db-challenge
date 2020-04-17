const db = require("./db-config");

module.exports = {
  addResource,
  getResources,
  addProject,
  getProjects,
  addTask,
  getTasks,
};

function addResource(newResource, project_id) {
  return db("resources").insert(newResource);
}

function getResources() {
  return db("resources");
}

function addProject(newProject, resource_id) {
  return db("projects").insert(newProject);
}

function getProjects() {}

function addTask() {}
function getTasks() {}
