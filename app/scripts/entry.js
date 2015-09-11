'use strict';

// NW.JS stuff
var gui = require('nw.gui');
var win = gui.Window.get();

var windowState;

var appDependencies = [
  'ng',
  'ui.router'
];

angular
  .module('app', appDependencies)
  .config(appConfig)
  .constant('config', require('../../config.json'));

require('./app.controller');
require('./about.controller');

appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function appConfig ($stateProvider, $urlRouterProvider) {
  var routes = [
    {
      name: 'main',
      path: ''
    },
    {
      name: 'about',
      path: 'about'
    }
  ];

  routes.forEach(function(route){
    $stateProvider.state(route.name, {
      url: "/" + route.path,
      views: {
        guest: { templateUrl: 'views/' + route.name + '.html' }
      }
    });
  });

  $urlRouterProvider.otherwise("/");
}

// Tray

// Create a tray icon
//var tray = new gui.Tray({ title: 'Tray', icon: 'img/icon.png' });

// Give it a menu
//var menu = new gui.Menu();
//menu.append(new gui.MenuItem({ type: 'checkbox', label: 'box1' }));
//tray.menu = menu;

// To open external links in the real browser
win.on('new-win-policy', function(frame, url, policy) {
  gui.Shell.openExternal(url);
  policy.ignore();
});

// Context menu
var mb = new gui.Menu({type:"menubar"});
if (process.platform === "darwin") {
  mb.createMacBuiltin("assistant");
}
win.menu = mb;

// Window Size
//win.resizeTo(600, 200);
//win.setPosition('center');

win.on('focus', function() {
  windowState = 'focused';
});

win.on('blur', function() {
  windowState = 'blurred';
  $('#theInput').val('');
});

var option = {
  key : "Ctrl+Period"
};

// Create a shortcut with |option|.
var shortcut = new gui.Shortcut(option);

// Register global desktop shortcut, which can work without focus.
gui.App.registerGlobalHotKey(shortcut);

// If register |shortcut| successfully and user struck "Ctrl+Shift+A", |shortcut|
// will get an "active" event.

// You can also add listener to shortcut's active and failed event.
shortcut.on('active', function() {
  if (windowState == 'focused') {
    win.blur();
    win.hide();
  }
  else {
    win.restore();
    win.focus();
  }

  // Focus the input
  setTimeout(function(){
    $('#theInput').focus();
  }, 50);
});
