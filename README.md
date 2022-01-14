# connector-qualification

Provides the qualification logic for the Skillsoft Connector Qualification Surveys in Qualtrics

## Creating new rules

It is best to copy one of the existing surveys and edit than build from new.

Build the survey questions in Qualtrics, and note the QID numbers for the questions.

Build the validation rules JSON object, these rules determine if this questions response is "valid" true or "invalid" fals.

Example for question with id QID35, create an array of objects with QID35 as the key.

The array contains the validation rule objects.

```
var validationRules = {
    QID35: [
      {
        name: "othersamlid",
        validresponses: [],
        dependencies: {
          and: [],
          or: [],
        },
        run: function (answer) {
          var processed =
            Qualtrics.SurveyEngine.getEmbeddedData("processed_state") || {};
          var status = false;
          status =
            answer.toLowerCase() !== "none of the above" && answer !== "";
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
          status =
            processed.embeddedsaml ||
            (processed.othersaml && processed.othersamlid);
          processed[this.name] = status;
          Qualtrics.SurveyEngine.setEmbeddedData("processed_state", processed);
          return status;
        },
      },
    ],
}
```

## Using witin Qualtrics

1. Include the JS library from the build folder in the survey header.
    1. Open "Look and Feel"
    1. Add Javascript tags to the "header", for example:
        ```
        <script src="https://kit.fontawesome.com/91506b50a1.js" crossorigin="anonymous"></script>
        <script src="https://martinholden-skillsoft.github.io/connector-qualification/build/connector-qualification.bundle.min.js"></script>
        ```
1. On each question add JavaScript to retrieve the rules, and process them when question clicked and next/previous buttons clicked. Make sure to select the correct "defined rules" here we are using DEGREED

    ```
    // Retrieve rules data
    var qualificationRules = QUALIFICATION.DEGREED.getQualificationRules();
    var validateRules = QUALIFICATION.DEGREED.getValidationRules();

    Qualtrics.SurveyEngine.addOnload(function () {
      /*Place your JavaScript here to run when the page loads*/
      this.questionclick = function (event, element) {
          if (element.type === "radio") {
        var choiceNum = this.getChoiceAnswerValue();
        var questionInfo = this.getQuestionInfo();

        var qNum = this.questionId;
        var answer1 = questionInfo.Choices[choiceNum].Text;

              // Run thru the validation tasks
              jQuery.map(validateRules[qNum], function (rule, i) {
                  return rule.run(answer1);
              });

              // Run thru the ALL qualification tasks
              jQuery.map(qualificationRules["ALL"], function (rule, i) {
                  return rule.run(answer1);
              });

              // Run thru the QUESTION specific qualification tasks
              jQuery.map(qualificationRules[qNum], function (rule, i) {
                  return rule.run(answer1);
              });
          }
      }
    });

    Qualtrics.SurveyEngine.addOnPageSubmit(function (type) {
      var choiceNum = this.getChoiceAnswerValue();
      var qNum = this.questionId;
      var answer1 = this.getQuestionInfo().Choices[choiceNum].Text;

      // Run thru the validation tasks
      jQuery.map(validateRules[qNum], function (rule, i) {
        return rule.run(answer1);
      });

      // Run thru the ALL qualification tasks
      jQuery.map(qualificationRules["ALL"], function (rule, i) {
        return rule.run(answer1);
      });

      // Run thru the QUESTION specific qualification tasks
      jQuery.map(qualificationRules[qNum], function (rule, i) {
        return rule.run(answer1);
      });
    });

    Qualtrics.SurveyEngine.addOnReady(function () {});

    Qualtrics.SurveyEngine.addOnUnload(function () {});
    ```

## License

MIT © Martin Holden
