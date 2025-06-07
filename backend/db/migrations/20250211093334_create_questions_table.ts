import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("questions", (table) => {
    table.increments("id").primary();
    table.string("questionName").notNullable();
    table.text("questionDescription").notNullable();
    table.text("hint").nullable();
    table.text("exampleInput").nullable();
    table.text("exampleOutput").nullable();
    table.text("startingCode").notNullable();
    table.text("correctAnswerCode").notNullable();
    table.string("estimatedRuntime").nullable();
    table.string("timeComplexity").nullable();
    table.timestamps(true, true); // created_at & updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("questions");
}
