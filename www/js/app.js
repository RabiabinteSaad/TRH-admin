// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var base_url = 'http://192.168.1.107:3000';
angular.module('starter', ['ionic','starter.controllers','starter.services','ngStorage','ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

//Localstorage strat
  .factory ('StorageService', function ($localStorage) {
  //$localStorage.$reset();
  console.log('in storage');
  $localStorage = $localStorage.$default({
    tasks: [{SENDER:'s1', RECIEVER:'r1',NOTICE:'n1'}],
    events:[]
  });

  var _getAll = function () {
    // $localStorage.$reset();
    //console.log('getAll');
    //console.log($localStorage.tasks);
    return $localStorage.tasks;
  };

  var _add = function (task) {
    console.log(' in add');
    $localStorage.tasks.push(task);
  }

  var _getAllevents = function () {
    // $localStorage.$reset();
    //console.log('getAll');
    //console.log($localStorage.tasks);
    return $localStorage.events;
  };

  var _addevent = function (task) {
    console.log(' in add');
    $localStorage.events.push(task);
  }
  var _remove = function (task) {
    $localStorage.tasks.splice($localStorage.tasks.indexOf(task), 1);
  }
  var _removeEvent = function (task) {
    $localStorage.events.splice($localStorage.events.indexOf(task), 1);
  }

  var _get = function (task) {
    //$localStorage.tasks.splice($localStorage.tasks.indexOf(task), 1);
    return $localStorage.tasks[indexOf(task)];
  }
  return {
    getAll: _getAll,
    add: _add,
    remove: _remove,
    get:_get,
    getAllevents: _getAllevents,
    addevent: _addevent,
    removeEvent:_removeEvent
  };
})
  .factory('ImageUploadFactory', function ($q, $ionicLoading, $cordovaFileTransfer) {
    return {
      uploadImage: function (imageURI) {
        console.log('start upload image.');
        var deferred = $q.defer();

        uploadFile();

        function uploadFile() {
          console.log('in imageuploadfactory');
          console.log('ex'+ extension);
          if(extension == "jpg")
          {console.log('equal');}
          else
          {console.log('not equal');}
          $ionicLoading.show({template : 'Uploading image...'});

          // Add the Cloudinary "upload preset" name to the headers
          if(extension == "jpg") {
            console.log('in jpg');
            var uploadOptions = {
              params: {'upload_preset': "jy0jv82o"}

            };
          }
          else if(extension == "png") {
            var uploadOptions = {
              params: {'upload_preset': "y0gxexaf"}

            };
          }
          else if(extension == "pdf") {
            console.log('in pdf');
            var uploadOptions = {
              params: {'upload_preset': "dg6iycok"}

            };
          }
          else if(extension == "docx") {
            var uploadOptions = {
              params: {'upload_preset': "a4kyl6pr"}

            };
          }
          else if(extension == "doc") {
            var uploadOptions = {
              params: {'upload_preset': "xko6rrpk"}

            };
          }
          else if(extension == "txt") {
            var uploadOptions = {
              params: {'upload_preset': "uaodpwsn"}

            };
          }
          $cordovaFileTransfer
            // Your Cloudinary URL will go here
            .upload("https://api.cloudinary.com/v1_1/dpibroyqu/raw/upload", imageURI, uploadOptions)

            .then(function(result) {
              // Let the user know the upload is completed
              $ionicLoading.show({template : 'Done.', duration: 1000});
              var response = JSON.parse(decodeURIComponent(result.response));
              console.log('response is'+ response + 'result is' + result.response);

              deferred.resolve(response);
            }, function(err) {
              // Uh oh!
              $ionicLoading.show({template : 'Failed.', duration: 3000});
              deferred.reject(err);
            }, function (progress) {

            });
        }
        return deferred.promise;
      },
    }
  })
//localstorage end
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider


      .state('DetailNote', {
        url: "/DetailNote?sender&reciever&notice",
        templateUrl:"templates/DetailNote.html",
        controller: 'view2Ctrl'

      })


      .state('Notifications', {
        url: "/Notifications",
        templateUrl: "templates/Notifications.html",
        controller: "mainPageCtrl"
      })

      .state('NewAnnouncement', {
        url: "/NewAnnouncement",
        templateUrl: "templates/NewAnnouncement.html",
        controller: 'newMessageCtrl'
      })


      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller:'loginCtrl2'
      })

      .state('AdminHome', {
        url: '/AdminHome',
        templateUrl: 'templates/AdminHome.html',

      })


      .state('EventDetails', {
        url: '/EventDetails?title&desc',
        templateUrl: 'templates/EventDetails.html',
        controller:'EventDetailsCtrl'
      })

      .state('Events', {
        url: '/Events',
        templateUrl: 'templates/Events.html',
        /*controller:'EventsCtrl'*/
        controller:'AppCtrl'
      })

      .state('NewEvent', {
        url: "/NewEvent",
        templateUrl: "templates/NewEvent.html",
/*        controller:'NewEventCtrl'*/
        controller:'AppCtrl'

      })







    $urlRouterProvider.otherwise('/Events');

  })

  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  });
