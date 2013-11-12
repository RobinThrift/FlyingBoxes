(function() {
  requirejs.config({
    baseUrl: "/scripts/vendor",
    paths: {
      c: "../components",
      babylon: "babylon.1.6.0"
    },
    shim: {
      "lodash": {
        exports: "_"
      },
      "KeyboardJS/keyboard.js": {
        exports: "KeyboardJS"
      },
      "babylon": {
        exports: "BABYLON",
        deps: ["hand-1.1.3"]
      },
      "zepto.js": {
        exports: "$"
      }
    }
  });

  requirejs(["babylon", "KeyboardJS/keyboard", "zepto", "lodash", "c/bits", "c/stage", "c/camera", "c/light", "c/spawner", "c/bentity", "c/gui"], function(BABYLON, KeyboardJS, $, _, Bits, Stage, Camera, Light, Spawner, BEntity, GUI) {
    var bgPlane, eSpawner, mainCam, mainLight, player, spot1, spot2, spot3, stage;
    stage = new Stage("screen");
    player = new BEntity("player", "box", {
      size: 0.4,
      pos: [0, -3.5, 0],
      Zscaling: 0.3,
      Xscaling: 2,
      Yscaling: 1.1,
      colour: {
        r: 1,
        g: 0,
        b: 0.23
      }
    }, {
      "left": function() {
        if (player.getPosition().x > -3.5) {
          return player.move(-0.2);
        }
      },
      "right": function() {
        if (player.getPosition().x < 3.5) {
          return player.move(0.2);
        }
      },
      "f": function() {
        return player.mesh.rotation.addInPlace(new BABYLON.Vector3(-0.1, -0.1, -.01));
      },
      "g": function() {
        return player.mesh.rotation = new BABYLON.Vector3(0, 0, 0);
      }
    }, bgPlane = new BEntity("bgPlane", "plane", {
      size: 100,
      pos: [0, 0, 20],
      specularColour: {
        r: 1,
        g: 0,
        b: 0.23
      },
      colour: {
        r: 1,
        g: 0.4,
        b: .1
      }
    }));
    mainCam = new Camera("mainCam", "free", {
      pos: [0, 0, -10],
      controls: false
    });
    mainLight = new Light("hemi", "mainLight", {
      pos: [0, 0, 0],
      colour: Bits.rgbToFloatObj(144, 202, 97)
    });
    spot1 = new Light("spot", "spot1", {
      pos: [-3, -2, -2],
      to: [0, -1.5, 2],
      debug: false,
      angle: 10,
      decay: 10,
      colour: Bits.rgbToFloatObj(221, 0, 0)
    });
    spot2 = new Light("spot", "spot2", {
      pos: [0, -2, -2],
      to: [0, -1.5, 2],
      debug: false,
      angle: 10,
      decay: 10,
      colour: Bits.rgbToFloatObj(255, 0, 255)
    });
    spot3 = new Light("spot", "spot3", {
      pos: [3, -2, -2],
      to: [0, -1.5, 2],
      debug: false,
      angle: 10,
      decay: 10,
      colour: Bits.rgbToFloatObj(0, 0, 255)
    });
    eSpawner = new Spawner({
      limit: 30,
      interval: 30,
      emit: function(scene, enities, limit, spawned, onStageEnts) {
        var e, x, _e, _i, _len, _ref;
        for (_i = 0, _len = enities.length; _i < _len; _i++) {
          e = enities[_i];
          if (spawned < limit) {
            _e = new BEntity("b", e.type, e);
            onStageEnts.push(_e);
            stage.addEntity(_e);
            x = Bits.randInt(0, 10);
            x = (_ref = Math.random() > 0.5) != null ? _ref : -x - {
              2: x + 3
            };
            _e.setPosition(x, 10, 0);
            spawned++;
          }
        }
        return spawned;
      },
      update: function(e, tick) {
        var x, _ref;
        if (e.getPosition().y > -8) {
          return e.move(0, -.1, 0);
        } else {
          x = Bits.randInt(0, 10);
          x = (_ref = Math.random() > 0.5) != null ? _ref : -x - {
            2: x + 3
          };
          return e.setPosition(x, 10, 0);
        }
      }
    });
    eSpawner.addToPool({
      type: "box",
      size: 0.4,
      pos: [0, 0, 0],
      Zscaling: 0.3,
      Xscaling: 2,
      Yscaling: 1.1,
      colour: {
        r: 1,
        g: 0,
        b: 0.23
      }
    });
    stage.addSpawner(eSpawner);
    stage.addCamera(mainCam);
    stage.addLight(mainLight);
    stage.addLight(spot1);
    stage.addLight(spot2);
    stage.addLight(spot3);
    stage.addEntity(player);
    stage.addEntity(bgPlane);
    return stage.loop();
  });

}).call(this);
