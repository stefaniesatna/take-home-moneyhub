# Moneyhub Tech Test - Investments and Holdings

## Overview

This project is an implementation of an admin microservice for generating and exporting investment holding reports. It fetches data from two other services, the investments service and the financial companies service, and then generates a CSV report which is sent back to the investments service for processing.

## Disclaimer

During this exercise, I explored working with microservices for the first time. I also refreshed my experience with Node, CommonJS, Postman, and npm concepts, such as updating dependencies, which I haven't done recently since I haven't worked with Node at Meta. Additionally, I wasn't entirely clear on the requirement for the investments service to receive the report as JSON, so I proceeded with sending it as a CSV. Under normal circumstances, if I wasn't pressed for time during the hiring process, I would have sought clarification first.
All in all, these minor setbacks meant that the exercise took me slightly longer to complete than the recommended 1-2 hours. However, it was a valuable learning experience that I will be able to utilise in my future projects.

## Approach

Before diving into the implementation details, I first focused on testing the request flow using empty functions. This allowed me to ensure that the overall architecture was functioning as intended. Once I confirmed that the request flow is working correctly, I implemented the function responsible for generating a CSV report and added basic error handling.

## New routes

`POST /admin/holdings`: fetches data from financial-companies and investments services, generates a CSV report and sends that report to the investments service

## Additional Scripts and Tests

No additional scripts or tests were added in this implementation.

## Considerations & Improvements with More Time

- Validate input data and handle any errors gracefully.
- Encrypt data in transit.
- Set up monitoring and logging to detect and respond to any security incidents.
- Add unit tests and integration tests
- Add type safety
- Make use of ramda for consistency across the codebase
