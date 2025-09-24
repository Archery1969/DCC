module.exports = {
  default: {
    loader: ['ts-node/esm'],
    import: ['features/support/**/*.ts', 'features/step_definitions/**/*.ts'],
    format: [
      'progress-bar', 
      `html:reports/report-${process.env.BROWSER || 'default'}.html`
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    paths: ['features/*.feature'],
  },
};
