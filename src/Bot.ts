import * as dotenv from 'dotenv'; 
import { Client, GatewayIntentBits } from "discord.js";
import interactionCreate from './listeners/interactionCreate';
import ready from "./listeners/ready";

dotenv.config();

console.log("Bot is starting...");

console.log(process.env.TOKEN);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// This actually sets the status to online
client.once("ready", () => {
  console.log("Ready!");
});

ready(client);
interactionCreate(client);
client.login(process.env.TOKEN);

// console.log(client);
