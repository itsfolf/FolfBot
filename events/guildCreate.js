module.exports = (client, guild) => {
  if (!client.botconfig.GlobalCommands) require("../util/RegisterSlashCommands")(client, guild.id);
  client.logChannel?.send("Joined guild ~ " + guild.name + "\\" + guild.id);
};
