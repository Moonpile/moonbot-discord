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

    const feats = featsTable();

    const featsDice = new Dice("1d" + feats.length);

    const rolledFeats: string[] = [];

    for (let i = 0; i < 3; ) {
      featsDice.roll();
      const thisFeat = feats[featsDice.total!];
      if (!rolledFeats.includes(thisFeat)) {
        rolledFeats.push(thisFeat);
        i++;
      }
    }
    
    rollResultText +=
      `\n` +
      `Choose one of the following bonus feats:\n`;

    for (const feat of rolledFeats) {
      rollResultText += `- **${feat}**\n`;
    }

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
    } else if (featsDice.diceParameters.errorMessage) {
      await interaction.followUp({
        ephemeral: true,
        content: "Feats Dice: " + featsDice.diceParameters.errorMessage,
      });
    } else {
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
  addEntry(
    table,
    "Green Folk (homebrew, Elf and Gnome cannot select Green Folk, can re-roll bonus feat if they don't like the other two choices.)",
    5
  );
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
