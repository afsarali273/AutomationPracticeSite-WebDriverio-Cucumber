var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    brandTitle: 'Final Test Summary',
    jsonDir: 'reporter/json/',
    output: 'reporter/cucumber_report.html',
    screenshotsDirectory: 'reporter/screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    ignoreBadJsonFile: true,
    launchReport: false,
    metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);