import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurreed" });
    return;
  }

  await interaction.deferReply();

  slashCommand.run(client, interaction);
};