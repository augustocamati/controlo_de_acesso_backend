/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('pacientes').del()
  await knex('funcionarios').del()
  await knex('visitantes').del()
  await knex('logs').del()

    await knex("usuarios").insert([
      {
        nome: "admin",
        email: "admin@hospital.com",
        senha: "admin",
        cargo: "Administrador",
      }
    ])

    await knex("pacientes").insert([
      {
        nome: "João Silva",
        data_nascimento: "1980-05-12",
        data_admissao: "2024-02-25",
        numero_quarto: "101",
        situacao_atual: "Internado",
      },
      {
        nome: "Ana Souza",
        data_nascimento: "1992-07-22",
        data_admissao: "2024-02-26",
        numero_quarto: "102",
        situacao_atual: "Em observação",
      },
    ])

    await knex("funcionarios").insert([
      {
        nome: "Maria Santos",
        email: "maria@hospital.com",
        cargo: "Enfermeira",
        departamento: "Emergência",
      },
      {
        nome: "Carlos Mendes",
        email: "carlos@hospital.com",
        cargo: "Segurança",
        departamento: "Vigilância",
      },
    ])

    await knex("visitantes").insert([
      {
        nome: "Carlos Oliveira",
        bi: "123456789",
        motivo_visita: "Visitar parente",
        paciente_id: 1,
      },
      {
        nome: "Fernanda Lima",
        bi: "987654321",
        motivo_visita: "Acompanhante",
        paciente_id: 2,
      },
    ])

    await knex("logs").insert([
      { usuario_id: 1, acao: "entrada" },
      { usuario_id: 2, acao: "saida" },
      { usuario_id: 1, acao: "entrada" },
      { usuario_id: 2, acao: "entrada" },
      { usuario_id: 1, acao: "entrada" },
      { usuario_id: 2, acao: "entrada" },
      { usuario_id: 1, acao: "saida" },
      { usuario_id: 2, acao: "saida" },
      { usuario_id: 1, acao: "saida" },
      { usuario_id: 2, acao: "saida" },
    ])
  
};
