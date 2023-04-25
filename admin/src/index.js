const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const request = require("request");
const {
  generateCSVReport,
  sendCSVReportToInvestmentsService,
} = require("./utils");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/investments/:id", (req, res) => {
  const { id } = req.params;
  request.get(
    `${config.investmentsServiceUrl}/investments/${id}`,
    (e, r, investments) => {
      if (e) {
        console.error(e);
        res.send(500);
      } else {
        res.send(investments);
      }
    }
  );
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
