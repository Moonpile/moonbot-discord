import * as dotenv from 'dotenv'; 
import { Client } from "discord.js";
import interactionCreate from './listeners/interactionCreate';
import ready from "./listeners/ready";

dotenv.config();

console.log("Bot is starting...");

console.log(process.env.TOKEN);

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);
client.login(process.env.TOKEN);

// console.log(client);
