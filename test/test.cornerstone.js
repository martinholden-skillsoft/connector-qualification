describe('CORNERSTONE', function () {
  const platform = "CORNERSTONE";

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
      edge: false,
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
    it("Edge Marketplace selected and embedded SAML", function () {
      var testdefinition = {
        description: "Edge Marketplace selected and embedded SAML",
        processed: {
          edge: true,
          embeddedsaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          edge_qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
        },
        qids: {
          QID4: "Yes",
          QID8: "Cornerstone Embedded SAML Identity Provider",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Edge Marketplace selected and other SAML, User GUID", function () {
      var testdefinition = {
        description: "Edge Marketplace selected and other SAML, User GUID",
        processed: {
          edge: true,
          embeddedsaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          edge_qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "Other SAML Identity Provider",
          QID35: "User GUID",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Edge Marketplace selected and other SAML, Email", function () {
      var testdefinition = {
        description: "Edge Marketplace selected and other SAML, Email",
        processed: {
          edge: true,
          embeddedsaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          edge_qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "Other SAML Identity Provider",
          QID35: "Email",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Edge Marketplace selected and other SAML, User ID", function () {
      var testdefinition = {
        description: "Edge Marketplace selected and other SAML, User ID",
        processed: {
          edge: true,
          embeddedsaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
        },
        qualified: {
          qualification: "PASSED",
          edge_qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "Other SAML Identity Provider",
          QID35: "User ID",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
  describe("Expect qualification to fail", function () {
    it("Edge Marketplace not selected", function () {
      var testdefinition = {
        description: "Edge Marketplace not selected",
        processed: {
          edge: false,
          embeddedsaml: false,
          othersaml: false,
          othersamlid: false,
          saml: false,
        },
        qualified: {
          qualification: "FAILED",
          edge_qualification: "FAILED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
        },
        qids: {
          QID4: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Edge Marketplace selected, no SAML", function () {
      var testdefinition = {
        description: "Edge Marketplace selected, no SAML",
        processed: {
          edge: true,
          embeddedsaml: false,
          othersaml: false,
          othersamlid: false,
          saml: false,
        },
        qualified: {
          qualification: "FAILED",
          edge_qualification: "PASSED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID8: "I cannot use SAML",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Edge Marketplace selected and other SAML, None of the above for ID", function () {
      var testdefinition = {
        description: "Edge Marketplace selected and other SAML, None of the above for ID",
        processed: {
          edge: true,
          embeddedsaml: false,
          othersaml: true,
          othersamlid: false,
          saml: false,
        },
        qualified: {
          qualification: "FAILED",
          edge_qualification: "PASSED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "N/A",
          othersaml_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
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