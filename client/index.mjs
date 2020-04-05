import alt from 'alt';
import game from 'natives';


let disableAllControlActions = false;

//VOICE
var channelName = "Ingame_Voice"; //Channel Name
var channelPw = "test0088"; //Channel Passwort
var userPrefix = "00" 
var userName = "";
var tsBrowser = null;

let voiceRefresh = false;
alt.onServer('voiceConnect', (active,id) => {
    if (active) {
        userName = "" + userPrefix + "" + id;
        tsBrowser = new alt.WebView('');
        alt.setTimeout(() => {
            voiceRefresh = true;
        }, 500);
    }
    else {
        voiceRefresh = false;
        tsBrowser.destroy();
    }
    alt.log('voiceRefresh: ' + voiceRefresh);
});
export const distanceCalculation = (position, targetPosition) => {
    return new alt.Vector3(position.x - targetPosition.x, position.y - targetPosition.y, position.z - targetPosition.z);
}
export const subtract = (position, targetPosition) => {
    position.x = position.x - targetPosition.x;
    position.y = position.y - targetPosition.y;
    position.z = position.z - targetPosition.z;
    return position;
}
function voiceint() {
    if (disableAllControlActions) {
        game.disableControlAction(0, 199, true);
        game.disableControlAction(0, 200, true);
    }
    let voiceWebView = tsBrowser;
    if (voiceRefresh && voiceWebView) {
        voiceRefresh = false;
        const client = alt.Player.local;
        const playerPos = client.pos;
        const heading = game.getEntityHeading(game.playerPedId());
        const rotation = Math.PI / 180 * (heading * -1);
        const playerNames = [];
        alt.Player.all.forEach((targetClient) => {
            var streamedPlayerPos = targetClient.pos;
            var distance = game.getDistanceBetweenCoords(playerPos.x, playerPos.y, playerPos.z, streamedPlayerPos.x, streamedPlayerPos.y, streamedPlayerPos.z, true);
            let volumeModifier = 0;
            var voiceRange = targetClient.getSyncedMeta('voice');
            var range = 25;
            if (voiceRange == "Stumm") {
                range = -1;
            }
            else if (voiceRange == "Flüstern") {
                range = 5;
            }
            else if (voiceRange == "Normal") {
                range = 25;
            }
            else if (voiceRange == "Schreien") {
                range = 50;
            }
            if (distance > 5) {
                volumeModifier = (distance * -5 / 10);
            }
            if (volumeModifier > 0) {
                volumeModifier = 0;
            }
            if (distance < range) {
                var subPos = {
                    X: (streamedPlayerPos.x - playerPos.x),
                    Y: (streamedPlayerPos.y - playerPos.y),
                };

                var x = subPos.X * Math.cos(rotation) - subPos.Y * Math.sin(rotation);
                var y = subPos.X * Math.sin(rotation) + subPos.Y * Math.cos(rotation);
                x = x * 10 / range;
                y = y * 10 / range;             
                playerNames.push(( "" + userPrefix + targetClient.getSyncedMeta('TS-UserNumber')) + "~" + (Math.round(x * 1000) / 1000) + "~" + (Math.round(y * 1000) / 1000) + "~0~" + (Math.round(volumeModifier * 1000) / 1000));
            }
        });
        const url = "http://localhost:15555/custom_players2/" + channelName  + "/" + channelPw + "/" + userName + "/" + playerNames.join(";") + "/";
        //alt.log("X: "+url);
        if (voiceWebView && (voiceWebView.url != url)) {
            voiceWebView.url = url;
        }
        alt.setTimeout(() => {
            voiceRefresh = true;
        }, 500);
        //alt.log('playerNames: ' + JSON.stringify(playerNames));
    }
};
let voiceInterval = alt.setInterval(voiceint, 50);

//Voice Range ändern
alt.on('keyup', keyup);
function keyup(key) {
    if (key == 220) {
        var range = alt.Player.local.getSyncedMeta('voice');
        switch (range) {
            case "Stumm":
                alt.emitServer("voice:update", "Flüstern");
                break;
            case "Flüstern":
                alt.emitServer("voice:update", "Normal");
                break;
            case "Normal":
                alt.emitServer("voice:update", "Schreien");
                break;
            case "Schreien":
                alt.emitServer("voice:update", "Stumm");
                break;
        }
    }
};