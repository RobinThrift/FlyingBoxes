

activeKeys = KeyboardJS.activeKeys()

isPressed = (key) ->
    activeKeys.indexOf key 


canvas = document.getElementById "screen"

engine = new BABYLON.Engine(canvas, true)



scene = new BABYLON.Scene(engine);

cam = new BABYLON.FreeCamera "FreeCamera", new BABYLON.Vector3(0, 0, -20), scene

cam.detachControl(canvas)

player = BABYLON.Mesh.CreatePlane "Player", 1.0, scene
player.position = new BABYLON.Vector3 0, -6, 0


# scene.activeCamera.attachControl canvas;

bgLight = new BABYLON.HemisphericLight "BGLight", new BABYLON.Vector3(0, 1, 0), scene;
bgLight.diffuse = new BABYLON.Color3 1, 1, 1;
bgLight.specular = new BABYLON.Color3 1, 1, 1;
bgLight.groundColor = new BABYLON.Color3 0, 0, 0;

newDirect = (name, pos, colour) ->
    light = new BABYLON.DirectionalLight name, new BABYLON.Vector3(pos.x, pos.y, pos.z), scene;
    light.diffuse = new BABYLON.Color3 colour.r, colour.g, colour.b
    light.specular = new BABYLON.Color3 1, 1, 1

newOmni = (name, pos, colour) ->
    light = new BABYLON.PointLight name, new BABYLON.Vector3(pos.x, pos.y, pos.z), scene;
    light.diffuse = new BABYLON.Color3 colour.r, colour.g, colour.b
    light.specular = new BABYLON.Color3 0.5, 0.5, 0.5


newSpot = (name, from, to, angle, decay, colour) ->
    light = new BABYLON.SpotLight name, new BABYLON.Vector3(from.x, from.y, from.z), new BABYLON.Vector3(to.x, to.y, to.z), angle, decay, scene
    light.diffuse = new BABYLON.Color3 colour.r, colour.g, colour.b
    light.specular = new BABYLON.Color3 0.5, 0.5, 0.5


# newOmni "BG", { x: 0, y: 0, z: -10 }, { r: 1, g: 1, b: 1 }

# newDirect "1",

newSpot(
    "spot1",
    {
        x: 0
        y: -1
        z: -10
    },
    {
        x: 0
        y: 0
        z: 0
    },
    0.2,
    2,
    { 
        r: 1 
        g: 0
        b: 0 
    }
)




doControls = () ->

    if isPressed("right") != -1 
        # console.log("going right");
        player.position.addInPlace new BABYLON.Vector3(0.3, 0, 0)
    else if isPressed("left") != -1 
        # console.log("going left");
        player.position.addInPlace new BABYLON.Vector3(-0.3, 0, 0)
    else if isPressed("up") != -1 && player.position.z == 3
        # console.log("going left");
        player.position.addInPlace new BABYLON.Vector3(0, 0, -3)
    else if isPressed("down") != -1 &&  player.position.z != 3
        # console.log("going left");
        player.position.addInPlace new BABYLON.Vector3(0, 0, 3)



$lbic = $ "#indicator"
life = 100
numBoxes = 100
life += numBoxes

collision = () ->
    life -= 1
    $lbic.width "#{life}%"
    if !life 
        # alert "Game over du n00b"
        life = 100


boxes = []

emit = (num) ->
    for i in [0...num]
        boxes.push newBox("Emit#{i}")


newBox = (name) ->
    x = Math.floor(Math.random()*15)
    x =  -x unless Math.random() > 0.5

    z = if Math.random() > 0.5 then -3 else 3

    y = Math.floor(Math.random()*10)+10

    v = Math.random()*0.3+0.05

    box = BABYLON.Mesh.CreateBox name, 1.0, scene
    box.position = new BABYLON.Vector3 x, y, z
    box.rotation = new BABYLON.Vector3 0, 0, 0

    return () ->
        x = Math.floor(Math.random()*15);
        x =  -x unless Math.random() > 0.5

        y = Math.floor(Math.random()*10)+10;

        if player.intersectsMesh box, false
            collision()

        box.position.addInPlace new BABYLON.Vector3(0, -v, 0)
        box.rotation.addInPlace new BABYLON.Vector3(0.1, -0.1, 0)
        if box.position.y < -20
            v = Math.random()*0.3+0.05
            z =  Math.random() > 0.5 ? -3 : 3
            box.position = new BABYLON.Vector3 x, y, z

emit numBoxes


hugeBGBox = BABYLON.Mesh.CreateBox "BG", 1000.0, scene
hugeBGBox.position = new BABYLON.Vector3 0, 0, 1000
# hugeBGBox.rotation = new BABYLON.Vector3 0, -8, 0.5



engine.runRenderLoop () ->

    activeKeys = KeyboardJS.activeKeys()

    hugeBGBox.rotation.addInPlace new BABYLON.Vector3(0.01, -0.01, -0.1 / life/100)


    doControls()

    boxes.forEach (box) ->
        box()

    scene.render()

