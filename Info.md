## Serverside Implementierung
---

### Spieler in den Voice Channel schieben z.B nach dem Login
alt.emitClient(player, 'voiceConnect', true, player.id);

### Für Voice Range
player.setSyncedMeta('voice',"Normal");

### Hud
alt.emitClient(player, 'openHud');

### Kleine Anmerkung
---
Ich empfehle das System nicht als einzelne Resource zu implementieren, sondern in eurem Gamemode (Script) einzufügen, so könnt ihr dann entscheiden, wann der Spieler in den Ingame Channel gemoved wird und ihr könnt weitere Funktion wie Funk, Handycall etc. hinzufügen.

## WICHTIG!

---
#### Das Gta5Voice Plugin darf erst verwendet werden, wenn ihr euch bei Gta5Voice (KW) die Lizenz zur Verwendung abgeholt habt. Andersweitig dürft ihr diese alt:V Version nicht verwenden!
---
#### The Gta5Voice plugin may only be used if you have picked up the license for use from Gta5Voice (KW). Otherwise you may not use this alt: V version!
---
#### Le plugin Gta5Voice ne peut être utilisé que si vous avez récupéré la licence d'utilisation de Gta5Voice (KW). Sinon, vous ne pouvez pas utiliser cette version alt: V!


### HAVE FUN
