const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const { expect } = require("chai");
const config = require("../config");

let response;
let endpoint;
let lastResponses = [];

// GIVEN STEPS

Given("I set posts endpoint", function () {
  endpoint = "/posts";
});

Given("I set post endpoint with id {int}", function (id) {
  endpoint = `/posts/${id}`;
});

Given("I set create post endpoint", function () {
  endpoint = "/posts";
});

Given("I set delete post endpoint", function () {
  endpoint = "/posts/1";
});

Given("I set invalid endpoint", function () {
  endpoint = "/postss"; 
});

// WHEN STEPS

When("I send GET request", async function () {
  try {
    response = await axios.get(config.baseURL + endpoint);
  } catch (err) {
    response = err.response;
  }
});

When("I send POST request with empty body", async function () {
  try {
    response = await axios.post(config.baseURL + endpoint, {});
  } catch (err) {
    response = err.response;
  }
});

When("I send POST request with large data", async function () {
  try {
    response = await axios.post(config.baseURL + endpoint, {
      title: "A".repeat(5000),
      body: "B".repeat(10000),
      userId: 1
    });
  } catch (err) {
    response = err.response;
  }
});

When("I send POST request with valid data", async function () {
  try {
    response = await axios.post(config.baseURL + endpoint, {
      title: "Test title",
      body: "Test body",
      userId: 1
    });
  } catch (err) {
    response = err.response;
  }
});

When("I send DELETE request", async function () {
  try {
    response = await axios.delete(config.baseURL + endpoint);
  } catch (err) {
    response = err.response;
  }
});

When("I send PATCH request", async function () {
  try {
    response = await axios.patch(config.baseURL + endpoint);
  } catch (err) {
    response = err.response;
  }
});

When("I send multiple GET requests quickly", async function () {
  lastResponses = [];
  for (let i = 0; i < 10; i++) {
    try {
      const res = await axios.get(config.baseURL + endpoint);
      lastResponses.push(res);
    } catch (err) {
      lastResponses.push(err.response);
    }
  }
});

// THEN STEPS

Then("I receive response status {int}", function (status) {
  expect(response.status).to.equal(status);
});

Then("I receive post data", function () {
  expect(response.data).to.have.property("id");
});

Then("Post is created successfully", function () {
  expect(response.status).to.equal(201);
});

Then("Post is deleted", function () {
  expect(response.status).to.equal(200);
});

Then("API returns fake success response", function () {
  expect(response.status).to.equal(201);
});

Then("API accepts large payload", function () {
  expect(response.status).to.equal(201);
});

Then("All responses are successful", function () {
  lastResponses.forEach(res => expect(res.status).to.equal(200));
});

Then("I receive empty response", function () {
  expect(response.data).to.be.empty;
});

Then("I receive error response", function () {
  expect(response.status).to.be.oneOf([404, 405]);
});

Then("I receive {int} status code", function (status) {
  expect(response.status).to.equal(status);
});
