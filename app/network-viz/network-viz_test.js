'use strict';

describe('myApp.network-viz module', function() {
   	var $httpBackend, $rootScope, createController, authRequestHandler, $routeParams;
	beforeEach(module('myApp.network-viz'));


  describe('network-viz controller on existent country', function(){
   	beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
      // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     $routeParams = {"country":"any_country_id"};
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', "network-viz/data/" + $routeParams.country + ".csv")
                            .respond()
                          $httpBackend.when('GET', "network-viz/data/country_names.json")
                            .respond({"any_country_id":"Country Name"});


     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('NetworkVizCtrl', {'$scope' : $rootScope , '$routeParams': $routeParams});
     };
   }));
   	afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

    it('should open right country data file', inject(function($controller) {
      //spec body 

      var networkCtrl = createController();
      $httpBackend.expectGET("network-viz/data/" + $routeParams.country + ".csv");
      $httpBackend.flush();
    }));

    it('should be nodeName empty string by default', inject(function($controller) {
      //spec body 
      var networkCtrl = createController();
      expect($rootScope.nodeName).toBe("");
      $httpBackend.flush();

    }));

    it('should put correct name in scope when clicked', inject(function($controller) {
      //spec body 
      var networkCtrl = createController();
      var datum = {"name":"node name", "type": "type"}
      $rootScope.clickNode(datum);
      expect($rootScope.nodeName).toBe("node name");
      $httpBackend.flush();

    }));

    it('should put empty string in nodeName when clicked outside a node after a node was selected', inject(function($controller) {
      //spec body 
      var networkCtrl = createController();
      var datum = {"name":"node name", "type": "type"}
      $rootScope.clickNode(datum);
      $rootScope.clickOutsideNode();
      expect($rootScope.nodeName).toBe("");
      $httpBackend.flush();

    }));

    it('should put correct type in scope when clicked', inject(function($controller) {
      //spec body 
      var networkCtrl = createController();
      var datum = {"name":"node name", "type": "type"}
      $rootScope.clickNode(datum);
      expect($rootScope.nodeType).toBe("type");
      $httpBackend.flush();

    }));


    it('should open country_names.json file', inject(function($controller) {
      //spec body 

      var networkCtrl = createController();
      $httpBackend.expectGET("network-viz/data/country_names.json");
      $httpBackend.flush();
    }));

    it('should put correct country name in scope', inject(function($controller) {
      //spec body 
      var networkCtrl = createController();
      $httpBackend.expectGET("network-viz/data/country_names.json");
      $httpBackend.flush();
      expect($rootScope.countryName).toBe("Country Name");

    }));



  });
});