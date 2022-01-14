describe("WORKDAY", function () {
  const platform = "WORKDAY";

  function runValidationAndQualification(testdefinition) {
    const qualificationRules = QUALIFICATION[platform].getQualificationRules();
    const validationRules = QUALIFICATION[platform].getValidationRules();

    for (const qid in testdefinition.qids) {
      // Run thru the validation tasks
      jQuery.map(validationRules[qid], function (rule, i) {
        return rule.run(testdefinition.qids[qid]);
      });

      // Run thru the ALL qualification tasks
      jQuery.map(qualificationRules["ALL"], function (rule, i) {
        return rule.run();
      });

      // Run thru the QUESTION specific qualification tasks
      jQuery.map(qualificationRules[qid], function (rule, i) {
        return rule.run();
      });
    }

    return {
      processed: Qualtrics.SurveyEngine.getEmbeddedData("processed_state"),
      qualified: Qualtrics.SurveyEngine.getEmbeddedData("qualified_state"),
    };
  }

  before(function () {
    // runs once before the first test in this block
  });

  after(function () {
    // runs once after the last test in this block
  });

  beforeEach(function () {
    // runs before each test in this block
    Qualtrics.SurveyEngine.setEmbeddedData("processed_state", {
      ccl: false,
      samlidp: false,
      samlid: false,
      saml: false,
    });
    Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", {});
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("Expect qualification to succeed", function () {
    it("Cloud Connect for Learning selected, SAML and SAMLID", function () {
      var testdefinition = {
        description: "Cloud Connect for Learning selected and embedded SAML",
        processed: {
          ccl: true,
          samlidp: true,
          samlid: true,
          saml: true,
        },
        qualified: {
          ccl_qualification: "PASSED",
          qualification: "PASSED",
          saml_qualification: "PASSED",
          samlidp_qualification: "PASSED",
          samlid_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
  describe("Expect qualification to fail", function () {
    it("Cloud Connect for Learning not selected", function () {
      var testdefinition = {
        description: "Cloud Connect for Learning not selected",
        processed: {
          ccl: false,
          samlidp: false,
          samlid: false,
          saml: false,
        },
        qualified: {
          ccl_qualification: "FAILED",
          qualification: "FAILED",
          saml_qualification: "FAILED",
          samlid_qualification: "N/A",
          samlidp_qualification: "FAILED",
        },
        qids: {
          QID4: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Cloud Connect for Learning selected, SAML IDP not available", function () {
      var testdefinition = {
        description:
          "Cloud Connect for Learning selected, SAML IDP not available",
        processed: {
          ccl: true,
          samlidp: false,
          samlid: false,
          saml: false,
        },
        qualified: {
          ccl_qualification: "PASSED",
          qualification: "FAILED",
          saml_qualification: "FAILED",
          samlid_qualification: "N/A",
          samlidp_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID8: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Cloud Connect for Learning selected, SAML IDP not available, SAML ID not available", function () {
      var testdefinition = {
        description:
          "Cloud Connect for Learning selected, SAML IDP available, SAML ID not available",
        processed: {
          ccl: true,
          samlidp: true,
          samlid: false,
          saml: false,
        },
        qualified: {
          ccl_qualification: "PASSED",
          qualification: "FAILED",
          saml_qualification: "FAILED",
          samlid_qualification: "FAILED",
          samlidp_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "Yes",
          QID43: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
});
