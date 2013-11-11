define(["babylon", "c/bentity"], function(BABYLON, BEntity) {
  var Camera;
  Camera = (function() {
    function Camera(options) {
      if (options == null) {
        options = {};
      }
      this.defaults = {
        pos: [0, 0, 0]
      };
      this.opts = _.extend(this.defaults, options);
      this.entities;
    }

    Camera.prototype.attach = function(scene) {};

    Camera.prototype.emit = function(scene) {};

    return Camera;

  })();
  return Camera;
});
