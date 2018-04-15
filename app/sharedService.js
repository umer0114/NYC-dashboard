/**
 * Created by Umer on 4/15/2018.
 */

angular.module('dashboard')
    .factory('myAppSharedService', function () {
        var data = {
            data: undefined
        };

        return {
            get: function () {
                return data;
            },
            setProperty: function (key, value) {
                data[key] = value;
            },
            getProperty: function (key) {
                return data[key];
            }
        };
    });