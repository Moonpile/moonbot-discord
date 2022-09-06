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



export const DawnRaceClassButton: Button = {
  name: "dawn-race-class",
  run: async (client: Client, interaction: MessageComponentInteraction) => {
    const user = interaction.user;

    const races = raceTable();
    const classes = classTable();

    const raceDice = new Dice("1d" + races.length);
    raceDice.roll();

    const classDice = new Dice("1d" + classes.length);
    classDice.roll();

    let rollResultText = `${user} is generating a new character.\n`
                    + `First Choice\n`
                    + `Race: ${raceDice.diceParameters.diceExpression} rolled ${raceDice.total} = **${races[raceDice.total! - 1]}**\n`
                    + `Class: ${classDice.diceParameters.diceExpression} rolled ${classDice.total} = **${classes[classDice.total! - 1]}**\n\n`;

    raceDice.roll();
    classDice.roll();

    rollResultText += `Second Choice\n`
                    + `Race: ${raceDice.diceParameters.diceExpression} rolled ${raceDice.total} = **${races[raceDice.total! - 1]}**\n`
                    + `Class: ${classDice.diceParameters.diceExpression} rolled ${classDice.total} = **${classes[classDice.total! - 1]}**\n\n`
                    + `You can always choose to be human.`;

    if (raceDice.diceParameters.errorMessage) {
      await interaction.followUp({
        ephemeral: true,
        content: "Race Dice: " + raceDice.diceParameters.errorMessage,
      });
    }
    else if (classDice.diceParameters.errorMessage) {
      await interaction.followUp({
        ephemeral: true,
        content: "Class Dice: " + raceDice.diceParameters.errorMessage,
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

function raceTable(): string[] {
  const table: string[] = [];
  addEntry(table, "Human", 20);
  addEntry(table, "Elf (Can't be Druids/Green Folk)", 4);
  addEntry(table, "Dwarf", 5);
  addEntry(table, "Halfling", 3);
  addEntry(table, "Half Orc", 1);
  addEntry(table, "Half Elf", 2);
  addEntry(table, "Gnome (Can't be Druids/Green Folk)", 1);
  return table;
}

function classTable(): string[] {
  const table: string[] = [];
  addEntry(table, "Barbarian", 6);
  addEntry(table, "Bard", 2);
  addEntry(table, "Cleric", 3);
  addEntry(table, "Druid (Green Folk is bonus feat.  If Elf or Gnome, re-roll)", 3);
  addEntry(table, "Fighter", 10);
  addEntry(table, "Monk", 1);
  addEntry(table, "Paladin", 3);
  addEntry(table, "Ranger", 5);
  addEntry(table, "Rogue", 8);
  addEntry(table, "Sorcerer", 1);
  addEntry(table, "Wizard", 3);
  return table;
}