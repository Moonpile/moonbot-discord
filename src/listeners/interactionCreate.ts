import {
  ChatInputCommandInteraction,
  Client,
  Interaction,
  ButtonInteraction,
  SelectMenuInteraction,
} from "discord.js";
import { exit } from "process";
import { Selects } from "../Selects";
import { Buttons } from "../Buttons";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(
        client,
        interaction as ChatInputCommandInteraction
      );
    }
    if (interaction.isButton()) {
      await handleButtonPress(client, interaction as ButtonInteraction);
    }
    if (interaction.isSelectMenu()) {
      await handleSelectionMade(client, interaction as SelectMenuInteraction);
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
  interaction: ButtonInteraction
): Promise<void> => {
  let buttonFound = false;
  for (const button of Buttons) {
    if (interaction.customId.startsWith(button.name)) {
      await interaction.deferReply();
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

const handleSelectionMade = async (
  client: Client,
  interaction: SelectMenuInteraction
): Promise<void> => {
  const selectAction = Selects.find((s) => s.name === interaction.customId);

  if (!selectAction) {
    interaction.followUp({
      content: `No Select action found for /${interaction.customId}`,
    });
    return;
  }

  await interaction.deferReply();

  selectAction.run(client, interaction);
};
