var QUALIFICATION = QUALIFICATION || {};

QUALIFICATION.WORKDAY = (function (window, document, Qualtrics, undefined) {
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
    QID4: [
      {
        name: "ccl",
        validresponses: ["Yes"],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
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
        },
      },
      {
        name: "samlidp",
        validresponses: [],
        dependencies: {
            and: [],
            or: [],
        },
        run: function (answer) {
            var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
            var status = false;
            processed[this.name] = status;
            Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
            return status;
        },
      },
      {
        name: "samlid",
        validresponses: [],
        dependencies: {
            and: [],
            or: [],
        },
        run: function (answer) {
            var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
            var status = false;
            processed[this.name] = status;
            Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
            return status;
        },
      },
      {
        name: "saml",
        validresponses: [],
        dependencies: {
            and: [],
            or: [],
        },
        run: function (answer) {
            var processed = Qualtrics.SurveyEngine.getEmbeddedData('processed_state') || {};
            var status = false;
            processed[this.name] = status;
            Qualtrics.SurveyEngine.setEmbeddedData('processed_state', processed);
            return status;
        },
      },
    ],
    QID8: [
      {
        name: "samlidp",
        validresponses: ["Yes"],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
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
        },
      },
      {
        name: "samlid",
        validresponses: [],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var status = false;
          processed[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
          return status;
        },
      },
      {
        name: "saml",
        validresponses: [],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var status = false;
          status = processed.samlidp && processed.samlid;
          processed[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
          return status;
        },
      },
    ],
    QID43: [
      {
        name: "samlid",
        validresponses: ["Yes"],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
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
        },
      },
      {
        name: "saml",
        validresponses: [],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var status = false;
          status = processed.samlidp && processed.samlid;
          processed[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
          return status;
        },
      },
    ],
  };

  var qualificationRules = {
    ALL: [
      {
        name: "qualification",
        run: function () {
          var status = "N/A";
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var qualified =
            Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
          status = processed.ccl && processed.saml ? "PASSED" : "FAILED";
          qualified[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
          Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
          return status;
        },
      },
      {
        name: "ccl_qualification",
        run: function () {
          var status = "N/A";
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var qualified =
            Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
          status = processed.ccl ? "PASSED" : "FAILED";
          qualified[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
          Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
          return status;
        },
      },
      {
        name: "saml_qualification",
        run: function () {
          var status = "N/A";
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var qualified =
            Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
          status = processed.saml ? "PASSED" : "FAILED";
          qualified[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
          Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
          return status;
        },
      },
      {
        name: "samlidp_qualification",
        run: function () {
          var status = "N/A";
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var qualified =
            Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
          status = processed.samlidp ? "PASSED" : "FAILED";
          qualified[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
          Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
          return status;
        },
      },
      {
        name: "samlid_qualification",
        run: function () {
          var status = "N/A";
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var qualified =
            Qualtrics.SurveyEngine.getEmbeddedData("qualified_state") || {};
          status = processed.samlidp
            ? processed.samlid
              ? "PASSED"
              : "FAILED"
            : "N/A";
          qualified[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData(this.name, status);
          Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", qualified);
          return status;
        },
      },
    ],
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
    getValidationRules,
    getQualificationRules,
  };
})(window, document, Qualtrics, undefined);
