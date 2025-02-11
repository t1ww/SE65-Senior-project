import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    // Add a role column with an ENUM of "student" or "professor" (defaulting to "student")
    table.enu("role", ["student", "professor"]).defaultTo("student").notNullable();
    table.timestamps(true, true); // adds created_at and updated_at with defaults
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
