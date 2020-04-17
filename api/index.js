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
// GET /api/projects

// POST /api/tasks
// GET /api/tasks

router.get("/", (req, res) => {
  res.json({ api: "running..." });
});

module.exports = router;
