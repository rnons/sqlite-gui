module.exports = {
  "use": ["postcss-import", "postcss-cssnext"],
  "postcss-import": {
    onImport: function(sources) {
      global.watchCSS(sources);
    }
  }
};
