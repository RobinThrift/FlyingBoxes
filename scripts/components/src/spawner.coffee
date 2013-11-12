define ["lodash", "babylon", "c/bentity"], (_, BABYLON, BEntity) ->


    class Spawner

        constructor: (options = {}) ->

            @defaults = {
                pos: [0, 0, 0],
                emit: (scene, entities, limit) ->
                limit: 1
                interval: 1
            }

            @opts = _.extend @defaults, options

            @spawned = 0

            @entities = []

            @onStageEnts = []


        attach: (scene) ->
            @scene = scene

        update: (tick) ->
            if not (tick % @opts.interval) and @spawned < @opts.limit
                @spawned = @emit()

            for entity in @onStageEnts
                     @opts.update entity, tick

        emit: () ->
            @spawned = @opts.emit @scene, @entities, @opts.limit, @spawned, @onStageEnts

        addToPool: (entity) ->
            @entities.push entity

    return Spawner