export async function up(knex) {
  await knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary()
    table.string("nome").notNullable()
    table.string("email").notNullable().unique()
    table.string("senha").notNullable()
    table.string("cargo").notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable("pacientes", (table) => {
    table.increments("id").primary()
    table.string("nome").notNullable()
    table.date("data_nascimento").notNullable()
    table.date("data_admissao").notNullable()
    table.string("numero_quarto").notNullable()
    table.string("situacao_atual").notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable("funcionarios", (table) => {
    table.increments("id").primary()
    table.string("nome").notNullable()
    table.string("email").notNullable().unique()
    table.string("cargo").notNullable()
    table.string("departamento").notNullable()
    table.timestamps(true, true)
  })

  await knex.schema.createTable("visitantes", (table) => {
    table.increments("id").primary()
    table.string("nome").notNullable()
    table.string("bi").notNullable().unique()
    table.string("motivo_visita").notNullable()
    table
      .integer("paciente_id")
      .unsigned()
      .references("id")
      .inTable("pacientes")
    table.timestamps(true, true)
  })

  await knex.schema.createTable("logs", (table) => {
    table.increments("id").primary()
    table.integer("usuario_id").unsigned().references("id").inTable("usuarios")
    table.string("acao").notNullable()
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("logs")
  await knex.schema.dropTableIfExists("visitantes")
  await knex.schema.dropTableIfExists("funcionarios")
  await knex.schema.dropTableIfExists("pacientes")
  await knex.schema.dropTableIfExists("usuarios")
}
