$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });

      /* Test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('url defined', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
      });

      /* Test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('name defined', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).toBeTruthy();
          });
      });
    });

    describe('The menu', function() {

      /* Test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
        it('element is hidden by default', function() {
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

       /* Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('displays or hides when menu icon is clicked', function() {
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).not.toBe(true);
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*Extra Test that checks the menu is hidden 
        * when the list-element from menu is selected.
        */
        it('hides when list-element from menu is clicked', function() {
          $('.feed-list').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. 
         * LoadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //pass 'done' to the callback, load the first feed
        beforeEach(function(done) {
            loadFeed(0, function(){
                done(); //async function is done doing what we needed
            });
        });

        it('should have .entry within .feed container', function() {
            expect($('.feed .entry').length >= 1).toBe(true);
        });
    });

    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var newContent;

         /* Load the second feed asynchronously before each test and
         * assign this value to the variable.
         */
        beforeEach(function() {
            loadFeed(1, function(){
                newContent = $('.feed .entry h2').html();
                //done(); //async function is done doing what we needed
            });
        });

        it('has changed content', function(done) {
        //test compares entry from initial first feed to entry pulled from the second feed
            loadFeed(0, function() {
                expect($('.feed .entry h2').html()).not.toEqual(newContent);
                done();
            });
        });
    });

    describe('The article', function() {

        beforeEach(function(done) {
          loadFeed(0, function() {
            title = $('.feed .entry h2');
            contentSnippet = $('.feed .entry p');
            done();
          });
        });

      // ContentSnippet isn't empty, null, undefined or 0.
        it('has title', function() {
          expect(title.html()).toBeTruthy();
        });

        it('has content snippet', function() {
          expect(contentSnippet.html()).toBeDefined();//pass
          expect(contentSnippet.html()).toBeTruthy();//fail
        });
    
      //Pending expectaion needs to create custom matcher such as to ContainText
      //we might need to use jasmine-jquery plugin
        it('has the Read more link', function() {
          expect(contentSnippet.html()).toContainText(/Read more.../);
        });
    });

    /*To test JavaScript code that handles a search functionality we might need to
    *create the HTML code containing the search form as a HTML fixture
    *with the help of the jasmine-jquery plugin, which will provide useful
    *methods like loadFixtures or setFixtures
    */
    describe('Search', function() {

        beforeEach(function() {
          loadFixtures('SearchFixture.html');
          //OR
          setFixtures('<input class="fixtureClass" type="search" value="search">');
        });
        xit('method receive fixture as a parameter', function() {
          expect($('.fixtureClass')).toExist();
        });

        xit("should allow the input of the search symbol", function() {
          var input = $('<input value="search">');
          expect(input.find('.fixtureClass')).toBe('input[type=search]');//checks if input matches the passed CSS selector
        });

        xit('should detect if an input has a value', function() {
          var input = $('<input value="search">');
          expect(input).toHaveValue('search');
        });
    });

    describe('When search button is clicked', function() {
        var newContent;
        beforeEach(function(done) {
          loadFeed(0, function(){
              newContent = $('.feed .entry h2').html();
              done();
          });
        //then fill inputs
        });

        xit('new entries are loaded', function(done) {
          //and simulate the clicking of the button
          $('.search-button').click();
          loadFeed(id, function() {
            expect($('.feed .entry h2').html()).not.toEqual(newContent);
            done();
          });
        });
    });

    /* Test (pending) that callback method should be called on successful response from server
    * To run such Jasmine specs for AJAX calls we have to include jasmine-jquery plugin
    * https://github.com/velesin/jasmine-jquery */
    describe('Ajax Calls with $.ajax:', function(){
      xit('Callback method should be called on successful response', function() {
        spyOn($, 'ajax').and.callFake(function(e) {
          //to obtain a successful response pass in an anonymous function that calls ajax success() event handler
          e.success({});
        });
        var cb; 
        cb = jasmine.createSpy();//Create callback as the custom spy method to test the callbacks
        loadFeed(cb);
        expect(cb).toHaveBeenCalled();//Verify callback method is called or not
      });
    });

    /* Extra test suite for checking number of feeds (will pass)*/
    describe('The number of feeds displayed', function() {
      var countFeeds = $('li').length;

      //Test default number of feeds equals 4
      it('defaults to four', function() {
        expect(countFeeds).toEqual(4);
      });
    });
}());