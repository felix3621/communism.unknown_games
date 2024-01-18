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
    #PartyScreen {
        position: fixed;
        top: -100%;
        left: 0;
        right: 0;
        bottom: calc(100% + 10px);
        background-image: url(/images/backgrounds/DungeonBricks.png);
        pointer-events: none;
        background-size: contain;
        transition: top 2s ease, bottom 2s ease;
        outline: 10px black solid;
    }
    #Logo {
        position: fixed;
        top: 50%;
        left: 50%;
        height: 75%;
        transform: translate(-50%,-50%);
        animation: LogoMove 2s ease 1s;
        animation-fill-mode: forwards;
        filter: drop-shadow(2mm 2mm 1mm rgba(0,0,0,0.5));
        pointer-events: none;
    }
    @keyframes LogoMove {
        0% {
            top: 50%;
            left: 50%;
        }
        100% {
            top: 0%;
            left: 50%;
            height: 15%;
            transform: translate(-50%,0);
        }
    }
    #FindPartyPanel {
        position: fixed;
        bottom: 0;
        left: 0;
    }
    #FindPartyPanel button {
        font-size: 25px;
        background-color: black;
        color: white;
        padding: 5px 10px 0 10px;
        outline: 2px gray solid;
        border-radius: 25px 25px 0 0;
        filter: drop-shadow(2mm 2mm 1mm black);
    }
    #FindPartyPanel button:hover {
        font-size: 30px;
    }
    #ChangeLogTitle {
        position: fixed;
        left: 75%;
        width: fit-content;
        top: calc(10% - 20px);
        transform: translate(-50%,-50%);
        filter: drop-shadow(2mm 2mm 1mm black);
    }
    #ChangeLog {
        position: fixed;
        top: 50%;
        left: 75%;
        height: calc(75% - 25px);
        width: 45%;
        transform: translate(-50%,-50%);
        background-color: rgb(50, 50, 50);
        outline: 5px black solid;
        border-radius: 25px;
        filter: drop-shadow(2mm 2mm 1mm black);
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 10px;
    }
    :global(#ChangeLog h1, #ChangeLog p) {
        width: fit-content;
        margin: 0;
    }
    :global(.SnowFlake) {
        width: 25px;
        aspect-ratio: 1/1;
        background-image: url(/images/assets/Smoke.png);
        position: absolute;
        top: -25px;
        background-size: cover;
        pointer-events: none;
    }
    #FadeOut {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        background-color: black;
        animation: FadeOut 1s ease 1.5s;
        animation-fill-mode: forwards;
        filter: opacity(1);
    }
    @keyframes FadeOut {
        0% {
            filter: opacity(1);
        } 
        100% {
            filter: opacity(0);
        }
    }
    #SelectCharacter {
        position: absolute;
        top: 50%;
        left: 50%;
        width: fit-content;
        height: fit-content;
        max-height: 25%;
        max-width: 50%;
        transform: translate(-50%,-50%);
        background-color: rgb(50, 50, 50);
        outline: 5px black solid;
        filter: drop-shadow(2mm 2mm 1mm black);
        padding: 5px;
        border-radius: 25px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

    }
    :global(.Character) {
        aspect-ratio: 1/1;
        background-size: cover;
        width: 75px;
        position: relative;
        pointer-events: all;
        margin: 10px;
        outline: 7.5px black solid;
        background-color: rgb(25, 25, 25);
        border-radius: 25px;
    }
    :global(.Character:hover) {
        filter: opacity(0.5);
    }
    :global(.Character img) {
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 100%;
        position: absolute;
    }
    @keyframes Rotate {
        0% {
            transform: translate(-50%,-50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%,-50%) rotate(360deg);
        }
    }
    :global(.RotateOnHover:hover) {
        animation: Rotate 3s infinite linear;
    }
</style>
<div id="Bricks"></div>
<div id="FrostBackground"></div>
<div id="FindPartyPanel">
    <button>Quick Party</button>
    <button on:click={()=>{MoveBackgroundIn()}}>Private Party</button>
    <button>Find Party</button>
</div>
<h1 id="ChangeLogTitle">Change Log</h1>
<div id="ChangeLog">
    <h1>0.1 Added A Party System</h1>
    <p>We made the Main Page</p>
</div>
<div id="PartyScreen">
    <div id="SelectCharacter">
        <div class="Character">
            <img src="/images/characters/bob/Wheel.png" class="RotateOnHover">
            <img src="/images/characters/bob/Face.png" style="height:60%;pointer-events: none;">
        </div>
        <div class="Character">
            <img src="/images/characters/bob/RedWheel.png" class="RotateOnHover">
            <img src="/images/characters/bob/RedFace.png" style="height:60%;pointer-events: none;">
        </div>
        <div class="Character">
            <img src="/images/characters/felix.png">
        </div>
        <div class="Character">
            <img src="/images/characters/FixFox.png">
        </div>
        <div class="Character">
            <img src="/images/characters/PirateSlime.png">
        </div>
        <div class="Character">
            <img src="/images/characters/PurpleSlime.png">
        </div>
        <div class="Character">
            <img src="/images/characters/Ian.png">
        </div>
        <div class="Character">
            <img src="/images/characters/Svæin.png">
        </div>
    </div>
</div>
<div id="FadeOut"></div>
<img id="Logo" src="/images/logo.png">
<script>
    import { onMount } from "svelte";
    onMount(async() => {
        let user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        });
        if (!user.ok) {
            window.location.href = "/login";
        } 
        AnimationLoop();
    });

    function MoveBackgroundIn() {
        document.getElementById("PartyScreen").style.top = 0;
        document.getElementById("PartyScreen").style.bottom = 0;
    }
    // Animation Loop
    let MovingElements = new Array();
    let ScrollSpeed = 40;
    let lastFrameTime = performance.now();
    // Spawn Elements
    let Snow = true;
    let SnowNextSpawn = 0;
    function AnimationLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime)/1000;
        lastFrameTime = currentTime;

        if (Snow) {
            if (SnowNextSpawn<=0) {
                SnowNextSpawn = Math.random()*0.5;
                let SnowFlake = document.createElement("div");
                SnowFlake.classList.add("SnowFlake");
                document.getElementById("FrostBackground").appendChild(SnowFlake);
                MovingElements.push({Element:SnowFlake,Speed:100})
                SnowFlake.style.left = (Math.random() * document.body.offsetWidth) + "px";
            } else {
                SnowNextSpawn -= deltaTime;
            }
        }

        for (let i = 0; i < MovingElements.length; i++) {
            const CurrentElement = MovingElements[i].Element;
            if (CurrentElement) {
                let ComputedStyle = window.getComputedStyle(CurrentElement);
                CurrentElement.style.top = (parseFloat(ComputedStyle.top) != null ? parseFloat(ComputedStyle.top):0) + MovingElements[i].Speed*deltaTime + "px";
                if (parseFloat(ComputedStyle.top)-CurrentElement.offsetHeight>=document.getElementById("Bricks").offsetHeight) {
                    CurrentElement.remove();
                }
            } else {
                MovingElements.splice(i,1);
                i--;
            }
        }

        requestAnimationFrame(AnimationLoop);
    }
</script>