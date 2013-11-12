define ["babylon", "lodash"], (BABYLON, _) ->

    class BEntity

        constructor: (@name, @type, options = {}, @controls = {}) ->

            @defaults = {
                size: 1.0
                pos: [0, 0, 0]
                Xscaling: 1
                Yscaling: 1
                Zscaling: 1
                colour: {
                    r: 0
                    g: 0
                    b: 0
                }
                specularColour: {
                    r: 1
                    g: 1
                    b: 1
                }
                specularPower: 64
                animate: (tick) ->

            }

            @opts = _.extend @defaults, options


        attach: (scene) ->
            switch @type
                when "box"
                    @mesh = BABYLON.Mesh.CreateBox @name, @opts.size, scene
                when "plane"
                    @mesh = BABYLON.Mesh.CreatePlane @name, @opts.size, scene


            @mesh.scaling.x = @opts.Xscaling
            @mesh.scaling.y = @opts.Yscaling
            @mesh.scaling.z = @opts.Zscaling

            @setPosition @opts.pos[0], @opts.pos[1], @opts.pos[2]

            @material = new BABYLON.StandardMaterial "#{@name}-material", scene

            @material.diffuseColor = new BABYLON.Color3 @opts.colour.r, @opts.colour.g, @opts.colour.b
            @material.specularColour = new BABYLON.Color3 @opts.colour.r, @opts.colour.g, @opts.colour.b
            @material.specularPower = @opts.specularPower

            @mesh.material = @material


        update: (tick, activeKeys = []) ->
            @checkControls activeKeys
            @animate tick



        animate: (tick) ->
            @opts.animate this, tick

        checkControls: (activeKeys) ->
            _.each @controls, (fn, key) ->
                if activeKeys.indexOf(key) != -1 then fn()




        


        setPosition: (x = 0, y = 0, z = 0) ->
            @mesh.position = new BABYLON.Vector3 x, y, z

        move: (x = 0, y = 0, z = 0) ->
            @mesh.position.addInPlace new BABYLON.Vector3 x, y, z

        getPosition: () ->
            @mesh.position

        getX: () ->
            @mesh.position.x

        getY: () ->
            @mesh.position.y

        getZ: () ->
            @mesh.position.z


        destroy: () ->
            @mesh.dispose()

    return BEntity