﻿(function () {
    var module = angular.module('SchedulerApp');

    module.factory('TaskService', function ($location, HttpService) {
        function getDuration(duration) {
            switch (duration) {
                case 'today':
                    return 1;
                case 'week':
                    return 2;
                case 'month':
                    return 3;
                default:
                    return 0;
            }
        }

        var tasks = [];

        var task = {
            Id: -1,
            Summary: '',
            Description: '',
            Completed: false
        },
        taskModel = function (model) {

            var item = {};
            item.Id = model.Id;
            item.Summary = model.Summary;
            item.Description = model.Description;
            item.Completed = model.Completed

            return item;
        },
        addTask = function (taskData, callback) {
            var newTask = new taskModel(taskData);

            HttpService.createTask(newTask)
                .then(callback);

            //We need to push a new task everytime. Otherwise the same task with references
            //will be added each time you press add task
            tasks.push(newTask);
        },
        editTask = function (taskData, callback) {
            var newTask = new taskModel(taskData);

            HttpService.createTask(newTask)
                .then(callback);

            //We need to push a new task everytime. Otherwise the same task with references
            //will be added each time you press add task
            tasks.push(newTask);
        },
        deleteTask = function (taskId, callback) {
            HttpService.deleteTask(taskId)
            .then(callback);
        },
        changeTaskStatus = function (taskId, status) {
            HttpService.changeTaskStatus({ id: taskId, newState: status })
        },
        getTasks = function (duration, callback) {
            HttpService.getTasks(getDuration(duration))
            .then(callback);
        },
        getTask = function (taskId, callback) {
            HttpService.getTask(taskId)
            .then(callback);
        };

        return {
            tasks: tasks,
            tasksLoaded: false,
            addTask: addTask,
            editTask: editTask,
            deleteTask: deleteTask,
            changeTaskStatus: changeTaskStatus,
            getTasks: getTasks,
            getTask: getTask
        };

    });

}());