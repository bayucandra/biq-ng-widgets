(function(angular){
    "use strict";
    angular.module('biqWidgets')
            .directive('biqDialog', [
                function(){
                    var ref = {};
                    ref.restrict = 'E';
                    ref.transclude = true;
                    ref.scope = {
                        biqApi : '='
                    };
                    ref.controller = [
                        '$scope', '$attrs', '$element', '$timeout',
                        function($scope, $attrs, $element, $timeout){
                            angular.element($element[0]).fadeOut();
                            
                            
                            $scope.is_visible = false;
                            
                            $scope.show = function(p_callback){
                                $timeout(function(){
                                    angular.element($element[0]).fadeIn();
                                    biq_dialog_el.fadeIn();
                                    $scope.is_visible = true;
                                    if(typeof p_callback === 'function'){ p_callback(); }
                                },100);
                                angular.element(document).on('keydown', $scope.keyDown);
                                angular.element('#biq-dialog').children('.overlay').on('click', $scope.overlayClick);
                            };
                            $scope.hide = function(){
                                biq_dialog_el.fadeOut(500);
                                angular.element('biq-dialog').fadeOut();
                                $scope.is_visible = false;
                                angular.element(document).off('keydown', $scope.keyDown);
                                angular.element('#biq-dialog').children('.overlay').off('click', $scope.overlayClick);
                                if(typeof $scope.biqApi.callback === 'function'){
                                    $scope.biqApi.callback();
//                                    if(!$scope.$$phase) $scope.$apply();
                                }
                            };
                            
                            var biq_dialog_el = angular.element('#biq-dialog');
                            if(!biq_dialog_el.length){
                                var biq_dialog_html = 
                                        '<div id="biq-dialog">\n\
                                            <div class="overlay"></div>\n\
                                        </div>';
                                biq_dialog_el = angular.element(biq_dialog_html);
                                biq_dialog_el.hide();
                                angular.element('body').append(biq_dialog_el);
                            }
                            $scope.biqApi = {
                                show : $scope.show, hide: $scope.hide, callback : null
                            };
                            $scope.keyDown = function(e){
                                if(e.keyCode === 27){
                                    $scope.hide();
                                }
                            };
                            $scope.overlayClick = function(e){
                                $scope.hide();
                            };
                        }
                    ];
                    ref.template = '<div class="wrapper" ng-transclude></div>';
                    return ref;
                }
            ]);
})(angular);