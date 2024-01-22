<style>
    #PartyTop {
        position: fixed;
        left: 50%;
        top: 0;
        height: 100px;
        min-width: 20px;
        transform: translate(-50%,0);
        width: fit-content;
        display: flex;
        background-color: rgb(50, 50, 50);
        outline: 2px white solid;
    }
    .PointsScored {
        
    }
</style>
<slot />
<!--
    <div id="PartyTop">
        <div>
            <div class="PlayerImage">

            </div>
            <h4 class="PlayerName"></h4>
            <div class="PointsScored">
                <img src="/images/assets/IceShared.png" style="width: 100%;">
                <p>0</p>
            </div>
        </div>
    </div>
-->
<script>
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
    
    onMount(async() => {

    });
    function LoadGame() {

    }
    function ShowPartyTop() {
        
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
</script>