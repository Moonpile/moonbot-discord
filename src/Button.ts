import { ButtonInteraction, Client } from "discord.js";

export interface Button {
    name: string,
    run: (client: Client, interaction: ButtonInteraction) => void;
}