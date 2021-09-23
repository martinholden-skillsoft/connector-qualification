module.exports = function (grunt) {
  pkg = grunt.file.readJSON("package.json");

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,

    watch: {
      files: ["src/**/*.js"],
      tasks: ["build"],
      options: {
        interrupt: true,
      },
    },

    babel: {
      options: {
        sourceMap: false,
        plugins: [
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-transform-object-assign",
          "@babel/plugin-transform-template-literals",
        ],
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "entry",
              corejs: 3,
              targets: {
                ie: "11",
              },
            },
          ],
        ],
      },
      dist: {
        files: {
          "build/<%= pkg.name %>.js": "build/script.js",
        },
      },
    },

    concat: {
      src: {
        options: {
          banner: "var QUALIFICATION = QUALIFICATION || {};",
          sourceMap: false,
          stripBanners: false,
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*(var QUALIFICATION = QUALIFICATION \|\| {};);?\s*/g, '$1');
          },
        },
        files: {
          "build/script.js": ["src/polyfill/**/*.js","src/*.js"],
        },
      },
      bundle: {
        options: {
          banner:
            '/*! <%= pkg.name %>.bundle.js - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          sourceMap: true,
          stripBanners: false,
        },
        files: {
          "build/<%= pkg.name %>.bundle.js": ["build/<%= pkg.name %>.js"],
        },
      },
    },

    uglify: {
      bundle: {
        options: {
          banner:
            '/*! <%= pkg.name %>.bundle.min.js - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
          mangle: false,
          sourceMap: true,
          stripBanners: true,
        },
        files: {
          "build/<%= pkg.name %>.bundle.min.js": [
            "build/<%= pkg.name %>.bundle.js",
          ],
        },
      },
    },

    clean: {
      stage: ["build/<%= pkg.name %>.js", "build/script.js"],
    },
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks("grunt-contrib-concat");
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks("grunt-contrib-watch");
  // Load the plugin that provides the "babel" task.
  grunt.loadNpmTasks("grunt-babel");
  // Load the that provides the "clean" task;
  grunt.loadNpmTasks("grunt-contrib-clean");

  // Default task(s).
  grunt.registerTask("build", [
    "concat:src",
    "babel",
    "concat:bundle",
    "uglify",
    "clean",
  ]);
  grunt.registerTask("default", ["build"]);
};
