define(["babylon", "lodash"], function(BABYLON, _) {
  var Bits;
  Bits = {
    randomStr: function() {
      return Math.random().toString(36).substring(7);
    },
    rgbToFloat: function(rgbVal) {
      var factor;
      factor = 0.003921569;
      return rgbVal * factor;
    },
    rgbToFloatObj: function(r, g, b) {
      var factor;
      factor = 0.003921569;
      return {
        r: r * factor,
        g: g * factor,
        b: b * factor
      };
    }
  };
  return Bits;
});
