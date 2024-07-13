module.exports = {
  $schema: 'http://json.schemastore.org/prettierrc',
  printWidth: 110,
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.json', '*.yml', '*.md'],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ['*.{ts,tsx}'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
