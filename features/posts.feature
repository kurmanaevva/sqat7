Feature: Posts API - Positive Scenarios

Scenario: TC-07 Get all posts
Given I set posts endpoint
When I send GET request
Then I receive response status 200

Scenario: TC-08 Get post by valid ID
Given I set post endpoint with id 1
When I send GET request
Then I receive post data

Scenario: TC-09 Create a new post
Given I set create post endpoint
When I send POST request with valid data
Then Post is created successfully

Scenario: TC-10 Delete a post
Given I set delete post endpoint
When I send DELETE request
Then Post is deleted
