import { Client, MessageComponentInteraction } from "discord.js";

export interface Button {
    name: string,
    run: (client: Client, interaction: MessageComponentInteraction) => void;
}