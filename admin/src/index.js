const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const {
  generateCSVReport,
  sendCSVReportToInvestmentsService,
} = require("./utils");
const { validateInvestmentId, errorHandler } = require("./middleware");

let fetch;

(async () => {
  const nodeFetch = await import("node-fetch");
  fetch = nodeFetch.default;
})();

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(errorHandler);

app.get("/investments/:id", validateInvestmentId, async (req, res) => {
  const { id } = req.params;

  const response = await fetch(
    `${config.investmentsServiceUrl}/investments/${id}`
  );
  if (!response.ok) {
    throw new Error(
      `Request to investments service failed with status ${response.status}`
    );
  }
  const investments = await response.json();
  res.send(investments);
});

app.post("/admin/holdings", async (req, res) => {
  const csvReport = await generateCSVReport();
  const response = await sendCSVReportToInvestmentsService(csvReport);
  res.send({ exportServiceStatus: response.status, report: csvReport });
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
