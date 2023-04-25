const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");

let fetch;

(async () => {
  const nodeFetch = await import("node-fetch");
  fetch = nodeFetch.default;
})();

const {
  generateCSVReport,
  sendCSVReportToInvestmentsService,
} = require("./utils");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/investments/:id", async (req, res) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    console.error("Error processing the request: ", error);
    res.sendStatus(500);
  }
});

app.post("/admin/holdings", async (req, res) => {
  try {
    const csvReport = await generateCSVReport();
    const response = await sendCSVReportToInvestmentsService(csvReport);
    res.sendStatus(response.status);
  } catch (error) {
    console.error("Error processing the request: ", error);
    res.sendStatus(500);
  }
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});
