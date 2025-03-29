import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";

export function Header() {
	const { top, left, right } = useSafeAreaInsets();
	const route = useRoute();

	const navigation = useNavigation();

	return (
		<View style={[styles.container, { marginTop: top, marginLeft: left, marginRight: right }]}>
			<View style={styles.leftContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image source={require("../assets/icons/menu.png")} style={styles.icon} />
				</TouchableOpacity>
			</View>

			<View style={styles.centerContainer}>
				{route.name === "index" ? (
					<Text style={styles.text}>Stasera in TV</Text>
				) : (
					<View style={styles.buttonsRow}>
						<TouchableOpacity onPress={() => {}} style={[styles.buttonNav]}>
							<Image
								source={require("../assets/icons/left-arrow.png")}
								style={[styles.icon, { width: 16, marginRight: 8 }]}
							/>
							<Text style={styles.buttonText}>Precedente</Text>
						</TouchableOpacity>

						<View style={styles.divider} />

						<TouchableOpacity onPress={() => {}} style={styles.buttonNav}>
							<Text style={styles.buttonText}>Successivo</Text>
							<Image
								source={require("../assets/icons/right-arrow.png")}
								style={[styles.icon, { width: 16, marginLeft: 8 }]}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>

			<View style={styles.rightContainer}>
				{route.name === "index" ? (
					<>
						<TouchableOpacity onPress={() => {}}>
							<Image source={require("../assets/icons/search.png")} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {}} style={{ marginLeft: 16 }}>
							<Image source={require("../assets/icons/calendar.png")} style={styles.icon} />
						</TouchableOpacity>
					</>
				) : (
					<>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Image source={require("../assets/icons/left-arrow.png")} style={styles.icon} />
						</TouchableOpacity>
					</>
				)}
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
	buttonsRow: {
		flexDirection: "row",
		backgroundColor: Colors.greyscale.darkgrey,
		borderRadius: 20,
	},
	buttonNav: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 4,
		paddingVertical: 4,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFF",
	},
	divider: {
		width: 1,
		backgroundColor: "#555",
		marginHorizontal: 8,
		alignSelf: "stretch",
	},
});
