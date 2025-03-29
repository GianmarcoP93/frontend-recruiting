import React, { createContext, useContext, useState, ReactNode } from "react";

type CurrentProgContextType = {
	progId: string | undefined;
	setProgId: (id: string | undefined) => void;
};

const CurrentProgContext = createContext<CurrentProgContextType>({
	progId: undefined,
	setProgId: () => {},
});

export function CurrentProgProvider({ children }: { children: ReactNode }) {
	const [progId, setProgId] = useState<string | undefined>(undefined);
	return <CurrentProgContext.Provider value={{ progId, setProgId }}>{children}</CurrentProgContext.Provider>;
}

export function useCurrentProg() {
	return useContext(CurrentProgContext);
}
