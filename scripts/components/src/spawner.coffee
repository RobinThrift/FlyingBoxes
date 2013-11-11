define ["babylon", "c/bentity"], (BABYLON, BEntity) ->


    class Camera

        constructor: (options = {}) ->

            @defaults = {
                pos: [0, 0, 0]
            }

            @opts = _.extend @defaults, options

            @entities


        attach: (scene) ->
        


        emit: (scene) ->



    return Camera