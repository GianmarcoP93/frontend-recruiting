import Colors from "@/constants/Colors";
import { ProgramCardProps } from "@/utils/types";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

export default function ProgramCard({
	progId,
	backgroundImage,
	programTitle,
	channelNumber,
	startTime,
	category,
}: ProgramCardProps) {
	const router = useRouter();

	return (
		<TouchableOpacity onPress={() => router.push(`/details/${progId}`)}>
			<View style={styles.cardContainer}>
				<ImageBackground source={{ uri: backgroundImage }} resizeMode="cover" style={styles.backgroundImage}>
					<View style={styles.overlay}>
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							{programTitle}
						</Text>

						<View style={{ flexDirection: "row", gap: 4 }}>
							<Text style={styles.info}>#{channelNumber} |</Text>
							<Text style={[styles.info, { color: Colors.yellow.light }]}>{startTime} -</Text>
							<Text style={[styles.info, { color: Colors.secondary.dark }]}>{category}</Text>
						</View>
					</View>
				</ImageBackground>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		width: Dimensions.get("window").width - 32,
		height: 250,
		borderRadius: 8,
		overflow: "hidden",
		marginVertical: 15,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: "flex-end",
	},
	overlay: {
		backgroundColor: "rgba(60, 60, 60, 0.92)",
		margin: 10,
		padding: 20,
		borderRadius: 8,
	},
	title: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "700",
	},
	info: {
		color: "#fff",
		fontSize: 16,
		marginTop: 2,
	},
});
