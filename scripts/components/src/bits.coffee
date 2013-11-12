define ["babylon", "lodash"], (BABYLON, _) ->

    Bits = {
        randomStr: () ->
            Math.random().toString(36).substring(7)

        randInt: (min, max) ->
            Math.floor(Math.random() * (max - min) + min)

        rgbToFloat: (rgbVal) ->
            factor = 0.003921569
            rgbVal*factor

        rgbToFloatObj: (r, g, b) ->
            factor = 0.003921569
            return {
                r: r*factor
                g: g*factor
                b: b*factor
            }
    }



    return Bits