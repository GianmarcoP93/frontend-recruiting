import data from "@/data.json";
import { ProgramData, ProgramItem } from "@/utils/types";

export function getAllPrograms(): ProgramItem[] {
	const programData = data as ProgramData;
	return programData.stasera.flatMap(item =>
		item.canali.map(c => ({
			piat: item.piat,
			canale: c.canale,
			prog: c.prog,
		}))
	);
}
