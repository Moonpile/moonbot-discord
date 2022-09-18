import { Command } from "./Command";
import { PhaseCommand } from "./commands/PhaseCommand";
import { RollCommand } from "./commands/RollCommand";
import { DiceCommand } from "./commands/DiceCommand";
import { NameCommand } from "./commands/NameCommand";
import { DawnCommand } from "./commands/DawnCommand";

export const Commands: Command[] = [DawnCommand, DiceCommand, NameCommand, PhaseCommand, RollCommand];
