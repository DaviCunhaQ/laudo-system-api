const colors = require('colors');

const expectedTypes = [
  'feat',
  'fix',
  'test',
  'build',
  'refactor',
  'docs',
  'chore',
  'style',
];

module.exports = {
  plugins: [
    {
      rules: {
        'custom-type-enum': ({ type }) => {
          if (!expectedTypes.includes(type)) {
            return [
              false,
              colors.red(
                `O tipo de commit digitado não é válido. Deve ser um dos seguintes: ${expectedTypes.join(', ')}.\n`,
              ) +
                colors.yellow(
                  `Exemplo de uso: feat: adicionar nova funcionalidade\n`,
                ) +
                colors.green('Outros exemplos de commits\n') +
                colors.green('- fix: corrigir bug\n') +
                colors.green('- test: adicionar ou corrigir testes\n') +
                colors.green('- build: ajustes no processo de build\n') +
                colors.green('- refactor: refatoração de código\n') +
                colors.green('- docs: atualização da documentação\n') +
                colors.green(
                  '- chore: tarefas gerais (não alteram o código)\n',
                ) +
                colors.green(
                  '- style: formatação do código sem alterar a lógica',
                ),
            ];
          }

          const commitFormat = /^[a-z]+:.+/;

          if (!commitFormat.test(`${type}:${type}`)) {
            return [
              false,
              colors.yellow(
                'O tipo de commit deve seguir o formato "tipo: mensagem". Exemplo: feat: adicionar nova funcionalidade.',
              ),
            ];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-type-enum': [2, 'always'],
  },
};
