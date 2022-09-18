import { Client } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client, dropAddCommands: boolean): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    if (dropAddCommands) {
      console.log("Adding Commands");
      await client.application.commands.set(Commands);
    }

    console.log(`${client.user.username} is online`);
  });
};
