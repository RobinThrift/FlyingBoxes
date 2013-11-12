(function() {
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
        this.spawners = [];
        this.tick = 0;
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
          var activeKeys, entity, light, spawner, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
          activeKeys = KeyboardJS.activeKeys();
          _ref = _this.entities;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            entity = _ref[_i];
            entity.update(_this.tick, activeKeys);
          }
          _ref1 = _this.lights;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            light = _ref1[_j];
            light.update(light);
          }
          _ref2 = _this.spawners;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            spawner = _ref2[_k];
            spawner.update(_this.tick);
          }
          _this.camera.update();
          _this.scene.render();
          return _this.tick++;
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

      Stage.prototype.addSpawner = function(spawner) {
        spawner.attach(this.scene);
        return this.spawners.push(spawner);
      };

      return Stage;

    })();
    return Stage;
  });

}).call(this);
