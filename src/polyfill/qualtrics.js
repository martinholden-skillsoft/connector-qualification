// Polyfill Qualtrics to allow testing
if (
  typeof globalThis.Qualtrics == "undefined" ||
  typeof globalThis.Qualtrics.SurveyEngine == "undefined"
) {
  (function () {
    globalThis.Qualtrics = {};
    globalThis.Qualtrics.SurveyEngine = {};

    globalThis.Qualtrics.SurveyEngine.getEmbeddedData = function (key) {
      var keyEQ = key + "=";
      var ca = document.cookie.split(";");
      for (var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(keyEQ) === 0)
          return JSON.parse(c.substring(keyEQ.length, c.length));
      }
      return null;
    };

    globalThis.Qualtrics.SurveyEngine.setEmbeddedData = function (key, value) {
      document.cookie = key + "=" + JSON.stringify(value) + "; path=/";
    };
  })();
}
