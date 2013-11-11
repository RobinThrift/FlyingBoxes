define(["babylon"], function(BABYLON) {
  var Light;
  Light = (function() {
    function Light(type, name, options) {
      this.type = type;
      this.name = name;
      if (options == null) {
        options = {};
      }
      this.defaults = {
        pos: [0, 0, 0],
        to: [0, 0, 0],
        angle: 0.8,
        decay: 15,
        colour: {
          r: 1,
          g: 1,
          b: 1
        },
        diffuse: false,
        groundColor: false,
        debug: false,
        enabled: true
      };
      this.opts = _.extend(this.defaults, options);
      if (!this.opts.diffuse) {
        this.opts.diffuse = this.opts.colour;
      }
      if (!this.opts.groundColor) {
        this.opts.groundColor = this.opts.colour;
      }
    }

    Light.prototype.attach = function(scene) {
      var x, y, z;
      x = this.opts.pos[0];
      y = this.opts.pos[1];
      z = this.opts.pos[2];
      switch (this.type) {
        case "spot":
          this.light = new BABYLON.SpotLight(this.name, new BABYLON.Vector3(x, y, z), new BABYLON.Vector3(this.opts.to[0], this.opts.to[1], this.opts.to[2]), this.opts.angle, this.opts.decay, scene);
          break;
        case "direct":
          this.light = new BABYLON.DirectionalLight(this.name, new BABYLON.Vector3(x, y, z), scene);
          break;
        case "point":
          this.light = new BABYLON.DirectionalLight(this.name, new BABYLON.Vector3(x, y, z), scene);
          break;
        case "hemi":
          this.light = new BABYLON.HemisphericLight(this.name, new BABYLON.Vector3(x, y, z), scene);
      }
      this.light.isEnabled(this.opts.enabled);
      if (this.opts.debug) {
        this.debugBox = BABYLON.Mesh.CreateSphere("" + this.name + "-DEBUG-BOX", 10, 0.3, scene);
        if (this.type === "direct") {
          x = -x;
          y = -y;
          z = -z;
        }
        this.debugBox.position = new BABYLON.Vector3(x, y, z);
      }
      this.light.specular = new BABYLON.Color3(this.opts.colour.r, this.opts.colour.g, this.opts.colour.b);
      this.light.diffuse = new BABYLON.Color3(this.opts.diffuse.r, this.opts.diffuse.g, this.opts.diffuse.b);
      if (this.type === "hemi") {
        return this.light.groundColor = new BABYLON.Color3(this.opts.groundColor.r, this.opts.groundColor.g, this.opts.groundColor.b);
      }
    };

    return Light;

  })();
  return Light;
});
