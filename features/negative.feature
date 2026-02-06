Feature: Negative API Scenarios

Scenario: TC-04 Invalid endpoint
Given I set invalid endpoint
When I send GET request
Then I receive 404 status code

Scenario: TC-05 Unsupported HTTP method
Given I set posts endpoint
When I send PATCH request
Then I receive error response

Scenario: TC-06 Invalid post ID
Given I set post endpoint with id 9999
When I send GET request
Then I receive empty response
