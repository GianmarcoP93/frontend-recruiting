import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import data from "@/data.json";
import { ProgramData, ProgramItem } from "@/utils/types";
import { useCurrentProg } from "@/contexts/currentProgContext";
import { getAllPrograms } from "@/utils/getAllPrograms";

export function HeaderDetail() {
	const { top } = useSafeAreaInsets();
	const router = useRouter();

	const { progId } = useCurrentProg();

	const allPrograms = useMemo(() => getAllPrograms(), []);

	const currentIndex = useMemo(() => {
		if (!progId) return -1;
		return allPrograms.findIndex(p => p.prog.id === progId);
	}, [progId, allPrograms]);

	const canGoPrev = currentIndex > 0;
	const canGoNext = currentIndex >= 0 && currentIndex < allPrograms.length - 1;

	const goPrev = () => {
		if (canGoPrev) {
			const prevProg = allPrograms[currentIndex - 1];
			router.replace(`/details/${prevProg.prog.id}`);
		}
	};

	const goNext = () => {
		if (canGoNext) {
			const nextProg = allPrograms[currentIndex + 1];
			router.replace(`/details/${nextProg.prog.id}`);
		}
	};

	const goBack = () => {
		router.back();
	};

	return (
		<View style={[styles.container, { marginTop: top }]}>
			<View style={styles.leftContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image
						source={require("../../assets/icons/menu.png")}
						style={[styles.icon, { width: 30, height: 30 }]}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.centerContainer}>
				<View style={styles.buttonsRow}>
					<TouchableOpacity
						onPress={canGoPrev ? goPrev : undefined}
						disabled={!canGoPrev}
						style={[styles.buttonNav, !canGoPrev && styles.disabledButton]}
					>
						<Image
							source={require("../../assets/icons/left-arrow.png")}
							style={[styles.icon, { width: 16, marginRight: 8 }]}
						/>
						<Text style={styles.buttonText}>Precedente</Text>
					</TouchableOpacity>

					<View style={styles.divider} />

					<TouchableOpacity
						onPress={canGoNext ? goNext : undefined}
						disabled={!canGoNext}
						style={[styles.buttonNav, !canGoNext && styles.disabledButton]}
					>
						<Text style={styles.buttonText}>Successivo</Text>
						<Image
							source={require("../../assets/icons/right-arrow.png")}
							style={[styles.icon, { width: 16, marginLeft: 8 }]}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.rightContainer}>
				<TouchableOpacity onPress={goBack}>
					<Image source={require("../../assets/icons/left-arrow.png")} style={styles.icon} />
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
		paddingHorizontal: 16,
		justifyContent: "space-between",
	},
	leftContainer: {
		justifyContent: "center",
	},
	rightContainer: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
	centerContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonsRow: {
		flexDirection: "row",
		backgroundColor: Colors.greyscale.darkgrey,
		borderRadius: 20,
		paddingHorizontal: 8,
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
	disabledButton: {
		opacity: 0.5,
	},
	icon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
		tintColor: "#FFF",
	},
});
