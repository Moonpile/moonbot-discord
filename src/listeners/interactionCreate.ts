import {
  ChatInputCommandInteraction,
  Client,
  MessageComponentInteraction,
  Interaction,
} from "discord.js";
import { exit } from "process";
import { Buttons } from "../Buttons";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(client, interaction);
    }
    if (interaction.isButton()) {
      await handleButtonPress(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  if (!slashCommand) {
    interaction.followUp({
      content: `No Slash Command found for /${interaction.commandName}`,
    });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};

const handleButtonPress = async (
  client: Client,
  interaction: MessageComponentInteraction
): Promise<void> => {
  let buttonFound = false;
  for (const button of Buttons) {
    if (interaction.customId.startsWith(button.name)) {
      button.run(client, interaction);
      buttonFound = true;
      exit;
    }
  }
  if (!buttonFound) {
    interaction.followUp({
      content: `No Button found for /${interaction.customId}`,
    });
  }
};
