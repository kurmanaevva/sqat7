const { After, AfterAll } = require("@cucumber/cucumber");

const results = [];

After(function (scenario) {
  const scenarioName = scenario.pickle.name;
  const status = scenario.result.status === "PASSED" ? "Passed" : "Failed";

  results.push({
    "Test Case": scenarioName.split(" ")[0], // TC-01
    "Scenario": scenarioName.replace(/^TC-\d+\s*/, ""),
    "Result": status
  });
});

AfterAll(function () {
  console.log("\n📊 TEST EXECUTION SUMMARY");
  console.table(results);
});
