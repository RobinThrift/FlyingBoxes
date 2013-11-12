define ["babylon", "KeyboardJS/keyboard", "c/bits"], (BABYLON, KeyboardJS, Bits) ->


    class Stage

        constructor: (@containerID) ->
            @canvas = document.getElementById containerID

            @engine = new BABYLON.Engine(@canvas, true)

            @scene = new BABYLON.Scene(@engine)

            @entities = []
            @camera = null
            @lights = []
            @spawners = []
            @tick = 0


        height: () ->
            @canvas.height

        width: () ->
            @canvas.width

        uniqueID: () ->
            Bits.ramdomStr()

        loop: () ->
            @engine.runRenderLoop () =>

                activeKeys = KeyboardJS.activeKeys()

                for entity in @entities
                    entity.update(@tick, activeKeys)

                for light in @lights
                    light.update(light)

                for spawner in @spawners
                    spawner.update(@tick)

                @camera.update()



                @scene.render()

                @tick++


        addCamera: (camera) ->
            camera.attach @scene, @canvas
            @camera = camera

        addLight: (light) ->
            light.attach @scene
            @lights.push light

        addEntity: (entity) ->
            entity.attach @scene
            @entities.push entity

        addSpawner: (spawner) ->
            spawner.attach @scene
            @spawners.push spawner


    return Stage