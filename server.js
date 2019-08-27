const riot = require('matrix-js-sdk');
const webhook = require('webhook-discord'); //Hmm? What's this? its for riot to discord bridge Cool
const hook = new webhook.Webhook('https://ptb.discordapp.com/api/webhooks/615364541131522077/heA_o08OygaPixBT33TMLHLvQg13pBsJu8W4LHkBaLBjCYqJCu25nciSqTqCgBrRIKHO')
const userid = '@gamerbot:matrix.org';
const accesstoken = 'MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDI3Y2lkIHVzZXJfaWQgPSBAZ2FtZXJib3Q6bWF0cml4Lm9yZwowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9ID1HO342ekJKNlpRTzR1amEKMDAyZnNpZ25hdHVyZSCI1ea_GfKKoFlzwUX8a6o0Wz8fi1oIghX7fT6aL9dcLwo';  // dont mess with this part its for account login
const client = riot.createClient({
  baseUrl: 'https://matrix.org',
  accessToken: accesstoken,
  userId: userid
});

client.once('sync', function(state, prevState, res) {
  if(state=='PREPARED') return console.log('ready');
});

client.on('Room.timeline', function(event, room, toStartOfTimeline) {
  if(event.getType()!=='m.room.message') return;
  hook.info('riot',`(${room.name}) | ${event.getSender()}: ${event.getContent().body}`)
  const args = event.event.content.body.slice('^'.length).split(' ');
  if(event.event.content.body.startsWith('^sendmessage')) {
    console.log("Command '^sendmessage' has been executed")
    client.sendEvent(room.roomId, 'm.room.message', { 'body': 'ok sure', 'msgtype': 'm.text'}, '', (err, res) => {hook.info('riot demands', args.slice(1).join(' ')) });
  }
  switch(event.event.content.body) {
    case "epic gamer moment":
      console.log("Keyword 'epic gamer moment' detected")
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'yeet', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      break;
    case "^version":
      console.log("Command '^version' has been executed")
      client.sendEvent(room.roomId, 'm.room.message', { 'body': '0.1.1', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      break;
    case "^help":
      console.log("Command '^help' has been executed")
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'Note: Make sure you include ^ before the command', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'help -- Displays this help message', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'sendmessage (message) -- Sends a message to the discord', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      client.sendEvent(room.roomId, 'm.room.message', { 'body': 'version -- Displays Gamerbot version number', 'msgtype': 'm.text'}, '', (err, res) => { console.log(err) });
      break;
  }
});
client.startClient();
console.log("GAMERBOT V 0.1.0 ONLINE")
//UDK how did you get the token?
// its in localstorage of the account?
//just execute localStorage.getItem("mx_access_token") in the console. Okeh 