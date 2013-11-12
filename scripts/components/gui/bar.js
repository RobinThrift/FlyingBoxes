(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["lodash", "babylon", "c/gui", "zepto"], function(_, BABYLON, GUI, $) {
    var BarGUI, _ref;
    BarGUI = (function(_super) {
      __extends(BarGUI, _super);

      function BarGUI() {
        _ref = BarGUI.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BarGUI.prototype.update = function(val) {
        return this.bar.width(val);
      };

      BarGUI.prototype.attach = function() {
        this.wrapper = $("<div class='barGUI' id='" + this.name + "' />");
        this.styles = {
          top: this.opts.y,
          width: this.opts.width,
          height: this.opts.height
        };
        this.styles[this.opts.pos] = this.opts.x;
        console.log(this.styles);
        this.wrapper.css(this.styles);
        this.bar = $("<div class='barGUI__indicator' />");
        this.bar.css("background", this.opts.colour);
        this.wrapper.append(this.bar);
        return $("body").append(this.wrapper);
      };

      return BarGUI;

    })(GUI);
    return BarGUI;
  });

}).call(this);
