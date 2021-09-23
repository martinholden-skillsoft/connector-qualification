describe("SABACLOUD", function () {
  const platform = "SABACLOUD";

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
      sass: false,
      othersamlid: false,
      saml: false,
      itemconnector: false,
      xapi: false,
    });
    Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", {});
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("Expect qualification to succeed", function () {
    it("Saba version, SAML Identifier, Item Connector, LRS", function () {
      var testdefinition = {
        description: "Saba version, SAML Identifier, Item Connector, LRS",
        processed: {
          sass: true,
          othersamlid: true,
          saml: true,
          itemconnector: true,
          xapi: true,
        },
        qualified: {
          qualification: "PASSED",
          sass_qualification: "PASSED",
          saml_qualification: "PASSED",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "PASSED",
          xapi_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID35: "Yes",
          QID42: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });

  describe("Expect qualification to fail", function () {
    it("Saba Version not minimum", function () {
      var testdefinition = {
        description: "Saba Version not minimum",
        processed: {
          sass: false,
          othersamlid: false,
          saml: false,
          itemconnector: false,
          xapi: false,
        },
        qualified: {
          qualification: "FAILED",
          sass_qualification: "FAILED",
          saml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
          itemconnector_qualification: "FAILED",
          xapi_qualification: "FAILED",
        },
        qids: {
          QID4: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Saba version, SAML Identifier incorrect", function () {
      var testdefinition = {
        description: "Saba version, SAML Identifier incorrect",
        processed: {
          sass: true,
          othersamlid: false,
          saml: false,
          itemconnector: false,
          xapi: false,
        },
        qualified: {
          qualification: "FAILED",
          sass_qualification: "PASSED",
          saml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
          itemconnector_qualification: "FAILED",
          xapi_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID35: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Saba version, No SAML", function () {
      var testdefinition = {
        description: "Saba version, No SAML",
        processed: {
          sass: true,
          othersamlid: false,
          saml: false,
          itemconnector: false,
          xapi: false,
        },
        qualified: {
          qualification: "FAILED",
          sass_qualification: "PASSED",
          saml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
          itemconnector_qualification: "FAILED",
          xapi_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID35: "I cannot use SAML",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Saba version, SAML Identifier, No Item Connector", function () {
      var testdefinition = {
        description: "Saba version, SAML Identifier, No Item Connector",
        processed: {
          sass: true,
          othersamlid: true,
          saml: true,
          itemconnector: false,
          xapi: false,
        },
        qualified: {
          qualification: "FAILED",
          sass_qualification: "PASSED",
          saml_qualification: "PASSED",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "FAILED",
          xapi_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID35: "Yes",
          QID42: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Saba version, SAML Identifier, Item Connector, No LRS", function () {
      var testdefinition = {
        description: "Saba version, SAML Identifier, Item Connector, No LRS",
        processed: {
          sass: true,
          othersamlid: true,
          saml: true,
          itemconnector: true,
          xapi: false,
        },
        qualified: {
          qualification: "FAILED",
          sass_qualification: "PASSED",
          saml_qualification: "PASSED",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "PASSED",
          xapi_qualification: "FAILED",
        },
        qids: {
          QID4: "Yes",
          QID35: "Yes",
          QID42: "Yes",
          QID43: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
});
