<style>
    #Logo {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        height: 25%;
    }
    #Background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(/images/backgrounds/DungeonBricks.png);
        background-size: contain;
        pointer-events: none;
    }
    #SignUp {
        position: fixed;
        top: 50%;
        left: 25%;
        transform: translate(-50%,-50%);
        max-width: 50%;
        height: 50%;
        background-color: rgb(50, 50, 50);
        outline: 10px black solid;
        border-radius: 25px;
        filter: drop-shadow(5mm 5mm 5mm rgba(0,0,0,1));
        width: 400px;
    }
    #Login {
        position: fixed;
        top: 50%;
        left: 75%;
        transform: translate(-50%,-50%);
        max-width: 50%;
        height: 50%;
        background-color: rgb(50, 50, 50);
        outline: 10px black solid;
        border-radius: 25px;
        filter: drop-shadow(5mm 5mm 5mm rgba(0,0,0,1));
        width: 400px;
    }
    h1 {
        text-align: center;
        margin: 0;
    }
    input {
        font-size: 25px;
        background-color: rgb(50, 50, 50);
        outline: 4px black solid;
        padding: 5px;
        border: 0px;
        margin-left: 50%;
        margin-bottom: 5%;
        transform: translate(-50%,0);
        border-radius: 15px;
        color: white;
    }
    button {
        margin-left: 50%;
        transform: translate(-50%,0);
        font-size: 25px;
        border-radius: 15px;
        background-color: rgb(25, 25, 25);
        outline: 4px black solid;
        color: white;
        padding: 2px;
    }
    p {
        text-align: center;
        margin: 0 0 2.5% 0;
        font-size: 25px;
        font-weight: bolder;
    }
    .Error {
        color: crimson;
    }
</style>
<div id="Background"></div>
<div id="SignUp">
    <h1>Sign Up</h1>
    <hr>
    <p class="Error" id="SignUp_error"></p>
    <input type="text" id="SignUp_display_name" placeholder="Display Name">
    <input type="text" id="SignUp_username" placeholder="Username">
    <input type="password" id="SignUp_password" placeholder="Password">
    <button id="SignUp_btn" on:click={signup}>Sign Up</button>
</div>
<div id="Login">
    <h1>Login</h1>
    <hr>
    <p class="Error" id="Login_error"></p>
    <input type="text" id="Login_username" placeholder="Username">
    <input type="password" id="Login_password" placeholder="Password">
    <button id="Login_btn" on:click={login}>Login</button>
</div>
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
        if (user.ok) {
            window.location.href = "/";
        }

        
        
        document.getElementById('Login_password').addEventListener("keypress",(e) => sendOnEnter(e, login))

        document.getElementById('SignUp_password').addEventListener("keypress",(e) => sendOnEnter(e, signup))
    });

    async function login() {
        let username = document.getElementById('Login_username').value;
        let password = document.getElementById('Login_password').value;
        let errorField = document.getElementById('Login_error');

        
        let user = await fetch(window.location.origin+'/api/account/login', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (user.ok) {
            window.location.href = "/";
        } else {
            errorField.innerText = await user.text();
        }
    }

    async function signup() {
        let username = document.getElementById('SignUp_username').value;
        let password = document.getElementById('SignUp_password').value;
        let display_name = document.getElementById('SignUp_display_name').value;
        let errorField = document.getElementById('SignUp_error');

        let user = await fetch(window.location.origin+'/api/account/signup', {
            method: 'POST',
            headers: {
	    		'Content-Type': 'application/json',
	    	},
            body: JSON.stringify({
                username: username,
                password: password,
                display_name: display_name
            })
        });
        if (user.ok) {
            window.location.href = "/";
        } else {
            errorField.innerText = await user.text();
        }
    }

    function sendOnEnter(event, func) {
        if (event.key === 'Enter') {
            func()
        }
    }
</script>