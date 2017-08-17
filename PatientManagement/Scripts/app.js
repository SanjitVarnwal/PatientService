﻿var app = angular.module("patientApp", ["ngRoute", "DBService"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/landing", {
            templateUrl: "/Views/Landing.html",
            controller: "LandingController"
        })
        .when("/add", {
            templateUrl: "/Views/Add.html",
            controller: "AddController"
        })
        .when("/edit/:id", {
            templateUrl: "/Views/Edit.html",
            controller: "EditController"
        })
        .when("/view/:id", {
            templateUrl: "/Views/View.html",
            controller: "ViewController"
        })
        .otherwise({
            templateUrl: "/Views/Start.html"
        })
});