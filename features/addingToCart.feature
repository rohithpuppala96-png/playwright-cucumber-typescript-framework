@addingToCart
Feature: Adding To Cart

    Background:
        Given User logs in to required application

    @addToCart
    Scenario: Add Products to Cart
        Given The test fetches required data "<scenarioName>"
        When Adds Required Products to Cart
        Then User Clicks on Cart
        Then User Verifies added products

        
        Examples:
            |   scenarioName  |
            |    addToCart    |
