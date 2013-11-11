define(["babylon", "lodash"], function(BABYLON, _) {
  var BEntity;
  BEntity = (function() {
    function BEntity(name, type, options, controls) {
      this.name = name;
      this.type = type;
      if (options == null) {
        options = {};
      }
      this.controls = controls != null ? controls : {};
      this.defaults = {
        size: 1.0,
        pos: [0, 0, 0],
        Xscaling: 1,
        Yscaling: 1,
        Zscaling: 1,
        colour: {
          r: 0,
          g: 0,
          b: 0
        },
        specularColour: {
          r: 1,
          g: 1,
          b: 1
        },
        specularPower: 64
      };
      this.opts = _.extend(this.defaults, options);
    }

    BEntity.prototype.attach = function(scene) {
      switch (this.type) {
        case "box":
          this.mesh = BABYLON.Mesh.CreateBox(this.name, this.opts.size, scene);
          break;
        case "plane":
          this.mesh = BABYLON.Mesh.CreatePlane(this.name, this.opts.size, scene);
      }
      this.mesh.scaling.x = this.opts.Xscaling;
      this.mesh.scaling.y = this.opts.Yscaling;
      this.mesh.scaling.z = this.opts.Zscaling;
      this.setPosition(this.opts.pos[0], this.opts.pos[1], this.opts.pos[2]);
      this.material = new BABYLON.StandardMaterial("" + this.name + "-material", scene);
      this.material.diffuseColor = new BABYLON.Color3(this.opts.colour.r, this.opts.colour.g, this.opts.colour.b);
      this.material.specularColour = new BABYLON.Color3(this.opts.colour.r, this.opts.colour.g, this.opts.colour.b);
      this.material.specularPower = this.opts.specularPower;
      return this.mesh.material = this.material;
    };

    BEntity.prototype.update = function(tick, activeKeys) {
      if (activeKeys == null) {
        activeKeys = [];
      }
      this.checkControls(activeKeys);
      return this.animate(tick);
    };

    BEntity.prototype.animate = function(tick) {};

    BEntity.prototype.checkControls = function(activeKeys) {
      return _.each(this.controls, function(fn, key) {
        if (activeKeys.indexOf(key) !== -1) {
          return fn();
        }
      });
    };

    BEntity.prototype.setPosition = function(x, y, z) {
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

    BEntity.prototype.move = function(x, y, z) {
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

    BEntity.prototype.getPosition = function() {
      return this.mesh.position;
    };

    BEntity.prototype.getX = function() {
      return this.mesh.position.x;
    };

    BEntity.prototype.getY = function() {
      return this.mesh.position.y;
    };

    BEntity.prototype.getZ = function() {
      return this.mesh.position.z;
    };

    BEntity.prototype["delete"] = function() {
      return this.mesh.dispose();
    };

    return BEntity;

  })();
  return BEntity;
});
