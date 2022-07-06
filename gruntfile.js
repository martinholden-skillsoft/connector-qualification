module.exports = function (grunt) {
  pkg = grunt.file.readJSON("package.json");
  pkg.currentdate = new Date();

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,

    gitlog: {
      src: {
        options: {
          prop: "gitlog.result",
          number: 1,
        },
      },
    },

    watch: {
      files: ["src/**/*.js"],
      tasks: ["build"],
      options: {
        interrupt: true,
      },
    },

    karma: {
      unit: {
        configFile: "karma.conf.js",
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
          banner:
            "var QUALIFICATION = QUALIFICATION || {};\nQUALIFICATION.VERSION = '<%= pkg.version %>';\nQUALIFICATION.DATE = new Date('<%= grunt.template.date(gitlog.result[0].date, 'isoDateTime') %>');\n\n",
          sourceMap: false,
          stripBanners: false,
          process: function (src, filepath) {
            return (
              "// Source: " +
              filepath +
              "\n" +
              src.replace(
                /(^|\n)[ \t]*(var QUALIFICATION = QUALIFICATION \|\| {};);?\s*/g,
                "$1"
              )
            );
          },
        },
        files: {
          "build/script.js": [
            "node_modules/@ungap/global-this/index.js",
            "src/polyfill/**/*.js",
            "src/*.js",
          ],
        },
      },
      bundle: {
        options: {
          banner:
            '/*! <%= pkg.name %>.bundle.js - v<%= pkg.version %> - <%= grunt.template.date(gitlog.result[0].date, "isoDateTime") %> - <%= gitlog.result[0].hash %> */\n',
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
            '/*! <%= pkg.name %>.bundle.min.js - v<%= pkg.version %> - <%= grunt.template.date(gitlog.result[0].date, "isoDateTime") %> - <%= gitlog.result[0].hash %> */',
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
  // Load the plugin that provides the "clean" task;
  grunt.loadNpmTasks("grunt-contrib-clean");
  // Load the plugin that provides the "karma" task;
  grunt.loadNpmTasks("grunt-karma");
  // Load the plugin that provides the "git" task;
  grunt.loadNpmTasks("grunt-git");

  // Default task(s).
  grunt.registerTask("build", [
    "gitlog:src",
    "concat:src",
    "babel",
    "concat:bundle",
    "uglify",
    "clean",
  ]);

  grunt.registerTask("test", [
    "build",
    "karma",
  ]);
  grunt.registerTask("default", ["build"]);
};
