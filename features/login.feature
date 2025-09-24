Feature: User Authentication
  As a user
  I want to be able to login to the website
  So that I can access my account

  Scenario: Successful login
    Given I am on the home page
    When I navigate to the login page
    And I enter valid credentials
    Then I should be logged in successfully
