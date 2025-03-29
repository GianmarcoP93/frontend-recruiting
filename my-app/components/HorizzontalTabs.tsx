// components/HorizontalTabs.tsx
import React, { useRef, useEffect } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View, LayoutChangeEvent, Dimensions } from "react-native";
import Colors from "@/constants/Colors";
import { PlatformItem } from "@/utils/types";

interface HorizontalTabsProps {
	platforms: PlatformItem[];
	selectedIndex: number;
	onPressTab: (index: number) => void;
}

const piatMap: Record<string, string> = {
	dvb: "Digitale Terrestre",
	sky_intrattenimento: "Sky Intrattenimento",
	sky_sport: "Sky Sport",
	sky_cinema: "Sky Cinema",
	sky_news: "Sky News",
	sky_documentari: "Sky Documentari",
	sky_bambini: "Sky Bambini",
	sky_musica: "Sky Musica",
};

export default function HorizontalTabs({ platforms, selectedIndex, onPressTab }: HorizontalTabsProps) {
	const scrollRef = useRef<ScrollView>(null);
	const layoutRef = useRef<{ x: number; width: number }[]>([]);

	const screenWidth = Dimensions.get("window").width;

	useEffect(() => {
		const selectedLayout = layoutRef.current[selectedIndex];
		if (selectedLayout && scrollRef.current) {
			const centerOffset = selectedLayout.x - screenWidth / 2 + selectedLayout.width / 2;

			scrollRef.current.scrollTo({
				x: centerOffset > 0 ? centerOffset : 0,
				animated: true,
			});
		}
	}, [selectedIndex]);

	const onLayoutTab = (event: LayoutChangeEvent, index: number) => {
		const { x, width } = event.nativeEvent.layout;
		layoutRef.current[index] = { x, width };
	};

	return (
		<View style={styles.tabsContainer}>
			<ScrollView
				ref={scrollRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.scroll}
				contentContainerStyle={styles.contentContainer}
			>
				{platforms.map((item, index) => {
					const isSelected = index === selectedIndex;
					const label = piatMap[item.piat] || item.piat;

					return (
						<TouchableOpacity
							key={item.piat}
							style={styles.tabItem}
							onPress={() => onPressTab(index)}
							onLayout={e => onLayoutTab(e, index)}
						>
							<Text style={[styles.tabText, isSelected && styles.selectedTabText]}>{label}</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	tabsContainer: {
		height: 50,
		justifyContent: "center",
	},
	scroll: {
		flexGrow: 0,
	},
	contentContainer: {
		alignItems: "center",
		paddingHorizontal: 16,
	},
	tabItem: {
		marginRight: 16,
	},

	tabText: {
		fontSize: 16,
		color: Colors.yellow.dark,
	},
	selectedTabText: {
		color: Colors.yellow.light,
		backgroundColor: Colors.greyscale.selected,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
});
