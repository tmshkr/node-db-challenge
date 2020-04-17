exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        { id: 1, name: "first project", completed: false },
        { id: 2, name: "second project", completed: false },
        { id: 3, name: "third project", completed: false },
      ]);
    });
};
