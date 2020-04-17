const router = require("express").Router();
const db = require("../data/db-helper");

// POST /api/resources
router.post("/resources", (req, res) => {
  const { name, description, project_id } = req.body;
  const newResource = { name, description };
  if (!name) return res.status(400).send("Please provide a resource name");
  db.addResource(newResource, project_id)
    .then(() => res.status(201).send("Resource created"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("There was a problem creating the resource");
    });
});

// GET /api/resources
router.get("/resources", (req, res) => {
  db.getResources().then((data) => res.json(data));
});

// POST /api/projects
router.post("/projects", (req, res) => {
  const { name, description, resource_id, completed } = req.body;
  const newProject = { name, description, completed: !!completed };
  if (!name) return res.status(400).send("Please provide a project name");
  db.addProject(newProject, resource_id)
    .then(() => res.status(201).send("Project created"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("There was a problem creating the project");
    });
});

// GET /api/projects
router.get("/projects", (req, res) => {
  db.getProjects().then((data) => res.json(data));
});

// POST /api/tasks
router.post("/tasks", (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const newTask = {
    project_id,
    description,
    notes,
    completed: !!completed,
  };
  if (!(project_id && description))
    return res.status(400).send("Please provide a description and project_id");
  db.addTask(newTask)
    .then(() => res.status(201).send("Task created"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("There was a problem creating the task");
    });
});

// GET /api/tasks
router.get("/tasks", (req, res) => {
  db.getTasks().then((data) => res.json(data));
});

router.get("/", (req, res) => {
  res.json({ api: "running..." });
});

module.exports = router;
