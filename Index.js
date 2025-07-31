const SteamUser = require('steam-user');
const client = new SteamUser();

const logOnOptions = {
  accountName: 'Maddux6',  // Replace with your Steam username if different
  password: process.env.STEAM_PASSWORD
};

client.logOn(logOnOptions);

client.on('steamGuard', (domain, callback) => {
  console.log(`📧 Steam Guard code required. Check your email at ${domain}`);
  // When prompted, enter the code in Railway logs or your terminal
});

client.on('loggedOn', () => {
  console.log('✅ Logged into Steam!');
  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed(['Chat Bot']);
});

client.on('friendMessage', (steamID, message) => {
  console.log(`💬 ${steamID.getSteamID64()}: ${message}`);
  if (message.toLowerCase().includes('hello')) {
    client.chatMessage(steamID, "Hey! I'm a bot 😎");
  } else {
    client.chatMessage(steamID, "I got your message!");
  }
});
