exports.up = function (knex) {
  return (
    knex.schema
      // projects
      .createTable("projects", (tbl) => {
        tbl.increments("id");
        tbl.string("name").notNullable();
        tbl.text("description");
        tbl.boolean("completed").notNullable();
      })
      // tasks
      .createTable("tasks", (tbl) => {
        tbl.increments("id");
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("projects.id")
          .onUpdate("RESTRICT")
          .onDelete("RESTRICT");
        tbl.string("description").notNullable();
        tbl.text("notes");
        tbl.boolean("completed").notNullable();
      })
      // resources
      .createTable("resources", (tbl) => {
        tbl.increments("id");
        tbl.string("name").unique().notNullable();
        tbl.text("description");
      })
      // projects-resources junction
      .createTable("projects-resources", (tbl) => {
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("projects.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl
          .integer("resource_id")
          .unsigned()
          .notNullable()
          .references("resources.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl.primary(["project_id", "resource_id"]);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("projects-resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
