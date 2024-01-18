const fs = require('fs');
const path = require('path');
const ld = require('lodash');

const dir = "../log"
const extension = ".log"


const directoryPath = path.join(__dirname, dir);

function getDate(time) {
    return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`
}

function log(level, msg, trace) {
    let time = new Date();

    let strBase = "["
    strBase += getDate(time)
    strBase += " "
    strBase += String(time.getHours()).padStart(2, "0")
    strBase += ":"
    strBase += String(time.getMinutes()).padStart(2, "0")
    strBase += ":"
    strBase += String(time.getSeconds()).padStart(2, "0")
    strBase += "] "

    let string = strBase+"["
    string += (trace ? trace+"/" : "")
    string += level
    string += "]: "
    string += msg

    console.log(string)

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    let filePath = path.join(directoryPath, getDate(time) + extension);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, string);
    } else {
        fs.appendFileSync(filePath, '\n' + string);
    }

    //delete logs over 1 week old
    time.setDate(time.getDate() - 7);

    try {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                let errMSG = strBase + "[log/ERROR]: " + err
                console.log(errMSG);
                fs.appendFileSync(filePath, '\n' + errMSG);
                return;
            }
    
            files.forEach((file) => {
                let fp = path.join(directoryPath, file);
                let stat = fs.statSync(fp);
    
                if (stat.isFile()) {
                    let fileDate = ld.cloneDeep(time)
                    let fnArray = file.split(".")[0].split("-")
    
                    fileDate.setFullYear(fnArray[0])
                    fileDate.setMonth(fnArray[1]-1)
                    fileDate.setDate(fnArray[2])
    
                    if (fileDate < time) {
                        fs.unlink(fp, (unlinkErr) => {
                            if (unlinkErr) {
                                let errMSG = strBase + `[log/ERROR]: Error deleting log "${fp}": ` + unlinkErr
                                console.log(errMSG);
                                fs.appendFileSync(filePath, '\n' + errMSG);
                            } else {
                                console.log(`Deleted log: ${fp}`);

                                
                                let msg = strBase + `[log/INFO]: Deleted log: ${fp}`
                                console.log(msg);
                                fs.appendFileSync(filePath, '\n' + msg);
                            }
                        });
                    }
                }
            })
        });
    } catch (e) {
        let errMSG = strBase + "[log/ERROR]: LogDeletionError: " + e.mmessage
        console.log(errMSG);
        fs.appendFileSync(filePath, '\n' + errMSG);
    }
}

logger = {
    debug: (msg, trace) => log("DEBUG", msg, trace),
    info: (msg, trace) => log("INFO", msg, trace),
    warn: (msg, trace) => log("WARN", msg, trace),
    error: (msg, trace) => log("ERROR", msg, trace)
};

module.exports = logger;