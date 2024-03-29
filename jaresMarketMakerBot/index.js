var express = require('express')
var app = express()
var request = require("request")
var bodyParser = require('body-parser')
const axios = require('axios')
var going = false;
var fs = require('fs');
var key = fs.readFileSync('/etc/letsencrypt/live/techvoices.club/privkey.pem');
var cert = fs.readFileSync('/etc/letsencrypt/live/techvoices.club/fullchain.pem');
var ca = fs.readFileSync('/etc/letsencrypt/live/techvoices.club/fullchain.pem');
var options = {
    key: key,
    cert: cert,
    ca: ca
};
let updates = []
app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
) // for parsing application/x-www-form-urlencoded
let servers = ["http://techvoices.club", "http://139.59.152.85"]
let returns = {}
let bnbs = {}
let usds = {}
let btcs = {}
let alts = {}
let altsAdj = {}
let returnsAdj = {}
let bnbsAdj = {}
let usdsAdj = {}
let btcsAdj = {}
let btcVol = {}
let balances = {}
let balances2 = {}
let stops = {}
let bids = {}
let buyOs = {}
let divisor = {}
let text = ""
async function repeat() {
    
//try {
/*        text = ""
        bids = {}
        buyOs = {}
        divisor = {}
        balances = {}
        returns = {}
        balances2 = {}
        stops = {}
        btcVol = {}
        bnbs = {}
        usds = {}
        btcs = {}
        returnsAdj = {}
        bnbsAdj = {}
        usdsAdj = {}
        btcsAdj = {}
        btcVol = {} */
console.log(going);
if (going == false){
going = true;
text = "";
        for (var server in servers) {
            let url = servers[server] + '/update?name=2'
            request.get({
                url: url,
                json: true
            }, function(e, r, data) {

                console.log(data)
                console.log(e)
                if (data) {
                    if (data.bnbdiff > -50){
                    bnbs[servers[server]] = data.bnbdiff
                    returns[servers[server]] = (data.btcdiff + data.bnbdiff + data.usddiff) / 3
                }
                else {
                    alts[servers[server]] = data.altdiff
                    returns[servers[server]] = (data.btcdiff + data.altdiff + data.usddiff) / 3
                }
                    usds[servers[server]] = data.usddiff
                    stops[servers[server]] = data.stops
                    bids[servers[server]] = data.bids
                    buyOs[servers[server]] = data.buyOs
                    divisor[servers[server]] = data.divisor
                    balances[servers[server]] = data.balances
                    balances2[servers[server]] = data.balances2
                    btcs[servers[server]] = data.btcdiff
                                        if (data.bnbdiff > -50){

                    returnsAdj[servers[server]] = (data.btcdiff2 + data.bnbdiff2 + data.usddiff2) / 3
                    bnbsAdj[servers[server]] = data.bnbdiff2
                }
                else {
                                        returnsAdj[servers[server]] = (data.btcdiff2 + data.altdiff2 + data.usddiff2) / 3

                    altsAdj[servers[server]] = data.altdiff2
                }
                    usdsAdj[servers[server]] = data.usddiff2

                    btcsAdj[servers[server]] = data.btcdiff2
                    btcVol[servers[server]] = data.btcVol
                    try {
                        text += data.url + ": \n\n"
                        text += "avg returns: " + returns[servers[server]].toFixed(4) + "%\n"
                        text += "btc returns: " + btcs[servers[server]].toFixed(4) + "%\n"
                                                                if (data.bnbdiff > -50){

                        text += "bnb returns: " + bnbs[servers[server]].toFixed(4) + "%\n"
                    }
                    else {
                        text += "alt returns: " + alts[servers[server]].toFixed(4) + "%\n"

                    }
                        text += "usd returns: " + usds[servers[server]].toFixed(4) + "%\n\n"
                        text += "adj. avg returns: " + returnsAdj[servers[server]].toFixed(4) + "%\n"
                        text += "adj. btc returns: " + btcsAdj[servers[server]].toFixed(4) + "%\n"
                                                                if (data.bnbdiff > -50){

                        text += "adj. bnb returns: " + bnbsAdj[servers[server]].toFixed(4) + "%\n"

                    }
                    else {
                                                text += "adj. alt returns: " + altsAdj[servers[server]].toFixed(4) + "%\n"

                    }
                        text += "adj. usd returns: " + usdsAdj[servers[server]].toFixed(4) + "%\n\n"
                        text += "btcVol since 24 hours before run til now: " + btcVol[servers[server]] + "\n\n\n"
                    } catch (err) {

                    }
                }
going = false;
            })
        }
/*    } catch (err) {
        console.log(err);
    }*/
}
}
setTimeout(function(){
repeat();
}, 1000);
setInterval(function() {
    repeat()
}, 5000 * servers.length);
//This is the route the API will call
let ds = []
let first = true
let count = 0;
let offset = 0;
loffset = 0;
setInterval(function(){
request.get({url: "https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/getUpdates?offset=" + updates[updates.length-1],
                json: true
            }, function(e, r, data) {
/*
if (first){
if (data.result.length == 1){
first = false;
}
let l = 0;
for (var d in data.result){
count++;
if (l < data.result[d].update_id){
l = data.result[d].update_id;
}
//offset = data.result[d].update_id
}
offset = l;
}
else {
console.log(count)
*/
//for (var d in data.result){
if (!updates.includes(data.result[data.result.length-1].update_id)){
updates.push(data.result[data.result.length-1].update_id)
//count++;
//loffset = data.result[d].offset;
//console.log(data.resultw[d].message)
if (data.result[data.result.length-1].message){
console.log(data.result[data.result.length-1].message.text)
 if (data.result[data.result.length-1].message.text && data.result[data.result.length-1].message.text.startsWith('returns')) {
                // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
                doReturns(data.result[data.result.length-1].message.chat.id)
setTimeout(function(){
//repeat()
}, 2500);
            } else if (data.result[data.result.length-1].message.text && data.result[data.result.length-1].message.text.startsWith('balances')) {
                // In case a message is not present, or if our dmessage does not have the word marco in it, do nothing and return an empty response
                doBalances(data.result[data.result.length-1].message.chat.id)
setTimeout(function(){
//repeat()
}, 2500);
//repeat()        
    } else if (data.result[data.result.length-1].message.text && data.result[data.result.length-1].message.text.startsWith('state')) {
                // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
                doState(data.result[data.result.length-1].message.chat.id)
//repeat()        
setTimeout(function(){
//repeat()
}, 2500); 
   } else {
                //return res.end()
            }


}
}
//}
})
}, 2000)
app.post('/server-launch', function(req, res) {
let name = req.query.url;
let address = req.query.theurl
if (!servers.includes(address)){
servers.push(address)
}   

const fs = require('fs');
fs.appendFile("addresses.txt",  address + ","    ,  function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


          axios  .post(
                'https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/sendMessage', {
                    chat_id: '-1001184735501',
                    text: "hi from the underworld\n\n " + name   + " has started their bot! You can watch real life graphs an projections here: " + address 
                }
            )
            .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                //res.end('ok')
            })
            .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                //res.end('Error :' + err)
            })              

    })

app.post('/new-message', function(req, res) {
        const {
            message
        } = req.body
        if (message) {
            //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
            if (message.text) {
                console.log(message.text)
            }
console.log('id: ' + message.chat.id);
            if (message.text && message.text.startsWith('returns')) {
                // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
                doReturns(message.chat.id, res)
setTimeout(function(){
//repeat()
}, 2500);
            } else if (message.text && message.text.startsWith('balances')) {
                // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
                doBalances(message.chat.id, res)
setTimeout(function(){
//repeat()
}, 2500);
//repeat()        
    } else if (message.text && message.text.startsWith('state')) {
                // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
                doState(message.chat.id, res)
//repeat()        
setTimeout(function(){
//repeat()
}, 2500); 
   } else {
                return res.end()
            }
        }
    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"

})
async function doState(chatid) {
    try {
        let tosend = ""
        for (var server in servers) {
            tosend += servers[server] + "\n"
            for (var b in stops[servers[server]]) {
                tosend += ('\n' + b + ': bid avg: ' + bids[servers[server]][b] + ' stop: ' + stops[servers[server]][b] + ' bought at (times fees, less divisor): ' + buyOs[servers[server]][b] + ' divisor: ' + divisor[servers[server]][b])
            }
        }

        axios
            .post(
                'https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/sendMessage', {
                    chat_id: chatid,
                    text: "hi from the underworld\n\n " + tosend
                }
            )
            .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                //res.end('ok')
            })
            .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                //res.end('Error :' + err)
            })
    } catch (err) {
        console.log(err);
    }
}
async function doBalances(chatid) {
    try {
        let tosend = ""
        for (var server in servers) {
            tosend += servers[server] + "\n"
            for (var b in balances[servers[server]]) {
                tosend += ('\n' + b + ": free: " + balances[servers[server]][b] + " on orders: " + balances2[servers[server]][b])
            }
/*
            axios
                .post(
                    'https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/sendMessage', {
                        chat_id: chatid,
                        text: "hi from the underworld\n\n  " + tosend
                    }
                )
                .then(response => {
                    // We get here if the message was successfully posted
                    console.log('Message posted')
                    //res.end('ok')
                })
                .catch(err => {
                    // ...and here if it was not
                    console.log('Error :', err)
                    //res.end('Error :' + err)
                })
*/
        }

        axios
            .post(
                'https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/sendMessage', {
                    chat_id: chatid,
                    text: "hi from the underworld\n\n  " + tosend
                }
            )
            .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                //res.end('ok')
            })
            .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                //res.end('Error :' + err)
            })
    } catch (err) {
        console.log(err);
    }
}
async function doReturns(chatid) {
    try {
        axios
            .post(
                'https://api.telegram.org/bot845625314:AAH26BmZDODxdOsusTiBUBog-GKQdS_MRcc/sendMessage', {
                    chat_id: chatid,
                    text: "hi from the underworld\n\n  " + text
                }
            )
            .then(response => {
                // We get here if the message was successfully posted
                console.log('Message posted')
                //res.end('ok')
            })
            .catch(err => {
                // ...and here if it was not
                console.log('Error :', err)
                //res.end('Error :' + err)
            })
    } catch (err) {
        console.log(err);
    }
}
// Finally, start our server
var https = require('https');
https.createServer(options, app).listen(443);
