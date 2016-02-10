Feed Reader Testing Project (TDD)
==========
# Project Overview
This is a web-based application that reads RSS feeds, which is tested with Jasmine. Designed tests for existing code using TDD and BDD processes include a few suites such as 'RSS Feeds', 'The menu', 'Initial Entries' and 'New Feed Selection'.
All required specs within suites pass.

###How to run the code
Live link [FeedReader] ()
OR download the repo and open index.html in the browser

###Additional tests designed for future features

These tests are allowed to fail because they are for future unimplemented yet functionality.
* Added spec to the existing suite **"The Menu"** that checks the menu is hidden after the list-element from menu is clicked.
* Test suite **'The number of feeds displayed'** pass.
* Test suite **'The Article'** that ensures the .entry element within the .feed container has title and a link like _'read more...'_ option, and if user clicks on this link the content snippet like small piece of the beginning from the article will be displayed. Initial html code has the basic structure for the content snippet, but we need to implement additional functionality in order to populate this snippet, which can be done using TDD process.
* The search functionality might be implemented in future to allow the app users search through the list of the feeds. For this scenario the suite 'Search' should detect if an input has a value and when search button is clicked new entries are loaded.
* Test suite 'Ajax Calls with $.ajax:' designs spec for jQuery and ensures the callback method should be called on successful response. To run such Jasmine specs for AJAX calls we have to include jasmine-jquery plugin.

####Dependencies and resources used
*[Jasmine documentation](http://jasmine.github.io/2.1/introduction.html)
*[Udacity Dicussion forum] (https://discussions.udacity.com/t/new-feed-selection-question)
*Jasmine Cookbook. M.Sethi, 2015
*jQuery 2.1.1
*Jasmine 2.1.2
*Handelbars 2.0.0
