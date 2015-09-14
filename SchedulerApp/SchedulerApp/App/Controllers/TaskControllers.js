﻿(function () {

    var ListTaskController = function ($scope, $filter, TaskService) {

        var taskMeta = {};
        taskMeta.taskDuration = "today";
        $scope.taskMeta = taskMeta;

        var search = function () {
            var userId = 1;
            TaskService.getTasks($scope.taskMeta.taskDuration, userId, function (data) {
                $scope.tasks = data;
            });
        };

        $scope.$watch("taskMeta.taskDuration", function (newDuration, previousDuration) {
            search(newDuration);
        }, true);

        $scope.$watch("tasks", function (newObject, oldObject) {
            if (newObject === undefined || oldObject === undefined)
                return;

            var newState = newObject[0].Completed;

            TaskService.changeTaskStatus(newObject[0].Id, newState, function (data) {

            });

        },true);

        $scope.deleteTask = function (taskId) {
            TaskService.deleteTask(taskId, function () {
                var item = $filter('filter')($scope.tasks, { Id: taskId }, true);
                if (item.length === 1) {
                    var itemIndex = $scope.tasks.indexOf(item[0]);
                    $scope.tasks.splice(itemIndex, 1);
                }
                else {
                    //Error
                }
            });
        } ;

        if (!TaskService.tasksLoaded) {
            search();
        }
    };

    var module = angular.module('SchedulerApp');
    module.controller("ListTaskController", ListTaskController);

    module.controller('AddEditTaskController', function ($scope, TaskService, $location) {
        $scope.task = {
            Id: -1,
            Summary: '',
            Description: '',
            Completed: false
        };

        $scope.addTask = function (taskData) {
            TaskService.addTask(taskData, function (response) {
                $location.path('/');
            })
        };
    });

}());