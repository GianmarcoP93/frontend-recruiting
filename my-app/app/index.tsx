import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from "react-native";
import data from "../data.json";
import ChannelList from "@/components/ChannelList";
import HorizontalTabs from "@/components/HorizzontalTabs";
import { PlatformItem, ProgramData } from "@/utils/types";

const programData = data as ProgramData;
const screenWidth = Dimensions.get("window").width;

export default function Index() {
	const stasera: PlatformItem[] = programData.stasera;

	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollRef = useRef<ScrollView>(null);

	const handleSelectTab = (index: number) => {
		setSelectedIndex(index);

		scrollRef.current?.scrollTo({
			x: index * screenWidth,
			animated: true,
		});
	};

	const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const newIndex = Math.round(offsetX / screenWidth);
		setSelectedIndex(newIndex);
	};

	return (
		<View style={styles.container}>
			<HorizontalTabs platforms={stasera} selectedIndex={selectedIndex} onPressTab={handleSelectTab} />

			<ScrollView
				ref={scrollRef}
				horizontal
				pagingEnabled
				onMomentumScrollEnd={handleMomentumScrollEnd}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
			>
				{stasera.map((item, idx) => (
					<View key={idx} style={{ width: screenWidth }}>
						<View style={{ paddingHorizontal: 16 }}>
							<ChannelList canali={item.canali} />
						</View>
					</View>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
