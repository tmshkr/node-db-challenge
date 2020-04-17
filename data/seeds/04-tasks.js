exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        { id: 1, project_id: 1, description: "first task", completed: false },
        { id: 2, project_id: 1, description: "second task", completed: false },
        { id: 3, project_id: 1, description: "third task", completed: false },
      ]);
    });
};
