const db = require("./db-config");

module.exports = {
  addResource,
  getResources,
  addProject,
  updateProject,
  getProjects,
  getProjectByID,
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

function updateProject(projectUpdate) {
  const { id } = projectUpdate;
  return db("projects").update(projectUpdate).where({ id });
}

function getProjects() {
  return db("projects");
}

async function getProjectByID(id) {
  const project = await db("projects").where({ id }).first();
  if (!project) return undefined;
  project.completed = !!project.completed;

  const tasks = await db("tasks as t")
    .join("projects as p", "p.id", "t.project_id")
    .where({ "t.project_id": id })
    .select("t.id", "t.description", "t.notes", "t.completed");
  tasks.forEach((t) => (t.completed = !!t.completed));
  project.tasks = tasks;

  const resources = await db("resources as r")
    .join("projects-resources as pr", "pr.resource_id", "r.id")
    .where({ "pr.project_id": id })
    .select("r.id", "r.name", "r.description");
  project.resources = resources;

  return project;
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
