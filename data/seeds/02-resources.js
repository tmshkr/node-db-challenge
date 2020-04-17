exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("resources").insert([
        { id: 1, name: "first resource" },
        { id: 2, name: "second resource" },
        { id: 3, name: "third resource" },
      ]);
    });
};
