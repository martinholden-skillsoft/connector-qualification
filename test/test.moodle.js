describe("MOODLE", function () {
  const platform = "MOODLE";

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
      version: false,
      internet: false,
      installplugins: false,
      enablewebservices: false,
    });
    Qualtrics.SurveyEngine.setEmbeddedData("qualified_state", {});
  });

  afterEach(function () {
    // runs after each test in this block
  });

  describe("Expect qualification to succeed", function () {
    it("Moodle Version 3.8, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.8, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services",
        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: true,
        },
        qualified: {
          qualification: "PASSED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "PASSED",
        },
        qids: {
          QID4: "3.8",
          QID44: "Yes",
          QID8: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.9, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.9, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services",
        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: true,
        },
        qualified: {
          qualification: "PASSED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "PASSED",
        },
        qids: {
          QID4: "3.9",
          QID44: "Yes",
          QID8: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.10, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.10, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services",
        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: true,
        },
        qualified: {
          qualification: "PASSED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "PASSED",
        },
        qids: {
          QID4: "3.10",
          QID44: "Yes",
          QID8: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.11, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.11, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services",

        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: true,
        },
        qualified: {
          qualification: "PASSED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "PASSED",
        },
        qids: {
          QID4: "3.11",
          QID44: "Yes",
          QID8: "Yes",
          QID43: "Yes",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 4.0, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 4.0, Internet accessible with Valid Certificate, Able to install Custom Plugins and Able to enable inbound Web Services",

        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: true,
        },
        qualified: {
          qualification: "PASSED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "PASSED",
        },
        qids: {
          QID4: "4.0",
          QID44: "Yes",
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
    it("Moodle Version Other", function () {
      var testdefinition = {
        description: "Moodle Version Other",
        processed: {
          version: false,
          internet: false,
          installplugins: false,
          enablewebservices: false,
        },
        qualified: {
          qualification: "FAILED",
          version_qualification: "FAILED",
          internet_qualification: "FAILED",
          installplugins_qualification: "FAILED",
          enablewebservices_qualification: "FAILED",
        },
        qids: {
          QID4: "None of the above",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.8, NOT Internet accessible with Valid Certificate", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.8, NOT Internet accessible with Valid Certificate",
        processed: {
          version: true,
          internet: false,
          installplugins: false,
          enablewebservices: false,
        },
        qualified: {
          qualification: "FAILED",
          version_qualification: "PASSED",
          internet_qualification: "FAILED",
          installplugins_qualification: "FAILED",
          enablewebservices_qualification: "FAILED",
        },
        qids: {
          QID4: "3.8",
          QID44: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.8, Internet accessible with Valid Certificate, NOT Able to install Custom Plugins", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.8, Internet accessible with Valid Certificate, NOT Able to install Custom Plugins",
        processed: {
          version: true,
          internet: true,
          installplugins: false,
          enablewebservices: false,
        },
        qualified: {
          qualification: "FAILED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "FAILED",
          enablewebservices_qualification: "FAILED",
        },
        qids: {
          QID4: "3.8",
          QID44: "Yes",
          QID8: "No",
        },
      };

      var results = runValidationAndQualification(testdefinition);

      expect(results.processed).to.eql(testdefinition.processed);
      expect(results.qualified).to.eql(testdefinition.qualified);
    });

    it("Moodle Version 3.8, Internet accessible with Valid Certificate, Able to install Custom Plugins and NOT Able to enable inbound Web Services", function () {
      var testdefinition = {
        description:
          "Moodle Version 3.8, Internet accessible with Valid Certificate, Able to install Custom Plugins and NOT Able to enable inbound Web Services",
        processed: {
          version: true,
          internet: true,
          installplugins: true,
          enablewebservices: false,
        },
        qualified: {
          qualification: "FAILED",
          version_qualification: "PASSED",
          internet_qualification: "PASSED",
          installplugins_qualification: "PASSED",
          enablewebservices_qualification: "FAILED",
        },
        qids: {
          QID4: "3.8",
          QID44: "Yes",
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
