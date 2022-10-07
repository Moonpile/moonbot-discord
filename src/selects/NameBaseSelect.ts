import {
  Client,
  SelectMenuInteraction,
} from "discord.js";
import Foswig from "foswig";
import { NameBases } from "../data/NameBases";

import { Select } from "../Select";

export const NameBaseSelect: Select = {
  name: "name-base-select",
  run: async (client: Client, interaction: SelectMenuInteraction) => {

    
    let namebase: string[] = [];

    if (interaction.values[0] === "corbindian-southern-female") {
      namebase = NameBases.corbindianSouthernFemale;
    } else if (interaction.values[0] === "corbindian-southern-male") {
      namebase = NameBases.corbindianSouthernMale;
    } else if (interaction.values[0] === "corbindian-northern-female") {
      namebase = NameBases.corbindianNorthernFemale;
    } else if (interaction.values[0] === "corbindian-northern-male") {
      namebase = NameBases.corbindianNorthernMale;
    } else if (interaction.values[0] === "oswindingas-female") {
      namebase = NameBases.oswindingasFemale;
    } else if (interaction.values[0] === "oswindingas-male") {
      namebase = NameBases.oswindingasMale;
    } else if (interaction.values[0] === "wala-female") {
      namebase = NameBases.walaFemale;
    } else if (interaction.values[0] === "wala-male") {
      namebase = NameBases.wakaMale;
    } else if (interaction.values[0] === "halfling-female") {
      namebase = NameBases.halflingFemale;
    } else if (interaction.values[0] === "halfling-male") {
      namebase = NameBases.halflingMale;
    }

    const chain = new Foswig(3, namebase);

    let content = interaction.values[0] + ":\n";

    const constraints = {
      minLength: 2,
      maxLength: 10,
      allowDuplicates: true,
    };

    try {
      for (let i = 0; i < 10; i++) {
        const name = chain.generate(constraints);
        content += name;
        if (namebase.includes(name)) {
          content += "    *";
        }
        content += "\n";
      }      
    } catch (ex) {
      content += ex;
    }


    await interaction.editReply(content);
  },
};
