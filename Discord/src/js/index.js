const {
  Client,
  IntentsBitField,
  Events,
  GuildScheduledEvent,
  GuildScheduledEventManager,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
  interaction
} = require("discord.js");
const { token } = require("./config.json");



let fullMessage = "";
//The Bot's privilege and what it can do
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildScheduledEvents,
  ],
});

const guildId = 1226059941933219900;
const guild = client.guilds.cache.get(guildId);

client.on(Events.ClientReady, (c) =>
  console.log(`${c.user.tag} is up and running`)
);

client.on("messageCreate", (message) => {
  console.log(message.author);
  if (message.author.bot) {
    wait1minuteLog(message.content);
  } else {
    // if (message.content === "hello") {
    //   const scheduler = new GuildScheduledEventManager();
    //   const promise = scheduler.create({
    //     name: "Test Event",
    //     scheduledStartTime: new Date(),
    //     privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    //     entityType: GuildScheduledEventEntityType.External,
    //   });
    //   promise
    //     .then((event) => {
    //       console.log(event.name);
    //     })
    //     .catch((exception) => console.log(exception));
    // }
  }
});

/**
 * Every time the SF Adivsor Bot updates their message, we set the fullMessage variablel to
 * the updated message
 */
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) {
    fullMessage = newMessage.content;
  }
});

/**
 * After 2 minutes, attempt tp parse the event list with key/value pairs
 * Retrieves the:
 * Event Name
 * Event Date
 * Event Location
 * @param {*} message 
 */
function wait1minuteLog(message) {
  setTimeout(() => {
    if (fullMessage.indexOf("Event List") != -1) {
      eventListParse(fullMessage);
      const eventName = "Test Event";
      const location = "San Francisco";
    }
  }, 20000);
}

/**
 * Parses the String Message
 * Only 
 * @param {String} str 
 * @returns 
 */
function eventListParse(str) {
  const one = str.indexOf("1.");
  const lastList = str.lastIndexOf("---");

  console.log("one" + one);
  const string = str.substring(one, lastList);
  console.log("STRING " + string);

  const lines = string.split("\n");
  const eventName = "";
  const date = "";
  const link = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const keyVal = line.split("-");
    if (keyVal.length > 0) {
      if (keyVal[1] == undefined) {
        return;
      }
      if (keyVal[0]) console.log("KEY " + keyVal[0]);
      console.log("Value" + keyVal[1]);
    }
  }
}

//Bot logging in with its password
client.login(token);
