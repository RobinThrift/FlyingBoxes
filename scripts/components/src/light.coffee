define ["babylon"], (BABYLON) ->


    class Light

        constructor: (@type, @name, options = {}) ->

            @defaults = {
                pos: [0, 0, 0]
                to: [0, 0, 0]
                angle: 0.8
                decay: 15
                colour: {
                    r: 1
                    g: 1
                    b: 1
                }
                diffuse: false
                groundColor: false
                debug: false
                enabled: true
            }

            @opts = _.extend @defaults, options

            unless @opts.diffuse then @opts.diffuse = @opts.colour
            unless @opts.groundColor then @opts.groundColor = @opts.colour

        attach: (scene) ->

            x = @opts.pos[0]
            y = @opts.pos[1]
            z = @opts.pos[2]

            switch @type
                when "spot"
                    @light = new BABYLON.SpotLight @name, new BABYLON.Vector3(x, y, z), new BABYLON.Vector3(@opts.to[0], @opts.to[1], @opts.to[2]), @opts.angle, @opts.decay, scene
                when "direct"
                    @light = new BABYLON.DirectionalLight @name, new BABYLON.Vector3(x, y, z), scene
                when "point"
                    @light = new BABYLON.DirectionalLight @name, new BABYLON.Vector3(x, y, z), scene
                when "hemi"
                    @light = new BABYLON.HemisphericLight @name, new BABYLON.Vector3(x, y, z), scene

            @light.isEnabled @opts.enabled

            if @opts.debug
                @debugBox = BABYLON.Mesh.CreateSphere "#{@name}-DEBUG-BOX", 10, 0.3, scene
                if @type == "direct"
                    x = -x
                    y = -y
                    z = -z
                @debugBox.position = new BABYLON.Vector3(x, y, z)

            
            @light.specular = new BABYLON.Color3 @opts.colour.r, @opts.colour.g, @opts.colour.b
            @light.diffuse = new BABYLON.Color3 @opts.diffuse.r, @opts.diffuse.g, @opts.diffuse.b

            if @type == "hemi" then @light.groundColor = new BABYLON.Color3 @opts.groundColor.r, @opts.groundColor.g, @opts.groundColor.b


    return Light