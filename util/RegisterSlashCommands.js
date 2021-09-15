const fs = require("fs");
const path = require("path");

/**
 * Register slash commands for a guild
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {string} guild
 */
module.exports = (client, guild = undefined) => {
  client.log("Registering slash commands for " + guild);

  let commandsDir = path.join(__dirname, "..", "commands");

  fs.readdir(commandsDir, (err, files) => {
    if (err) throw err;
    let errorCount = 0;
    files.forEach(async (file) => {
      if (errorCount > 3) return;
      let cmd = require(commandsDir + "/" + file);
      if (!cmd.SlashCommand || !cmd.SlashCommand.run) return;
      let dataStuff = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.SlashCommand.options,
      };

      //Creating variables like this, So you might understand my code :)
      let ClientAPI = client.api.applications(client.user.id);
      let API = guild ? ClientAPI.guilds(guild) : ClientAPI;

      client.log(
        "[Slash Command]: [POST] Guild " +
          guild +
          ", Command: " +
          dataStuff.name
      );
      try {
        await API.commands.post({ data: dataStuff });
      } catch (e) {
        errorCount++;
        client.log(
          "[Slash Command]: [POST-FAILED] Guild " +
            guild +
            ", Command: " +
            dataStuff.name
        );
        console.log(e);
        if (e.name.toLowerCase().includes("missing access")) errorCount += 5;
      }
    });
  });
};
