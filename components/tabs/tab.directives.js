angular.module('tabDirective', [])
    .directive('panelTab', function(){
        return{
            restrict: 'E',
            templateUrl: 'components/tabs/panel-tab.html',
            controller: function(){
              this.tab = 1;
              this.selectTab = function(setTab) {
                this.tab = setTab;
              };
              this.isSelected = function(checkTab) {
                return this.tab === checkTab;
               };  
            },
            controllerAs: 'panel'
        };
    });