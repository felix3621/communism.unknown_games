const auth = require('../../modules/authentication.cjs');
const db = require('../../modules/database.cjs');
const fa = require('../../modules/fileAccess.cjs');

var parties = new Array();

var maxPartyMembers = 4;

var code = 0;

class Party {
    constructor(Private) {
        this.Players = new Array();
        this.private = Private
        this.code;
        this.active = false;
        this.PartyPage = 0;
    }
    // Add Player To Party
    AddPlayer(username, Socket) {
        this.Players.push(new Player(username, Socket));
    }
    RemovePlayer(username) {
        this.Players.splice(
            this.Players.indexOf(obj => obj.Username == username), 1
        )
    }
    // Tick Function
    Tick() {
        this.SendInfo();
    }
    // Send Info To Players True Socket
    SendInfo() {
        var rtn = {}
        rtn.Players = [];
        for (let i = 0; i < this.Players.length; i++) {
            let Player = {};
            Player.DisplayName = this.Players[i].DisplayName;
            Player.Character = this.Players[i].Character;
            rtn.Players.push(Player);
        }
        rtn.PartyPage = this.PartyPage;
        if (!this.active)
            rtn.code = this.code;
        for (let i = 0; i < this.Players.length; i++) {
            this.Players[i].Socket.send(JSON.stringify(rtn));
        }
    }
}
class Player {
    constructor(username, Socket) {
        this.Username = username;
        this.DisplayName = "";
        this.Socket = Socket;
        this.Ready = false;
        this.Character = null;
        this.PartyLeader = false;
        GetPlayerInfo(this);
    }
    // Player Is Ready
    Ready() {

    }
    Disconnect() {
        
    }
    SelectCharacter(CharacterIndex) {
        this.Character = JSON.parse(fa.read('./characters.json'))[CharacterIndex];
    }
    VoteGameMode() {
        
    }
    SelectGameMode() {
        
    }
}

async function GetPlayerInfo(PlayerClass) {
    let data = await (await db).collection("accounts").findOne({username: PlayerClass.Username});
    PlayerClass.DisplayName = data.display_name;
}

module.exports = {
    createParty(username, socket) {
        let p = new Party(true);
        p.AddPlayer(username, socket);
        p.code = auth.encrypt(code);
        code++;
        parties.push(p);
    },
    joinParty(code, username, socket) {
        let p = parties.find(obj => obj.code == code && obj.Players.length < maxPartyMembers && !obj.active);
        if (p) {
            p.AddPlayer(username, socket);
            return true;
        } else {
            return false;
        }
    },
    quickParty(username, socket) {
        let p = parties.find(obj => obj.private != true && obj.Players.length < maxPartyMembers && !obj.active);
        if (p) {
            p.AddPlayer(username, socket);
        } else {
            let np = new Party();
            np.AddPlayer(username, socket);
            np.code = auth.encrypt(parties.length);
            parties.push(np);
        }
    },
    removePlayer(username) {
        let p = parties.find(obj => obj.Players.some(player => player.Username == username))
        if (p)
            p.RemovePlayer(username);
    },
    UpdateSocket(username, socket) {
        let p = parties.find(obj => obj.Players.some(player => player.Username == username))
        if (p)
            p.Socket = socket;
    },
    Tick() {
        //console.log("----------------------------------------------------------------")
        for (let i = 0; i < parties.length; i++) {
            parties[i].Tick();
            //console.log("||||||||||")
            //for (let j = 0; j < parties[i].Players.length; j++) {
            //    console.log(parties[i].Players[j].Username)
            //}
        }
        //console.log("----------------------------------------------------------------")
    }
};