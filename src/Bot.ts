import * as dotenv from "dotenv";
import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const applicationId = process.env.APPLICATION_ID;

if (!token || !clientId || !guildId || !applicationId) {
  console.error("Missing required environment variable.");
} else {
  // Delete all commands, they will be re-created
  const rest = new REST({ version: "10" }).setToken(token);
  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);
  rest
    .put(Routes.applicationCommands(clientId), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);

  console.log("Bot is starting...");

  console.log(token);

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  // This actually sets the status to online
  client.once("ready", () => {
    console.log("Ready!");
  });

  ready(client);
  interactionCreate(client);
  client.login(token);

  // console.log(client);
}
