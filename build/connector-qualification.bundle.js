/*! connector-qualification.bundle.js - v1.1.4 - 2022-07-06T10:47:08+0100 - e2723c1febd372d8858c647d60b724cc20eeec99 */
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var QUALIFICATION = QUALIFICATION || {};
QUALIFICATION.VERSION = '1.1.4';
QUALIFICATION.DATE = new Date('2022-07-06T10:47:08+0100'); // Source: node_modules/@ungap/global-this/index.js

(function (Object) {
  (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) !== 'object' && (this ? get() : (Object.defineProperty(Object.prototype, '_T_', {
    configurable: true,
    get: get
  }), _T_));

  function get() {
    var global = this || self;
    global.globalThis = global;
    delete Object.prototype._T_;
  }
})(Object); // Source: src/polyfill/qualtrics.js
// Polyfill Qualtrics to allow testing


if (typeof globalThis.Qualtrics == "undefined" || typeof globalThis.Qualtrics.SurveyEngine == "undefined") {
  (function () {
    globalThis.Qualtrics = {};
    globalThis.Qualtrics.SurveyEngine = {};

    globalThis.Qualtrics.SurveyEngine.getEmbeddedData = function (key) {
      var keyEQ = key + "=";
      var ca = document.cookie.split(";");

      for (var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i];

        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(keyEQ) === 0) return JSON.parse(c.substring(keyEQ.length, c.length));
      }

      return null;
    };

    globalThis.Qualtrics.SurveyEngine.setEmbeddedData = function (key, value) {
      document.cookie = key + "=" + JSON.stringify(value) + "; path=/";
    };
  })();
} // Source: src/cornerstone.js


QUALIFICATION.CORNERSTONE = function (window, document, Qualtrics, undefined) {
  /**
   * @typedef {Object} QUALIFICATION.validationrule.dependencies
   * @property {String[]} and An array of property names of an object to check (AND comparison)
   * @property {String[]} or An array of property names of an object to check (OR comparison)
   */

  /**
   * The function called to validate the result, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.validationrule.run
   * @function
   * @param {String} answer The Qualtrics selectedChoice value, the text string
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrule
   * @property {String} name The name of the validation rule
   * @property {String[]} validresponses An array of strings that answer is compared to determine if valid
   * @property {QUALIFICATION.validationrule.dependencies} dependencies The other values that must be true
   * @property {QUALIFICATION.validationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrules
   * @type {Object.<string, QUALIFICATION.validationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics
   * @property {QUALIFICATION.validationrule[]} rules An array of validation rules
   */

  /**
   * The function called to qualify the captured data, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.qualificationrule.run
   * @function
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrule
   * @property {String} name The name of the validation rule
   * @property {QUALIFICATION.qualificationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrules
   * @type {Object.<string, QUALIFICATION.qualificationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics or ALL to process on all
   * @property {QUALIFICATION.qualificationrule[]} rules An array of validation rules
   */
  var validationRules = {
    QID4: [{
      name: "edge",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID8: [{
      name: "embeddedsaml",
      validresponses: ["Cornerstone Embedded SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersaml",
      validresponses: ["Other SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID35: [{
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = answer.toLowerCase() !== "none of the above" && answer !== "";
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }]
  };
  var qualificationRules = {
    ALL: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.edge && processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "edge_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.edge ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "embeddedsaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.embeddedsaml ? "PASSED" : processed.othersaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.othersaml && processed.othersamlid ? "PASSED" : processed.embeddedsaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }]
  };
  /**
   * Get the validation rules
   *
   * @returns {QUALIFICATION.validationrules} rules The validation rules object
   *
   */

  function getValidationRules() {
    return validationRules;
  }
  /**
   * Get the qualification rules
   *
   * @returns {QUALIFICATION.qualificationrules} rules The qualification rules object
   *
   */


  function getQualificationRules() {
    return qualificationRules;
  }

  return {
    getValidationRules: getValidationRules,
    getQualificationRules: getQualificationRules
  };
}(window, document, Qualtrics, undefined); // Source: src/degreed.js


QUALIFICATION.DEGREED = function (window, document, Qualtrics, undefined) {
  /**
   * @typedef {Object} QUALIFICATION.validationrule.dependencies
   * @property {String[]} and An array of property names of an object to check (AND comparison)
   * @property {String[]} or An array of property names of an object to check (OR comparison)
   */

  /**
   * The function called to validate the result, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.validationrule.run
   * @function
   * @param {String} answer The Qualtrics selectedChoice value, the text string
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrule
   * @property {String} name The name of the validation rule
   * @property {String[]} validresponses An array of strings that answer is compared to determine if valid
   * @property {QUALIFICATION.validationrule.dependencies} dependencies The other values that must be true
   * @property {QUALIFICATION.validationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrules
   * @type {Object.<string, QUALIFICATION.validationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics
   * @property {QUALIFICATION.validationrule[]} rules An array of validation rules
   */

  /**
   * The function called to qualify the captured data, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.qualificationrule.run
   * @function
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrule
   * @property {String} name The name of the validation rule
   * @property {QUALIFICATION.qualificationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrules
   * @type {Object.<string, QUALIFICATION.qualificationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics or ALL to process on all
   * @property {QUALIFICATION.qualificationrule[]} rules An array of validation rules
   */
  var validationRules = {
    QID8: [{
      name: "embeddedsaml",
      validresponses: ["Degreed SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersaml",
      validresponses: ["Other SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID35: [{
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = answer.toLowerCase() !== "none of the above" && answer !== "";
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }]
  };
  var qualificationRules = {
    ALL: [],
    QID8: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "embeddedsaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.embeddedsaml ? "PASSED" : processed.othersaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.othersaml && processed.othersamlid ? "PASSED" : processed.embeddedsaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }],
    QID35: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "embeddedsaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.embeddedsaml ? "PASSED" : processed.othersaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.othersaml && processed.othersamlid ? "PASSED" : processed.embeddedsaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }]
  };
  /**
   * Get the validation rules
   *
   * @returns {QUALIFICATION.validationrules} rules The validation rules object
   *
   */

  function getValidationRules() {
    return validationRules;
  }
  /**
   * Get the qualification rules
   *
   * @returns {QUALIFICATION.qualificationrules} rules The qualification rules object
   *
   */


  function getQualificationRules() {
    return qualificationRules;
  }

  return {
    getValidationRules: getValidationRules,
    getQualificationRules: getQualificationRules
  };
}(window, document, Qualtrics, undefined); // Source: src/sabacloud.js


QUALIFICATION.SABACLOUD = function (window, document, Qualtrics, undefined) {
  /**
   * @typedef {Object} QUALIFICATION.validationrule.dependencies
   * @property {String[]} and An array of property names of an object to check (AND comparison)
   * @property {String[]} or An array of property names of an object to check (OR comparison)
   */

  /**
   * The function called to validate the result, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.validationrule.run
   * @function
   * @param {String} answer The Qualtrics selectedChoice value, the text string
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrule
   * @property {String} name The name of the validation rule
   * @property {String[]} validresponses An array of strings that answer is compared to determine if valid
   * @property {QUALIFICATION.validationrule.dependencies} dependencies The other values that must be true
   * @property {QUALIFICATION.validationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrules
   * @type {Object.<string, QUALIFICATION.validationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics
   * @property {QUALIFICATION.validationrule[]} rules An array of validation rules
   */

  /**
   * The function called to qualify the captured data, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.qualificationrule.run
   * @function
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrule
   * @property {String} name The name of the validation rule
   * @property {QUALIFICATION.qualificationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrules
   * @type {Object.<string, QUALIFICATION.qualificationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics or ALL to process on all
   * @property {QUALIFICATION.qualificationrule[]} rules An array of validation rules
   */
  var validationRules = {
    QID4: [{
      name: "sass",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID35: [{
      name: "othersamlid",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID42: [{
      name: "itemconnector",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID43: [{
      name: "xapi",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }]
  };
  var qualificationRules = {
    ALL: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.sass && processed.saml && processed.itemconnector && processed.xapi ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "sass_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.sass ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.othersamlid ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "itemconnector_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.itemconnector ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "xapi_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.xapi ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }]
  };
  /**
   * Get the validation rules
   *
   * @returns {QUALIFICATION.validationrules} rules The validation rules object
   *
   */

  function getValidationRules() {
    return validationRules;
  }
  /**
   * Get the qualification rules
   *
   * @returns {QUALIFICATION.qualificationrules} rules The qualification rules object
   *
   */


  function getQualificationRules() {
    return qualificationRules;
  }

  return {
    getValidationRules: getValidationRules,
    getQualificationRules: getQualificationRules
  };
}(window, document, Qualtrics, undefined); // Source: src/successfactors.js


QUALIFICATION.SUCCESSFACTORS = function (window, document, Qualtrics, undefined) {
  /**
   * @typedef {Object} QUALIFICATION.validationrule.dependencies
   * @property {String[]} and An array of property names of an object to check (AND comparison)
   * @property {String[]} or An array of property names of an object to check (OR comparison)
   */

  /**
   * The function called to validate the result, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.validationrule.run
   * @function
   * @param {String} answer The Qualtrics selectedChoice value, the text string
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrule
   * @property {String} name The name of the validation rule
   * @property {String[]} validresponses An array of strings that answer is compared to determine if valid
   * @property {QUALIFICATION.validationrule.dependencies} dependencies The other values that must be true
   * @property {QUALIFICATION.validationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrules
   * @type {Object.<string, QUALIFICATION.validationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics
   * @property {QUALIFICATION.validationrule[]} rules An array of validation rules
   */

  /**
   * The function called to qualify the captured data, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.qualificationrule.run
   * @function
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrule
   * @property {String} name The name of the validation rule
   * @property {QUALIFICATION.qualificationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrules
   * @type {Object.<string, QUALIFICATION.qualificationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics or ALL to process on all
   * @property {QUALIFICATION.qualificationrule[]} rules An array of validation rules
   */
  var validationRules = {
    QID4: [{
      name: "sass",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID8: [{
      name: "embeddedsaml",
      validresponses: ["SuccessFactors SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "iassaml",
      validresponses: ["SAP Cloud Identity Services - Identity Authentication (IAS)"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersaml",
      validresponses: ["Other SAML Identity Provider"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.iassaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID35: [{
      name: "othersamlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = answer.toLowerCase() !== "no" && answer !== "";
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.embeddedsaml || processed.iassaml || processed.othersaml && processed.othersamlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID42: [{
      name: "itemconnector",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID43: [{
      name: "odataapi",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "learninghistoryconnector",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID49: [{
      name: "learninghistoryconnector",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "odataapi",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }]
  };
  var qualificationRules = {
    ALL: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.sass && processed.saml && processed.itemconnector && (processed.odataapi || processed.learninghistoryconnector) ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "sass_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.sass ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "embeddedsaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.embeddedsaml ? "PASSED" : processed.othersaml ? "N/A" : processed.iassaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "iassaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.iassaml ? "PASSED" : processed.othersaml ? "N/A" : processed.enbeddedsaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.othersaml && processed.othersamlid ? "PASSED" : processed.embeddedsaml ? "N/A" : processed.iassaml ? "N/A" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "itemconnector_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.itemconnector ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "odataapi_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.odataapi ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "learninghistoryconnector_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.learninghistoryconnector ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }],
    QID35: [{
      name: "iassaml_qualification",
      run: function run() {
        var status = "N/A";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "embeddedsaml_qualification",
      run: function run() {
        var status = "N/A";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }],
    QID40: [{
      name: "iassaml_qualification",
      run: function run() {
        var status = "N/A";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "othersaml_qualification",
      run: function run() {
        var status = "N/A";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }],
    QID43: [{
      name: "learninghistoryconnector_qualification",
      run: function run() {
        var status = "N/A";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }],
    QID49: [{
      name: "odataapi_qualification",
      run: function run() {
        var status = "FAILED";
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }]
  };
  /**
   * Get the validation rules
   *
   * @returns {QUALIFICATION.validationrules} rules The validation rules object
   *
   */

  function getValidationRules() {
    return validationRules;
  }
  /**
   * Get the qualification rules
   *
   * @returns {QUALIFICATION.qualificationrules} rules The qualification rules object
   *
   */


  function getQualificationRules() {
    return qualificationRules;
  }

  return {
    getValidationRules: getValidationRules,
    getQualificationRules: getQualificationRules
  };
}(window, document, Qualtrics, undefined); // Source: src/workday.js


QUALIFICATION.WORKDAY = function (window, document, Qualtrics, undefined) {
  /**
   * @typedef {Object} QUALIFICATION.validationrule.dependencies
   * @property {String[]} and An array of property names of an object to check (AND comparison)
   * @property {String[]} or An array of property names of an object to check (OR comparison)
   */

  /**
   * The function called to validate the result, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.validationrule.run
   * @function
   * @param {String} answer The Qualtrics selectedChoice value, the text string
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrule
   * @property {String} name The name of the validation rule
   * @property {String[]} validresponses An array of strings that answer is compared to determine if valid
   * @property {QUALIFICATION.validationrule.dependencies} dependencies The other values that must be true
   * @property {QUALIFICATION.validationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.validationrules
   * @type {Object.<string, QUALIFICATION.validationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics
   * @property {QUALIFICATION.validationrule[]} rules An array of validation rules
   */

  /**
   * The function called to qualify the captured data, this should set Qualtrics embedded data
   * and return true/false
   * @name QUALIFICATION.qualificationrule.run
   * @function
   * @returns {boolean}
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrule
   * @property {String} name The name of the validation rule
   * @property {QUALIFICATION.qualificationrule.run} run The function called to validate the result, this
   *                                                  should set Qualtrics embedded data and return
   *                                                  true/false
   */

  /**
   * @typedef {Object} QUALIFICATION.qualificationrules
   * @type {Object.<string, QUALIFICATION.qualificationrule[]>}
   * @property {String} questionid The questionid (QID) for Qualtrics or ALL to process on all
   * @property {QUALIFICATION.qualificationrule[]} rules An array of validation rules
   */
  var validationRules = {
    QID4: [{
      name: "ccl",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "email",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }, {
      name: "samlidp",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }, {
      name: "samlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }],
    QID44: [{
      name: "email",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "samlidp",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }, {
      name: "samlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
        return status;
      }
    }],
    QID8: [{
      name: "samlidp",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "samlid",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.samlidp && processed.samlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }],
    QID43: [{
      name: "samlid",
      validresponses: ["Yes"],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        var answerstatus = false;

        if (this.validresponses.length != 0) {
          jQuery.each(this.validresponses, function (index, value) {
            answerstatus = value.toLowerCase() === answer.toLowerCase();
            return !status;
          });
        } else {
          answerstatus = true;
        }

        var andstatus = true;
        jQuery.each(this.dependencies.and, function (index, value) {
          andstatus = andstatus && processed[value];
        });
        var orstatus = true;
        jQuery.each(this.dependencies.or, function (index, value) {
          orstatus = orstatus || processed[value];
        });
        status = answerstatus && andstatus && orstatus;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }, {
      name: "saml",
      validresponses: [],
      dependencies: {
        and: [],
        or: []
      },
      run: function run(answer) {
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var status = false;
        status = processed.samlidp && processed.samlid;
        processed[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
        return status;
      }
    }]
  };
  var qualificationRules = {
    ALL: [{
      name: "qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.ccl && processed.email && processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "ccl_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.ccl ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "email_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.email ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "saml_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.saml ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "samlidp_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.samlidp ? "PASSED" : "FAILED";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }, {
      name: "samlid_qualification",
      run: function run() {
        var status = "N/A";
        var processed = Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
        var qualified = Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
        status = processed.samlidp ? processed.samlid ? "PASSED" : "FAILED" : "N/A";
        qualified[this.name] = status;
        Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
        Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
        return status;
      }
    }]
  };
  /**
   * Get the validation rules
   *
   * @returns {QUALIFICATION.validationrules} rules The validation rules object
   *
   */

  function getValidationRules() {
    return validationRules;
  }
  /**
   * Get the qualification rules
   *
   * @returns {QUALIFICATION.qualificationrules} rules The qualification rules object
   *
   */


  function getQualificationRules() {
    return qualificationRules;
  }

  return {
    getValidationRules: getValidationRules,
    getQualificationRules: getQualificationRules
  };
}(window, document, Qualtrics, undefined);

//# sourceMappingURL=connector-qualification.bundle.js.map