const router = require("express").Router();
const db = require("../data/db-helper");

router.get("/", (req, res) => {
  res.json({ api: "running..." });
});

// POST /api/resources
// GET /api/resources

// POST /api/projects
// GET /api/projects

// POST /api/tasks
// GET /api/tasks

module.exports = router;
