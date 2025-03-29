export interface ProgramItem {
	piat: string;
	canale: {
		name: string;
		logo: string;
		number: string | number;
		live?: string;
	};
	prog: Programma;
}

export interface ProgramData {
	stasera: PlatformItem[];
	at: string;
}

export interface PlatformItem {
	piat: string;
	canali: CanaleItem[];
}

export interface CanaleItem {
	canale: {
		name: string;
		logo: string;
		number: string | number;
		live?: string;
	};
	prog: Programma;
}

export interface Programma {
	id: string;
	title: string;
	description: string;
	durata: string | number;
	genre: string;
	category: string;
	image: string;
	episode_number?: string | number;
	series_number?: string | number;
	director: string | null;
	inizio: string;
	fine: string;
	condividi: string;
	year: string;
	ac?: Actor[];
	trailer?: { id: string };
	rating?: string;
	pr?: string;
	bk?: string;
	prima?: boolean;
	tiEp?: string;
	trEp?: string;
}

export interface Actor {
	n: string;
	i: string;
	c: string;
	u: string;
}

export interface ProgramCardProps {
	progId: string;
	backgroundImage: string;
	programTitle: string;
	channelNumber: string | number;
	startTime: string;
	category: string;
}
