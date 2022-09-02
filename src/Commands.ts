import { Command } from "./Command";
import { PhaseCommand } from "./commands/PhaseCommand";
import { RollCommand } from "./commands/RollCommand";
import { DiceCommand } from "./commands/DiceCommand";

export const Commands: Command[] = [DiceCommand, PhaseCommand, RollCommand];
