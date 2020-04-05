import alt from 'alt';

export function showNotification(player, hintMessage) {
    alt.emitClient(player, 'functions:showNotification', hintMessage);
}

//Hud Ranges
alt.onClient('voice:update', update);

function update(player,range){
    notifyPlayer(player,"Sprachreichweite: ~g~"+range);
    player.setSyncedMeta('voice', range);
    alt.emitClient(player,"updateHud"); //Für Hud
};

export function notifyPlayer(player, text) {
    alt.emitClient(player, 'functions:notify', text);
}

//Login Event
//Nach dem Login des Spielers
/*
  player.notify("Willkommen auf SERVERNAME");
    alt.emitClient(player, 'voiceConnect', true, player.id);
    player.setSyncedMeta('voice',"Normal");
    alt.emitClient(player, 'openHud');
    player.notify("Teamspeak Voice verbinden...");
*/