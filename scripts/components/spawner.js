(function() {
  define(["babylon", "c/bentity"], function(BABYLON, BEntity) {
    var Camera;
    Camera = (function() {
      function Camera(options) {
        if (options == null) {
          options = {};
        }
        this.defaults = {
          pos: [0, 0, 0],
          emit: function(scene, entities, limit) {},
          limit: 1,
          interval: 1
        };
        this.opts = _.extend(this.defaults, options);
        this.spawned = 0;
        this.entities = [];
        this.onStageEnts = [];
      }

      Camera.prototype.attach = function(scene) {
        return this.scene = scene;
      };

      Camera.prototype.update = function(tick) {
        var entity, _i, _len, _ref, _results;
        if (!(tick % this.opts.interval) && this.spawned < this.opts.limit) {
          this.spawned = this.emit();
        }
        _ref = this.onStageEnts;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entity = _ref[_i];
          _results.push(this.opts.update(entity, tick));
        }
        return _results;
      };

      Camera.prototype.emit = function() {
        return this.spawned = this.opts.emit(this.scene, this.entities, this.opts.limit, this.spawned, this.onStageEnts);
      };

      Camera.prototype.addToPool = function(entity) {
        return this.entities.push(entity);
      };

      return Camera;

    })();
    return Camera;
  });

}).call(this);
