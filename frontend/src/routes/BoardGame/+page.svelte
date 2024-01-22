<style>
#Bricks {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(/images/backgrounds/DungeonBricks.png);
        background-size: contain;
        pointer-events: none;
    }
    #FrostBackground {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(/images/backgrounds/Ice.png);
        background-size: contain;
        filter: opacity(0.8) brightness(0.8);
        background-size: 700px;
        background-repeat:round;
        pointer-events: none;
    }
    :global(#Map) {
        position: fixed;
        top: 40%;
        left: 40%;
        width: fit-content;
        height: fit-content;
    }
    :global(.MapPoints) {
        position: absolute;
        width: 50px;
        aspect-ratio: 1/1;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
        outline: 2px black solid;
    }
    :global(.MapPath) {
        position: absolute;
        height: 25px;
        background-color: black;
        transform: translate(-50%,-50%);
        z-index: 1;
    }
</style>
<div id="Bricks"></div>
<div id="FrostBackground"></div>
<div id="Map">

</div>
<script>
    import { onMount } from "svelte";
    var MapScaleFactor = 1;

    var BordGameMapPoints = [
        {x:0,y:0, Type:"Safe"},
        {x:1,y:0, Type:"Bonus"},
        {x:2,y:0, Type:"MiniGame"},
        {x:3,y:0, Type:"Unsafe"},
        {x:4,y:0, Type:"Safe"},
        {x:5,y:0, Type:"Safe"},
        {x:6,y:0, Type:"MiniGame"},
        {x:7,y:0, Type:"MiniGame"},
        {x:8,y:0, Type:"Bonus"},
        {x:9,y:0, Type:"Bonus"},
        {x:10,y:0, Type:"Safe"},
        {x:10,y:1, Type:"Unsafe"},
        {x:9,y:1, Type:"Bonus"},
        {x:8,y:1, Type:"Safe"},
        {x:7,y:1, Type:"Safe"},
        {x:6,y:1, Type:"Bonus"},
        {x:5,y:1, Type:"MiniGame"},
    ]
    
    onMount(async() => {
        GenerateMap(BordGameMapPoints);
    });

    function GenerateMap(MapPoints) {
        var Map = document.getElementById("Map");
        Map.innerHTML = "";

        for (let i = 0; i < MapPoints.length; i++) {
            let MapPoint = document.createElement("div");
            MapPoint.style.top = (MapPoints[i].y*100*MapScaleFactor)+(50*MapScaleFactor) + "px";
            MapPoint.style.left = (MapPoints[i].x*100*MapScaleFactor)+(50*MapScaleFactor) + "px";
            MapPoint.classList.add("MapPoints");
            MapPoint.style.width = 50 * MapScaleFactor + "px";

            if (MapPoints[i].Type && MapPoints[i].Type == "Safe") {
                MapPoint.style.backgroundColor = "rgb(0,255,0)"
            }
            if (MapPoints[i].Type && MapPoints[i].Type == "Bonus") {
                MapPoint.style.backgroundColor = "rgb(0,255,255)"
            }
            if (MapPoints[i].Type && MapPoints[i].Type == "MiniGame") {
                MapPoint.style.backgroundColor = "rgb(255,150,0)"
            }
            if (MapPoints[i].Type && MapPoints[i].Type == "Unsafe") {
                MapPoint.style.backgroundColor = "rgb(255,0,0)"
            }

            if (parseFloat(window.getComputedStyle(Map).width)<(MapPoints[i].x*100*MapScaleFactor)+(100*MapScaleFactor)) {
                Map.style.width = (MapPoints[i].x*100*MapScaleFactor)+(100*MapScaleFactor) + "px";
            }
            if (parseFloat(window.getComputedStyle(Map).height)<(MapPoints[i].y*100*MapScaleFactor)+(100*MapScaleFactor)) {
                Map.style.height = (MapPoints[i].y*100*MapScaleFactor)+(100*MapScaleFactor) + "px";
            }

            if (i>0) {
                let Path = document.createElement("div");
                Path.classList.add("MapPath");
                Path.style.top = (MapPoints[i-1].y + ((MapPoints[i].y-MapPoints[i-1].y)/2))*100*MapScaleFactor+(50*MapScaleFactor) + "px";
                Path.style.left = (MapPoints[i-1].x + ((MapPoints[i].x-MapPoints[i-1].x)/2))*100*MapScaleFactor+(50*MapScaleFactor) + "px";
                Path.style.height = 25*MapScaleFactor + "px";
                let angle = calculateAngle(MapPoints[i-1].x, MapPoints[i-1].y, MapPoints[i].x, MapPoints[i].y)
                var degrees = angle * (180 / Math.PI);
                Path.style.width = (calculateDistance(MapPoints[i-1].x, MapPoints[i-1].y, MapPoints[i].x, MapPoints[i].y)*100)*MapScaleFactor + "px";
                Path.style.transform = "translate(-50%,-50%) rotate("+degrees+"deg)";
                Map.appendChild(Path);
            }

            Map.appendChild(MapPoint);
        }
    }
    function calculateAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }
    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
</script>