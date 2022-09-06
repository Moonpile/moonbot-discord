import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  MessageComponentInteraction,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";
import { Button } from "../Button";



export const DawnBonusFeats: Button = {
  name: "dawn-bonus-feats",
  run: async (client: Client, interaction: MessageComponentInteraction) => {
    const user = interaction.user;

    const feats = featsTable();

    const featsDice = new Dice("1d" + feats.length);

    const rolledFeats: string[] = [];

    for (let i = 0; i < 3;) {
      featsDice.roll();
      const thisFeat = feats[featsDice.total!];
      if (!rolledFeats.includes(thisFeat)) {
        rolledFeats.push(thisFeat);
        i++;
      }
    }

    featsDice.roll();

    let rollResultText =
      `${user} is selecting a bonus feat.\n` +
      `Chose one of the following feats:\n`;

    for (const feat of rolledFeats) {
      rollResultText += `- **${feat}**\n`;
    }

    if (featsDice.diceParameters.errorMessage) {
      await interaction.followUp({
        ephemeral: true,
        content: "Feats Dice: " + featsDice.diceParameters.errorMessage,
      });
    }
    else {
      await interaction.followUp({
        ephemeral: true,
        content: rollResultText,
      });
    }
  },
};


function addEntry(table: string[], entry: string, num: number): void {
  for (var i = 0; i < num; i++) table.push(entry);
}

function featsTable(): string[] {
  const table: string[] = [];
  addEntry(table, "Actor", 1);
  addEntry(table, "Alert", 1);
  addEntry(table, "Athlete", 1);
  addEntry(table, "Charger", 1);
  addEntry(table, "Chef", 1);
  addEntry(table, "Crossbow Expert", 1);
  addEntry(table, "Crusher", 1);
  addEntry(table, "Defensive Duelist (Dex 13+)", 1);
  addEntry(table, "Dual Wielder", 1);
  addEntry(table, "Dungeon Delver", 1);
  addEntry(table, "Durable", 1);
  addEntry(table, "Fey Touched", 1);
  addEntry(table, "Great Weapon Master", 1);
  addEntry(table, "Green Folk (homebrew, Elf and Gnome cannot select Green Folk, can re-roll bonus feat if they don't like the other two choices.)", 5);
  addEntry(table, "Healer", 1);
  addEntry(table, "Inspiring Leader (Cha 13+)", 1);
  addEntry(table, "Keen Mind", 1);
  addEntry(table, "Lightly Armored", 1);
  addEntry(table, "Linguist", 1);
  addEntry(table, "Lucky", 1);
  addEntry(table, "Mage Slayer", 1);
  addEntry(table, "Magic Initiate", 1);
  addEntry(table, "Martial Adept", 1);
  addEntry(table, "Mobile", 1);
  addEntry(table, "Mounted Combatant", 1);
  addEntry(table, "Observant", 1);
  addEntry(table, "Piercer", 1);
  addEntry(table, "Poisoner", 1);
  addEntry(table, "Polearm Master", 1);
  addEntry(table, "Resilient", 1);
  addEntry(table, "Savage Attacker", 1);
  addEntry(table, "Sentinel", 1);
  addEntry(table, "Shadow Touched", 1);
  addEntry(table, "Sharpshooeter", 1);
  addEntry(table, "Shield Master", 1);
  addEntry(table, "Skill Expert", 1);
  addEntry(table, "Skilled", 1);
  addEntry(table, "Skulker (Dex 13+)", 1);
  addEntry(table, "Slasher", 1);
  addEntry(table, "Tavern Brawler", 1);
  addEntry(table, "Telekinetic", 1);
  addEntry(table, "Telepathic", 1);
  addEntry(table, "Tough", 1);
  addEntry(table, "Weapon Master", 1);
  return table;
}
