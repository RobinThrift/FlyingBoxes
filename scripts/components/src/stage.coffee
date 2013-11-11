define ["babylon", "KeyboardJS/keyboard", "c/bits"], (BABYLON, KeyboardJS, Bits) ->


    class Stage

        constructor: (@containerID) ->
            @canvas = document.getElementById containerID

            @engine = new BABYLON.Engine(@canvas, true)

            @scene = new BABYLON.Scene(@engine)

            @entities = []
            @camera = null
            @lights = []


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
                    entity.update(0, activeKeys)

                @scene.render()


        addCamera: (camera) ->
            camera.attach @scene, @canvas
            @camera = camera

        addLight: (light) ->
            light.attach @scene
            @lights.push light

        addEntity: (entity) ->
            entity.attach @scene
            @entities.push entity


    return Stage