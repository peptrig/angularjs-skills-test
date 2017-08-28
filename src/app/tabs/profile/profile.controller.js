(function () {
  'use strict';

  angular.module('ngskilltest')
    .controller('ProfileController', ProfileController);

  /* @ngInject */
  function ProfileController($timeout, $ionicScrollDelegate) {
    var vm = this;
    vm.activeAccordion = undefined;
    vm.toggleAccordion = toggleAccordion;

    init();

    function init() {
    }

    function toggleAccordion(index) {
      vm.activeAccordion = index === vm.activeAccordion ? undefined : index;
      $timeout(function () {
        $ionicScrollDelegate.resize();
      }, 300);
    }
  }

})();
