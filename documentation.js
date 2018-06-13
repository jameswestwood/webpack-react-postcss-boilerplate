const glob = require("glob");
const streamArray = require('stream-array');
const vfs = require('vinyl-fs');
const documentation = require('documentation');

glob("src/js/**/*.js", {}, function (err, files) {

  documentation.build(files,{
    shallow : true,
    config : 'documentation.yml'

  }).then(documentation.formats.html)
    .then(output => {

      streamArray(output).pipe(vfs.dest('./docs/jsdocs'));
    });
});
