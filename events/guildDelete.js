module.exports = (client, guild) => {
    client.logChannel?.send("Left guild ~ " + guild.name + "\\" + guild.id);
};
