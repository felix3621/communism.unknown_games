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
        this.Players.push(new Player(username, Socket, this));
        this.PartyPage = 0;
    }
    RemovePlayer(username) {
        let player = this.Players.find(obj => (obj.Username == username))
        if (player) {
            let index = this.Players.indexOf(player);
            this.Players.splice(index, 1);
            if (this.Players.length > 0)
                this.Players[0].PartyLeader = true;
            else
                parties.slice(parties.indexOf(this), 1);
        }
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
            Player.Ready = this.Players[i].Ready;
            rtn.Players.push(Player);
        }
        rtn.PartyPage = this.PartyPage;
        if (!this.active)
            rtn.code = this.code;
        rtn.private = this.private;
        for (let i = 0; i < this.Players.length; i++) {
            let send = JSON.parse(JSON.stringify(rtn))
            send.ready = this.Players[i].Ready
            if (this.Players[i].PartyLeader && !this.active) {
                send.startAllowed = (this.Players.filter(x => x.Ready).length == this.Players.length)
            }
            this.Players[i].Socket.send(JSON.stringify(send));
        }
    }
    Start() {
        if (this.Players.filter(x => x.Ready).length == this.Players.length)
            console.log("start")
    }
}
class Player {
    constructor(username, Socket, party) {
        this.Username = username;
        this.DisplayName = "";
        this.Socket = Socket;
        this.Ready = false;
        this.Character = null;
        this.PartyLeader = false;
        this.party = party
        GetPlayerInfo(this);
    }
    // Player Is Ready
    ReadyPlayer() {
        if (!this.party.active && this.party.PartyPage == 0) {
            this.Ready = !this.Ready;
            if (this.party.Players.filter(x => x.Ready).length == this.party.Players.length)
                this.party.PartyPage=1;
        }
    }
    Start() {
        if (this.PartyLeader && !this.party.active)
            this.party.Start();
    }
    Disconnect() {
        
    }
    SelectCharacter(CharacterIndex) {
        this.Character = JSON.parse(fa.read('./shared/characters.json'))[CharacterIndex];
    }
    VoteGameMode() {
        
    }
    SelectGameMode() {
        
    }
    MovePage(MoveAmount) {
        if (this.PartyLeader && this.party.Players.filter(x => x.Ready).length == this.party.Players.length && !this.party.active)
            this.party.PartyPage = this.party.PartyPage+MoveAmount>=0?this.party.PartyPage+MoveAmount:0;
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
        p.Players[0].PartyLeader = true;
        p.code = auth.encrypt(code);
        while (true) {
            if (p.code.charAt(p.code.length - 1) == "=") {
                p.code = p.code.substring(0, p.code.length - 1);
            } else {
                break;
            }
        }
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
            np.Players[0].PartyLeader = true;
            np.code = auth.encrypt(code);
            while (true) {
                if (np.code.charAt(np.code.length - 1) == "=") {
                    np.code = np.code.substring(0, np.code.length - 1);
                } else {
                    break;
                }
            }
            code++;
            parties.push(np);
        }
    },
    removePlayer(username) {
        let p = parties.find(obj => obj.Players.some(player => player.Username == username))
        if (p)
            p.RemovePlayer(username);
    },
    Tick() {
        for (let i = 0; i < parties.length; i++) {
            parties[i].Tick();
        }
    },
    party(username, func) {
        let p = parties.find(obj => obj.Players.some(player => player.Username == username))
        if (p) {
            let pu = p.Players.find(player => player.Username == username);

            console.log(func)

            if (pu[func.function]) {
                console.log("yeet")
                if (func.value != null)
                    pu[func.function](func.value)
                else
                    pu[func.function]()
            }
        }
    }
};