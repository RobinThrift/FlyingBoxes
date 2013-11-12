define ["lodash", "babylon"], (_, BABYLON) ->


    class GUI

        constructor: (@name, options = {}) ->

            @defaults = {
                type: "text"
                pos: "left"
                colour: "#f0f0f0"
                x: 0
                y: 0
                width: 100
                height: 100
            }

            @opts = _.extend @defaults, options


        update: () ->


        attach: () ->


    return GUI