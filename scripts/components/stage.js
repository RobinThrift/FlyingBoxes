define(["babylon", "KeyboardJS/keyboard", "c/bits"], function(BABYLON, KeyboardJS, Bits) {
  var Stage;
  Stage = (function() {
    function Stage(containerID) {
      this.containerID = containerID;
      this.canvas = document.getElementById(containerID);
      this.engine = new BABYLON.Engine(this.canvas, true);
      this.scene = new BABYLON.Scene(this.engine);
      this.entities = [];
      this.camera = null;
      this.lights = [];
    }

    Stage.prototype.height = function() {
      return this.canvas.height;
    };

    Stage.prototype.width = function() {
      return this.canvas.width;
    };

    Stage.prototype.uniqueID = function() {
      return Bits.ramdomStr();
    };

    Stage.prototype.loop = function() {
      var _this = this;
      return this.engine.runRenderLoop(function() {
        var activeKeys, entity, _i, _len, _ref;
        activeKeys = KeyboardJS.activeKeys();
        _ref = _this.entities;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          entity.update(0, activeKeys);
        }
        return _this.scene.render();
      });
    };

    Stage.prototype.addCamera = function(camera) {
      camera.attach(this.scene, this.canvas);
      return this.camera = camera;
    };

    Stage.prototype.addLight = function(light) {
      light.attach(this.scene);
      return this.lights.push(light);
    };

    Stage.prototype.addEntity = function(entity) {
      entity.attach(this.scene);
      return this.entities.push(entity);
    };

    return Stage;

  })();
  return Stage;
});
