'use strict';

angular
  .module('app')
  .controller('AppController', AppController);

AppController.$inject = ['$scope'];

function AppController ($scope)
{
  $scope.$watch('theInput', function(value){
    try {
      JSON.parse(value);

      window.open('http://www.jsoneditoronline.org/?json=' + escape(value),'_blank');
    } catch (e) {
      return false;
    }
  })
}
