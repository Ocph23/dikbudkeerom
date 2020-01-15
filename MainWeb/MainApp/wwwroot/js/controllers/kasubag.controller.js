angular.module('app.kasubag.controller', [])
.controller('kasubag.home.controller', HomeController);

function HomeController($scope, AuthService,$state) {

    AuthService.Init(["kasubag"]);
}