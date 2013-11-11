define(["babylon"], function(BABYLON) {
  var Camera;
  Camera = (function() {
    function Camera(name, type, options) {
      this.name = name;
      this.type = type;
      if (options == null) {
        options = {};
      }
      this.defaults = {
        controls: true,
        pos: [0, 0, 0]
      };
      this.opts = _.extend(this.defaults, options);
    }

    Camera.prototype.attach = function(scene, canvas) {
      switch (this.type) {
        case "free":
          this.cam = new BABYLON.FreeCamera(this.name, new BABYLON.Vector3(this.opts.pos[0], this.opts.pos[1], this.opts.pos[2]), scene);
      }
      if (this.opts.controls) {
        return scene.activeCamera.attachControl(canvas);
      } else {
        return this.cam.detachControl(canvas);
      }
    };

    Camera.prototype.setPosition = function(x, y, z) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (z == null) {
        z = 0;
      }
      return this.mesh.position = new BABYLON.Vector3(x, y, z);
    };

    Camera.prototype.move = function(x, y, z) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (z == null) {
        z = 0;
      }
      return this.mesh.position.addInPlace(new BABYLON.Vector3(x, y, z));
    };

    return Camera;

  })();
  return Camera;
});
