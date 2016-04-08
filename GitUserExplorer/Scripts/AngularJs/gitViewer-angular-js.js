(function () {

    var app = angular.module('gitUserExplorer', []);

    function HandleMainController($scope, $http) {

        loadDefaultUser();

        function loadDefaultUser() {
            $scope.user = { avatar_url: "https://help.github.com/assets/images/help/profile/identicon.png", name: "No User", location: "...", html_url: "#" };
            $scope.repositories = [];
        }

        $scope.search = function () {

            if ($scope.username === null || $scope.username === undefined || $scope.username === '') {
                $scope.error = "Enter a github user";
                return;
            }

            loadUserDetails();
            loadUserRepositories();
        }

        function loadUserDetails() {
            $http.get("https://api.github.com/users/" + $scope.username).then(function (response) {
                $scope.user = response.data;
            }, function () { loadDefaultUser(); $scope.error = "Could not find the user: " + $scope.username; });
        }

        function loadUserRepositories() {
            $http.get("https://api.github.com/users/" + $scope.username + "/repos").then(function (response) {
                $scope.repositories = response.data;
                $scope.error = "";
            }, function () { loadDefaultUser(); $scope.error = "Could not find the user repo: " + $scope.username; });
        }
    }

    app.controller('mainController', HandleMainController);

})();