describe("SUCCESSFACTORS", function () {
  const platform = "SUCCESSFACTORS";

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
      iassaml: false,
      othersaml: false,
      othersamlid: false,
      saml: false,
      itemconnector: false,
      odataapi: false,
      learninghistoryconnector: false,
    });
    Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", {});
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("Expect qualification to succeed", function () {
    it("IAS SAML, Item Connector, ODATA", function () {
      var testdefinition = {
        description: "IAS SAML, Item Connector, ODATA",
        processed: {
          embeddedsaml: false,
          iassaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: true,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "PASSED",
          learninghistoryconnector_qualification: "N/A",
        },
        qids: {
          QID8: "SAP Cloud Identity Services - Identity Authentication (IAS)",
          QID42: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("IAS SAML, Item Connector, Learning History", function () {
      var testdefinition = {
        description: "IAS SAML, Item Connector, Learning History",
        processed: {
          embeddedsaml: false,
          iassaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "PASSED",
        },
        qids: {
          QID4: "Yes",
          QID8: "SAP Cloud Identity Services - Identity Authentication (IAS)",
          QID42: "Yes",
          QID43: "No",
          QID49: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Embedded SAML, Item Connector, ODATA", function () {
      var testdefinition = {
        description: "Embedded SAML, Item Connector, ODATA",
        processed: {
          embeddedsaml: true,
          iassaml: false,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: true,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "PASSED",
          iassaml_qualification: "FAILED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "PASSED",
          learninghistoryconnector_qualification: "N/A",
        },
        qids: {
          QID8: "SuccessFactors SAML Identity Provider",
          QID42: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Embedded SAML, Item Connector, Learning History", function () {
      var testdefinition = {
        description: " Embedded SAML, Item Connector, Learning History",
        processed: {
          embeddedsaml: true,
          iassaml: false,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "PASSED",
          iassaml_qualification: "FAILED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "PASSED",
        },
        qids: {
          QID8: "SuccessFactors SAML Identity Provider",
          QID42: "Yes",
          QID43: "No",
          QID49: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, Student ID, Item Connector, ODATA", function () {
      var testdefinition = {
        description: "Other SAML, Student ID, Item Connector, ODATA",
        processed: {
          embeddedsaml: false,
          iassaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
          itemconnector: true,
          odataapi: true,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "PASSED",
          learninghistoryconnector_qualification: "N/A",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "Yes",
          QID42: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, Student ID, Item Connector, Learning History", function () {
      var testdefinition = {
        description:
          "SOther SAML, Student ID, Item Connector, Learning History",
        processed: {
          embeddedsaml: false,
          iassaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "PASSED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "Yes",
          QID42: "Yes",
          QID43: "No",
          QID49: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Embedded SAML, Item Connector, Learning History", function () {
      var testdefinition = {
        description: "Embedded SAML, Item Connector, Learning History",
        processed: {
          embeddedsaml: true,
          iassaml: false,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: true,
        },
        qualified: {
          qualification: "PASSED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "PASSED",
          iassaml_qualification: "FAILED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "PASSED",
        },
        qids: {
          QID8: "SuccessFactors SAML Identity Provider",
          QID42: "Yes",
          QID43: "No",
          QID49: "Yes",
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
          iassaml: false,
          othersaml: false,
          othersamlid: false,
          saml: false,
          itemconnector: false,
          odataapi: false,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "FAILED",
          embeddedsaml_qualification: "FAILED",
          iassaml_qualification: "FAILED",
          othersaml_qualification: "FAILED",
          itemconnector_qualification: "FAILED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "FAILED",
        },
        qids: {
          QID8: "I cannot use SAML",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("IAS SAML, No Item Connector", function () {
      var testdefinition = {
        description: "IAS SAML, No Item Connector",
        processed: {
          embeddedsaml: false,
          iassaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: false,
          odataapi: false,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "FAILED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "FAILED",
        },
        qids: {
          QID8: "SAP Cloud Identity Services - Identity Authentication (IAS)",
          QID42: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("IAS SAML, Item Connector, No ODATA, No Learning History", function () {
      var testdefinition = {
        description:
          "IAS SAML, Item Connector, No ODATA, No Learning History",
        processed: {
          embeddedsaml: false,
          iassaml: true,
          othersaml: false,
          othersamlid: false,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "PASSED",
          othersaml_qualification: "N/A",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "FAILED",
        },
        qids: {
          QID8: "SAP Cloud Identity Services - Identity Authentication (IAS)",
          QID42: "Yes",
          QID43: "No",
          QID49: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, Student ID, No Item Connector", function () {
      var testdefinition = {
        description:
          "Other SAML, Student ID, No Item Connector",
        processed: {
          embeddedsaml: false,
          iassaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
          itemconnector: false,
          odataapi: false,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "FAILED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "FAILED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "Yes",
          QID42: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Other SAML, Student ID, Item Connector, No ODATA, No Learning History", function () {
      var testdefinition = {
        description:
          "Other SAML, Student ID, No ODATA, No Learning History",
        processed: {
          embeddedsaml: false,
          iassaml: false,
          othersaml: true,
          othersamlid: true,
          saml: true,
          itemconnector: true,
          odataapi: false,
          learninghistoryconnector: false,
        },
        qualified: {
          qualification: "FAILED",
          saml_qualification: "PASSED",
          embeddedsaml_qualification: "N/A",
          iassaml_qualification: "N/A",
          othersaml_qualification: "PASSED",
          itemconnector_qualification: "PASSED",
          odataapi_qualification: "FAILED",
          learninghistoryconnector_qualification: "FAILED",
        },
        qids: {
          QID8: "Other SAML Identity Provider",
          QID35: "Yes",
          QID42: "Yes",
          QID43: "No",
          QID49: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });
  });
});
