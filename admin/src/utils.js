const request = require("request");
const config = require("config");

let fetch;

(async () => {
  const nodeFetch = await import("node-fetch");
  fetch = nodeFetch.default;
})();

const generateCSVReport = async () => {
  try {
    // Fetch data from the investments and financial companies services
    const investmentsResponse = await fetch(
      `${config.investmentsServiceUrl}/investments`
    );
    const investmentsData = await investmentsResponse.json();

    const companiesResponse = await fetch(
      `${config.financialCompaniesServiceUrl}/companies`
    );
    const companiesData = await companiesResponse.json();

    // Generate the CSV report
    const csvHeaders = "User,First Name,Last Name,Date,Holding,Value";

    const csvRows = investmentsData.map((investment) => {
      const holdings = investment.holdings;
      return holdings.map((holding) => {
        const holdingName = companiesData.find(
          (company) => company.id === holding.id
        ).name;

        const holdingValue =
          investment.investmentTotal * holding.investmentPercentage;
        return `${investment.id},${investment.firstName},${investment.lastName},${investment.date},${holdingName},${holdingValue}`;
      });
    });

    const csvReport = [csvHeaders, ...csvRows].join("\n");
    return csvReport;
  } catch (error) {
    console.error("Error generating CSV report:", error);
    throw error;
  }
};

const sendCSVReportToInvestmentsService = async (csvReport) => {
  try {
    const response = await fetch(
      `${config.investmentsServiceUrl}/investments/export`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
        },
        body: csvReport,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Request to investments service failed with status ${response.status}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error sending CSV report to investments service:", error);
    throw error;
  }
};

module.exports = { generateCSVReport, sendCSVReportToInvestmentsService };
