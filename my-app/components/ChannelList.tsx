// components/ChannelList.tsx
import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import ProgramCard from "@/components/ProgramCard";
import { CanaleItem } from "@/utils/types";
import { formatLocalTime } from "@/utils/dateUtils";

interface ChannelListProps {
	canali: CanaleItem[];
}

export default React.memo(function ChannelList({ canali }: ChannelListProps) {
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		if (flatListRef.current) {
			flatListRef.current.scrollToOffset({ offset: 0, animated: true });
		}
	}, [canali]);

	return (
		<FlatList
			ref={flatListRef}
			data={canali}
			keyExtractor={(item, idx) => item.canale.name + "-" + idx}
			renderItem={({ item }) => {
				const c = item.canale;
				const p = item.prog;

				const startTime = formatLocalTime(p.inizio);

				return (
					<ProgramCard
						progId={p.id}
						backgroundImage={p.image}
						programTitle={p.title}
						channelNumber={c.number}
						startTime={startTime}
						category={p.category}
					/>
				);
			}}
		/>
	);
});
