import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export function HeaderIndex() {
	const { top, left, right } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { marginTop: top, marginLeft: left, marginRight: right }]}>
			<View style={styles.leftContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image source={require("../../assets/icons/menu.png")} style={styles.icon} />
				</TouchableOpacity>
			</View>

			<View style={styles.centerContainer}>
				<Text style={styles.text}>Stasera in TV</Text>
			</View>

			<View style={styles.rightContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image source={require("../../assets/icons/search.png")} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{ marginLeft: 16 }}>
					<Image source={require("../../assets/icons/calendar.png")} style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 60,
	},
	leftContainer: {
		flex: 1,
		paddingLeft: 16,
		justifyContent: "center",
	},
	centerContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	rightContainer: {
		flex: 1,
		paddingRight: 16,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.secondary.light,
	},
	icon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
		tintColor: "#FFF",
	},
});
