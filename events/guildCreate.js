module.exports = (client, guild) => {
  if (!client.botconfig.GlobalCommands) require("../util/RegisterSlashCommands")(client, guild.id);
};
