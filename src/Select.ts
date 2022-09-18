import { Client, SelectMenuInteraction } from "discord.js";

export interface Select {
    name: string,
    run: (client: Client, interaction: SelectMenuInteraction) => void;
}