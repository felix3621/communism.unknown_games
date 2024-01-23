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
        background-size: 100%;
        transition: top 2s ease, bottom 2s ease, background-position-x 2s ease, transform 2s ease;
        transform-origin: center;
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
        overflow: hidden;
        padding: 10px;
        padding-right: 0px;
    }
    #ChangeLog > * {
        overflow-y: auto;
        height: 100%;
    }
    #ChangeLog > *::-webkit-scrollbar {
        border-radius: 25px;
        background-color: rgb(25, 25, 25);
        outline: 2px black solid;
    }
    #ChangeLog > *::-webkit-scrollbar-thumb {
        border-radius: 25px;
        background-color: rgb(75, 75, 75);
        outline: 2px black solid;

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
        left: 150%;
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
        transition: left 2s ease;

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
    #RightButton {
        position: absolute;
        bottom: 0;
        right: 0;
        pointer-events: all;
    }
    #LeftButton {
        position: absolute;
        bottom: 0;
        left: 0;
        pointer-events: all;
    }
    :global(#ChangeLog h2) {
        margin: 0;
    }
    :global(#ChangeLog ul) {
        margin: 0;
    }
    :global(#ChangeLog > * > div) {
        margin-bottom: 5%;
    }
    #Door {
        position: absolute;
        top: 60%;
        left: 350%;
        height: 75%;
        transform: translate(-50%,-50%);
        aspect-ratio: 419/508;
        transition: transform 2s ease 2s, filter 2s ease 3s, left 2s ease;
        pointer-events: none;
    }
    #DoorFrame {
        position: absolute;
        height: 100%;
        filter: drop-shadow(5mm 5mm 5mm black);
    }
    #DoorFill {
        position: absolute;
        top: 5%;
        bottom: 4%;
        left: 5%;
        right: 5%;
        background-color: white;
        border-radius: 50% 50% 0 0;
    }
    #LeftDoor {
        position: absolute;
        height: 85.4%;
        left: 11.7%;
        top: 9%;
        transition: transform 2s ease;
    }
    #RightDoor {
        position: absolute;
        height: 85.4%;
        right: 12%;
        top: 9%;
        transition: transform 2s ease;
    }
    #LeaveParty {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,0);
    }
    #PartyList {
        position: absolute;
        top: 25%;
        bottom: 25%;
        left: 0;
        width: 10%;
        max-width: 200px;
        background-color: rgb(25, 25, 25);
        outline: 5px black solid;
        padding: 5px 2px 5px 5px;
        border-radius: 0 25px 25px 0;
    }
    :global(.PlayerDisplay) {
        height: 50px;
        max-height: 20%;
        border-radius: 50%;
    }
    :global(.PlayerDisplay > div) {
        height: 100%;
        aspect-ratio: 1/1;
        float: left;
    }
    :global(.PlayerDisplay > h1) {
        width: fit-content;
        margin: 0;
        font-size: small;
        float:left;
    }
    #FindParty {
        position: absolute;
        left: -150%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgb(50, 50, 50);
        outline: 5px black solid;
        padding: 15px;
        transition: left 2s ease;
        text-align: center;
        border-radius: 25px;
        filter: drop-shadow(5mm 5mm 5mm black);
    }
    :global(input) {
        background-color: black;
        color: white;
        padding: 5px 10px 0 10px;
        outline: 2px gray solid;
        color: white;
    }
    :global(button) {
        background-color: black;
        color: white;
        padding: 5px 10px 0 10px;
        outline: 2px gray solid;
        color: white;
    }
    #gameCode {
    }
</style>
<div id="Bricks"></div>
<div id="FrostBackground"></div>
<div id="FindPartyPanel">
    <button on:click={()=>{PartyMode="quickPlay"; OpenPartyScreen()}}>Quick Party</button>
    <button on:click={()=>{PartyMode="private"; OpenPartyScreen()}}>Private Party</button>
    <button on:click={()=>{PartyMode="FindParty"; OpenPartyScreen()}}>Find Party</button>
</div>
<h1 id="ChangeLogTitle">Change Log</h1>
<div id="ChangeLog">
    <div id="LogContainer"></div>
</div>
<div id="PartyScreen">
    <div id="gameCode"></div>
    <div id="FindParty">
        <h1>Find Party</h1>
        <p id="FindPartyError" style="color: red;"></p>
        <input id="FindPartyCode" type="text" placeholder="Party Code..." style="font-size: 20px;">
        <button style="font-size: 20px;" on:click={()=>{FindParty()}}>Find</button>
    </div>
    <div id="Door">
        <div id="DoorFill"></div>
        <img id="DoorFrame" src="/images/assets/DoorFrame.png">
        <img id="LeftDoor" src="/images/assets/LeftDoor.png">
        <img id="RightDoor" src="/images/assets/RightDoor.png">
    </div>
    <div id="SelectCharacter"></div>
    <button id="LeaveParty" on:click={()=>{ClosePartyScreen();}}>Leave Party</button>
    <div id="PartyList">
        <div class="PlayerDisplay">
            <div>
            </div>
            <h1>Display Name</h1>
        </div>
    </div>
</div>
<div id="FadeOut"></div>
<img id="Logo" src="/images/logo.png">
<script> 
    import { onMount } from "svelte";
    var Socket = null;
    var MaxPartySize = 4;
    var PartyMode = "";

    function sendOnEnter(event, func) {
        if (event.key === 'Enter') {
            func()
        }
    }
    function FindParty() {
        console.log(document.getElementById('FindPartyCode').value);
        PartyMode = "code/" + document.getElementById('FindPartyCode').value;
        CreatePartySocketConnection();
    }
    // Create The Party Socket Connection
    function CreatePartySocketConnection() {
        Socket = new WebSocket(`wss://${window.location.host}/socket/party/${PartyMode}`);

        Socket.onopen = () => {
            console.log('Connected to server');
        };

        Socket.onmessage = (event) => {
            let message = JSON.parse(event.data);
            if (!message.ping)
                console.log(message);

            // Page Sync
            if (message.PartyPage != null && typeof message.PartyPage == "number") {
                MovePageTo(message.PartyPage);
            }
            // Player Party
            if (message.Players) {
                GeneratePlayerList(message.Players);
            }
            if (message.code) {
                document.getElementById("gameCode").innerText = message.code
            }
        }

        Socket.onclose = (event) => {
            console.log('Connection closed', event);
            if (event.code == 1008) {
                setTimeout(() => {window.location.href = "/"},1000)
            } else if (event.code == 3000) { // if 3000 don't reload

            } else if (event.code == 3001) { // if 3001 no party found 
                Socket = null;
                console.log("Error")
                document.getElementById("FindPartyError").innerHTML = "Failed To Find Party"
            }
             else if (event.code != 3000) { 
                setTimeout(CreatePartySocketConnection, 1000)
            }
        };

        Socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
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
        MovingPartsPage = [
            {
                Element:document.getElementById("SelectCharacter"),
                Page:0
            },
            {
                Element:document.getElementById("Door"),
                Page:3,
                MovingBackground: true
            },
            {
                Element:document.getElementById("FindParty"),
                Page:-1,
                MovingBackground: true,
                ShowParty: false
            }
        ]
        generateChangeLog();
        GenerateCharacters();
        
        AnimationLoop();
        document.getElementById('FindPartyCode').addEventListener("keypress",(e) => sendOnEnter(e, FindParty))
    });
    
    // Animation Loop
    let MovingElements = new Array();
    let ScrollSpeed = 40;
    let BackgroundScroll = false;
    let lastFrameTime = performance.now();
    // Spawn Elements
    let Snow = true;
    let SnowNextSpawn = 0;
    function AnimationLoop() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime)/1000;
        lastFrameTime = currentTime;
        if (BackgroundScroll) {
            let PartyScreen = document.getElementById("PartyScreen");
            let ComputedStyle = window.getComputedStyle(PartyScreen);
            PartyScreen.style.backgroundPositionY = parseFloat(ComputedStyle.backgroundPositionY) + ScrollSpeed * deltaTime + "px";
        }
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
    // Open the Party Screen
    function OpenPartyScreen() {
        document.getElementById("PartyScreen").style.top = 0;
        document.getElementById("PartyScreen").style.bottom = 0;
        document.getElementById("PartyScreen").style.backgroundPositionX = "";
        document.getElementById("SelectCharacter").style.left = "";
        if (PartyMode != "FindParty") {
            console.log(PartyMode);
            MovePageTo(0);
            document.getElementById("PartyList").style.filter = "opacity(1)";
            if (Socket) {
                Socket.close();
                Socket = null;
            }
            CreatePartySocketConnection();
        } else {
            document.getElementById("PartyList").style.filter = "opacity(0)";
            MovePageTo(-1);
        }
        
        GeneratePlayerList(new Array());
    }
    // Close Party Screen
    function ClosePartyScreen() {
        document.getElementById("PartyScreen").style.top = "-100%";
        document.getElementById("PartyScreen").style.bottom = "calc(100% + 10px)";
        if (Socket) {
            Socket.send(JSON.stringify({socket:"close"}));
            Socket.close(3000);
        }
    }
    var CurrentPage = 0;
    var MovingPartsPage;
    // Back One Page
    function MovePartyScreenLeft() {
        MovePageTo(CurrentPage-1);
    }
    // Next Page
    function MovePartyScreenRight() {
        MovePageTo(CurrentPage+1);
    }
    function MovePageTo(index) {
        CurrentPage = index;
        document.getElementById("PartyScreen").style.backgroundPositionX = -document.getElementById("PartyScreen").offsetWidth*index + "px";
        let MoveBackground = false;
        let ShowParty = true;
        for (let i = 0; i < MovingPartsPage.length; i++) {
            if (MovingPartsPage[i].Page==index) {
                MovingPartsPage[i].Element.style.left = "50%";
                if (MovingPartsPage[i].MovingBackground != null) {
                    MoveBackground = MovingPartsPage[i].MovingBackground;
                }
                if (MovingPartsPage[i].ShowParty != null) {
                    ShowParty = MovingPartsPage[i].ShowParty;
                }
            } else
                MovingPartsPage[i].Element.style.left = 50 + (MovingPartsPage[i].Page - index)*100 + "%";
        }
        if (MoveBackground) {
            setTimeout(()=>{BackgroundScroll = true;}, 2000);
            
        } else {
            BackgroundScroll = false;
        }
        if (ShowParty) {
            document.getElementById("PartyList").style.filter = "opacity(1)";
        } else {
            document.getElementById("PartyList").style.filter = "opacity(0)";
        }
    }
    function EnterDoor() {
        BackgroundScroll = false;
        document.getElementById("LeftDoor").style.transform = "translate(-100%,0) scale(-0.85,1)";
        document.getElementById("RightDoor").style.transform = "translate(100%,0) scale(-0.85,1)";

        document.getElementById("Door").style.transform = "translate(-50%,-100%) scale(4,4)";
        document.getElementById("Door").style.filter = "opacity(0)";

        setTimeout(()=>{document.getElementById("PartyScreen").style.transform = "scale(10,10)";},2000);
        setTimeout(()=>{document.getElementById("PartyScreen").style.transform = "";},4000);
    }
    async function generateChangeLog() {
        let changelog = await(await fetch(window.location.origin+'/api/info/changelog', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        })).json()

        var changelogPanel = document.getElementById('LogContainer');

        for (let i = 0; i < changelog.length; i++) {
            let change = document.createElement("div");

            let title = document.createElement("h1");
            title.innerHTML = changelog[i].version + ": " + changelog[i].title;
            change.appendChild(title);

            let description = document.createElement("p");
            description.innerHTML = changelog[i].description;
            change.appendChild(description);

            let changesTitle = document.createElement("h2");
            changesTitle.innerText = "Changes:";
            change.appendChild(changesTitle);

            let changeList = document.createElement("ul")
            for (let j = 0; j < changelog[i].changes.length; j++) {
                let changeEntry = document.createElement("li");
                changeEntry.innerHTML = changelog[i].changes[j];
                changeList.appendChild(changeEntry);
            }
            change.appendChild(changeList);

            changelogPanel.insertBefore(change, changelogPanel.firstChild);
        }
    }
    async function GenerateCharacters() {
        let Parent = document.getElementById("SelectCharacter");
        Parent.innerHTML = "";
        
        let characters = await(await fetch(window.location.origin+'/api/info/characters', {
            method: 'GET',
            headers: {
	    		'Content-Type': 'application/json',
	    	}
        })).json();

        for (let i = 0; characters && i < characters.length; i++) {
            let Character = GeneratePlayerCharacter(characters[i])
            let index = i;
            Character.addEventListener("click",()=>{
                if (Socket!=null) {
                    Socket.send(JSON.stringify({party: {function:"SelectCharacter",value:index}}));
                } else {
                    CreatePartySocketConnection();
                }
            });
            Parent.appendChild(Character);
        }
    }
    function GeneratePlayerCharacter(Character) {
        let Div = document.createElement("div");
        Div.classList.add("Character");
        for (let i = 0; i < Character.Visuals.length; i++) {
            let img = document.createElement("img");
            img.src = "/images/characters/" + Character.Visuals[i].Texture + ".png";

            if (Character.Visuals[i].class) 
                img.classList.add(Character.Visuals[i].class);
            if (Character.Visuals[i].Style)
                img.style = Character.Visuals[i].Style;
            Div.appendChild(img);
        }
        return Div;
    }
    function GeneratePlayerList(Players) {
        let Parent = document.getElementById("PartyList");
        Parent.innerHTML = "";
        for (let i = 0; i < Players.length || i < MaxPartySize; i++) {
            let Container = document.createElement("div");
            Container.classList.add("PlayerDisplay");
            if (Players.length>i) {
                if (Players[i].Character!=null) {
                    Container.appendChild(GeneratePlayerCharacter(Players[i].Character));
                }

                let WaitingForPlayer = document.createElement("h1");
                WaitingForPlayer.innerHTML = Players[i].DisplayName;
                Container.appendChild(WaitingForPlayer);
            } else {
                let WaitingForPlayer = document.createElement("h1");
                WaitingForPlayer.innerHTML = "WaitingForPlayer";
                Container.appendChild(WaitingForPlayer);
            }
            Parent.appendChild(Container);
        }
    }
</script>