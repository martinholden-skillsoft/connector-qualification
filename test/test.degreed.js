describe("DEGREED", function () {
  const platform = "DEGREED";

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
      embeddedsaml: false,
      othersaml: false,
      othersamlid: false,
      saml: false,
    });
    Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", {});
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("Expect qualification to succeed", function () {
    it("Embedded SAML", function () {
      var testdefinition = {
        description: "Embedded SAML",
        processed: {
          embeddedsaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
        },
        qids: {
          QID8: "Degreed SAML Identity Provider",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, User ID", function () {
      var testdefinition = {
        description: "Other SAML, User ID",
        processed: {
          embeddedsaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "User ID",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, Email", function () {
      var testdefinition = {
        description: "Other SAML, Email",
        processed: {
          embeddedsaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "Email",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
  describe("Expect qualification to fail", function () {
    it("No SAML", function () {
      var testdefinition = {
        description: "No SAML",
        processed: {
          embeddedsaml: false,
          othersaml: false,
          othersamlid: false,
          saml: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
        },
        qids: {
          QID8: "I cannot use SAML",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, None of the above for ID", function () {
      var testdefinition = {
        description: "Other SAML, None of the above for ID",
        processed: {
          embeddedsaml: false,
          othersaml: true,
          othersamlid: false,
          saml: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "FAILED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "None of the above",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
});
