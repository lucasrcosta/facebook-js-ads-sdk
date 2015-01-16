window.FbApiAssets = {
  Utils: {},
  Http: {},
  Objects: {
    Core: {},
    Mixins: {}
  },
  tests: {}
};

/**
 * Define global module
 * @param  {string}   module       Module name
 * @param  {array}    dependencies
 * @param  {function} factory
 */
this.FbApiAssets.define = function(module, dependencies, factory) {
  'use strict';

  var currentPath = window.FbApiAssets;
  var modulePath = module.split('.');
  var moduleParentPath;
  var moduleName;
  modulePath.forEach(function(path) {
    if (!currentPath[path])
      currentPath[path] = {};
    moduleParentPath = currentPath;
    currentPath = currentPath[path];
    moduleName = path;
  });
  var dependencyObjects = [];
  dependencies.forEach(function(dependency) {
    dependency = dependency.replace(/(\/|-)([a-z])/g, function(g) {
      if (g[0] == '-')
        return g[1].toUpperCase();
      return g[0] + g[1].toUpperCase();
    });
    var parts = dependency.split('/');
    var dependencyPath = modulePath.slice();
    var wentForward = false;
    dependencyPath.pop();
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] == '.')
        continue;
      if (parts[i] == '..') {
        if (wentForward)
          throw Error('Path not supported: ' + dependency);
        dependencyPath.pop();
        continue;
      }
      wentForward = true;
      dependencyPath.push(parts[i]);
    }
    var dependencyObject = window.FbApiAssets;
    dependencyPath.forEach(function(path) {
      dependencyObject = dependencyObject[path];
    });
    dependencyObjects.push(dependencyObject);
  });
  moduleParentPath[moduleName] = factory.apply(factory, dependencyObjects.map(function(d) { return d; }));
};
