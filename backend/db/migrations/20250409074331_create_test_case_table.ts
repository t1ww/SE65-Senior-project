import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("test_cases", (table) => {
    table.increments("id").primary();
    table
      .integer("question_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");
    table.text("input").notNullable();
    table.text("expected_output").notNullable();
    table.text("description").nullable();
    table.integer("order").defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("test_cases");
}
