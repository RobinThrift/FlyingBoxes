define ["babylon"], (BABYLON) ->


    class Camera

        constructor: (@name, @type, options = {}) ->

            @defaults = {
                controls: true
                pos: [0, 0, 0]
            }

            @opts = _.extend @defaults, options


        attach: (scene, canvas) ->
            switch @type
                when "free"
                    @cam = new BABYLON.FreeCamera @name, new BABYLON.Vector3(@opts.pos[0], @opts.pos[1], @opts.pos[2]), scene

            if @opts.controls
                scene.activeCamera.attachControl canvas
            else
                @cam.detachControl canvas


        setPosition: (x = 0, y = 0, z = 0) ->
            @mesh.position = new BABYLON.Vector3 x, y, z

        move: (x = 0, y = 0, z = 0) ->
            @mesh.position.addInPlace new BABYLON.Vector3 x, y, z

    return Camera