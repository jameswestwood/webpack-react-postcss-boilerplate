module.exports = {
    parser: 'postcss-scss',
    plugins: {
      'postcss-import': {},
      'postcss-mixins': {},
      'postcss-atroot' : {},
      'postcss-nested': {},
      'postcss-cssnext': {},
      'postcss-simple-extend': {},
      'cssnano':{
        'cssnano-util-raw-cache': true,
        'postcss-calc': true,
        'postcss-colormin': true,
        'postcss-convert-values': true,
        'postcss-discard-comments': true,
        'postcss-discard-duplicates': true,
        'postcss-discard-empty': true,
        'postcss-discard-overridden': true,
        'postcss-merge-longhand': true,
        'postcss-merge-rules': true,
        'postcss-minify-font-values': true,
        'postcss-minify-gradients': true,
        'postcss-minify-params': true,
        'postcss-minify-selectors': true,
        'postcss-normalize-charset': true,
        'postcss-normalize-display-values': true,
        'postcss-normalize-positions': true,
        'postcss-normalize-repeat-style': true,
        'postcss-normalize-string': true,
        'postcss-normalize-timing-functions': true,
        'postcss-normalize-unicode': true,
        'postcss-normalize-url': true,
        'postcss-normalize-whitespace': true,
        'postcss-ordered-values': true,
        'postcss-reduce-initial': true,
        'postcss-reduce-transforms': true,
        'postcss-svgo': true,
        'postcss-unique-selectors': true,
        'reduceIdents': false, // prevents issue where css animations are renamed and the wrong one is applied in the minified CSS
        'zindex': false
      }
    }
}
