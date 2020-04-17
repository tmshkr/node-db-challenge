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
  return db("resources")
    .insert(newResource)
    .then(([id]) => {
      if (project_id)
        return db("projects-resources").insert({
          project_id,
          resource_id: id,
        });
    });
}

function getResources() {
  return db("resources");
}

function addProject(newProject, resource_id) {
  return db("projects")
    .insert(newProject)
    .then(([id]) => {
      if (resource_id)
        return db("projects-resources").insert({
          project_id: id,
          resource_id,
        });
    });
}

function getProjects() {
  return db("projects");
}

function addTask(newTask) {
  return db("tasks").insert(newTask);
}

function getTasks() {
  return db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .select(
      "t.id",
      "t.description",
      "t.notes",
      "t.completed",
      "p.name as project_name",
      "p.description as project_description"
    );
}
