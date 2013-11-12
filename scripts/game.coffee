requirejs.config {
    baseUrl: "/scripts/vendor"
    paths: {
        c: "../components"
        babylon: "babylon.1.6.0"
    }
    shim: {
        "lodash": {
            exports: "_"
        }
        "KeyboardJS/keyboard.js": {
            exports: "KeyboardJS"
        }
        "babylon": {
            exports: "BABYLON"
            deps: ["hand-1.1.3"]
        }
        "zepto": {
            exports: "$"
        }
    }
}


requirejs [
        "babylon", 
        "KeyboardJS/keyboard", 
        "zepto", 
        "lodash",
        "c/bits",
        "c/stage",
        "c/camera",
        "c/light",
        "c/spawner",
        "c/bentity",
        "c/gui/bar"
    ], (BABYLON, KeyboardJS, $, _, Bits, Stage, Camera, Light, Spawner, BEntity, BarGUI) ->


        LEFT_BOUND = 5
        RIGHT_BOUND = 5

        life1 = 100
        collision1 = () ->
            life1 -= 1
            if life1 <= 0
                life1 = 100
            p1LifeBar.update(life1 + "%")

        life2 = 100
        collision2 = () ->
            life2 -= 1
            if life2 <= 0
                life2 = 100
            p2LifeBar.update(life2 + "%")
        
        p1LifeBar = new BarGUI "player1LifeBar", {
            x: 10
            y: 10
            colour: "red"
            pos: "right"
            height: "35px"
            width: "200px"
        }
        p1LifeBar.attach()

        p2LifeBar = new BarGUI "player2LifeBar", {
            x: 10
            y: 10
            colour: "green"
            pos: "left"
            height: "35px"
            width: "200px"
        }
        p2LifeBar.attach()


        # first, set up the stage
        stage = new Stage("screen")

        player = new BEntity "player", "box", 
            {
                size: 0.4,
                pos: [1, -3.5, 0]
                Zscaling: 0.3
                Xscaling: 2
                Yscaling: 1.1
                colour: {
                    r: 1
                    g: 0
                    b: 0.23
                }
            }, 
            {
                "left": () ->
                    if player.getPosition().x > -LEFT_BOUND
                        player.move(-0.2)
                "right": () ->
                    if player.getPosition().x < RIGHT_BOUND
                        player.move(0.2)
            }

            player2 = new BEntity "player2", "box", 
            {
                size: 0.4,
                pos: [-1, -3.5, 0]
                Zscaling: 0.3
                Xscaling: 2
                Yscaling: 1.1
                colour: {
                    r: 0.1
                    g: 1
                    b: 0.1
                }
            }, 
            {
                "a": () ->
                    if player2.getPosition().x > -LEFT_BOUND
                        player2.move(-0.2)
                "d": () ->
                    if player2.getPosition().x < RIGHT_BOUND
                        player2.move(0.2)
            }


            bgPlane = new BEntity "bgPlane", "plane", {
                size: 100
                pos: [0, 0, 20]
                specularColour: {
                    r: 1
                    g: 0
                    b: 0.23
                }
                colour: {
                    r: 1
                    g: 0.4
                    b: .1
                }
            }



        mainCam = new Camera "mainCam", "free", {
            pos: [0, 0, -10],
            controls: false
        }

        mainLight = new Light "hemi", "mainLight", {
            pos: [0, 0, 0]
            # colour: Bits.rgbToFloatObj(255, 255, 255)
            colour: Bits.rgbToFloatObj(144, 202, 97)
        }

        spot1 = new Light "spot", "spot1", {
            pos: [-3, -2, -2]
            to: [0, -1.5, 2]
            debug: false
            angle: 10
            decay: 1
            colour: Bits.rgbToFloatObj(221, 24, 52)
        }

        spot1.dirX = 2.5

        spot1.update = (self) -> 

            if self.light.position.x > 40
                self.dirX = -2.5
            else if self.light.position.x < -40
                self.dirX = 2.5
        

            self.light.position.addInPlace new BABYLON.Vector3(self.dirX, 0, 0)



        spot2 = new Light "spot", "spot2", {
            pos: [0, -2, -2]
            to: [0, -1.5, 2]
            debug: false
            angle: 10
            decay: 10
            colour: Bits.rgbToFloatObj(255, 0, 255)
        }

        spot3 = new Light "spot", "spot3", {
            pos: [3, -2, -2]
            to: [0, -1.5, 2]
            debug: false
            angle: 10
            decay: 10
            colour: Bits.rgbToFloatObj(0, 0, 255)
        }

        eSpawner = new Spawner {
            limit: 200
            interval: 30
            emit: (scene, enities, limit, spawned, onStageEnts) ->
                for e in enities
                    if (spawned < limit)
                        _e = new BEntity "b", e.type, e
                        onStageEnts.push _e
                        stage.addEntity _e
                        x = Bits.randInt(0, 3)
                        x = -x unless Math.random() > 0.5
                        _e.setPosition x, 10, 0
                        spawned++

                return spawned

            update: (e, tick) ->

                if player.mesh.intersectsMesh e.mesh, false
                    collision1()

                if player2.mesh.intersectsMesh e.mesh, false
                    collision2()

                e.mesh.rotation.addInPlace new BABYLON.Vector3(-0.1, -0.1, -.01)
                if e.getPosition().y > -8
                    e.move 0, -.15, 0
                else
                    x = Bits.randInt(0, 10)
                    x = -x unless Math.random() > 0.5
                    e.setPosition x, 10, 0
        } 

        eSpawner.addToPool {
            type: "box"
            size: 0.2,
            pos: [0, 0, 0]
            Zscaling: 1
            Xscaling: 1
            Yscaling: 1
            colour: {
                r: 0.1
                g: 0.23
                b: 1
            }
        }

        stage.addSpawner eSpawner

        stage.addCamera mainCam

        stage.addLight mainLight
        stage.addLight spot1
        stage.addLight spot2
        stage.addLight spot3

        stage.addEntity player
        stage.addEntity player2
        stage.addEntity bgPlane

        stage.loop()

