import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ProgramData, ProgramItem } from "@/utils/types";
import { formatLocalTime } from "@/utils/dateUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { piatMap } from "@/utils/piatName";
import Colors from "@/constants/Colors";
import { useCurrentProg } from "@/contexts/currentProgContext";
import { getAllPrograms } from "@/utils/getAllPrograms";
import DynamicTextWrapper from "@/components/DynamicTextWrapper";

export default function Details() {
	const { progId } = useLocalSearchParams();
	const { setProgId } = useCurrentProg();

	useEffect(() => {
		if (Array.isArray(progId)) {
			setProgId(progId[0]);
		} else {
			setProgId(progId);
		}
	}, [progId, setProgId]);

	const [isFavorite, setIsFavorite] = useState(false);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const program: ProgramItem | undefined = useMemo(() => {
		return getAllPrograms().find(elem => elem.prog && elem.prog.id === progId);
	}, [progId]);

	if (!program) {
		return (
			<View style={styles.container}>
				<Text style={styles.notFound}>Programma non trovato</Text>
			</View>
		);
	}

	const platformName = piatMap[program.piat] ?? program.piat;

	const { title, description, image, inizio, fine, durata, category, bk } = program.prog;

	const startTime = formatLocalTime(inizio);
	const endTime = formatLocalTime(fine);

	const durationMinutes = durata
		? parseInt(durata.toString(), 10)
		: (new Date(fine).getTime() - new Date(inizio).getTime()) / (1000 * 60);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				<ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
					<View style={styles.container}>
						<View style={styles.card}>
							<View style={styles.headerContainer}>
								<View style={styles.backgroundWrapper}>
									<Image
										source={{ uri: image }}
										style={styles.backgroundImage}
										resizeMode="cover"
										blurRadius={5}
									/>
									<View style={styles.backgroundOverlay} />
								</View>

								<View style={styles.navControlsContainer}>
									<TouchableOpacity style={styles.iconContainer}>
										<Image
											source={require("../../assets/icons/play.png")}
											resizeMode="cover"
											style={styles.playIcon}
										/>
									</TouchableOpacity>
									<TouchableOpacity style={styles.iconContainer} onPress={toggleFavorite}>
										<Image
											source={
												isFavorite
													? require("../../assets/icons/like.png")
													: require("../../assets/icons/unlike.png")
											}
											resizeMode="cover"
											style={styles.heartIconImage}
										/>
									</TouchableOpacity>
								</View>

								<View style={styles.mainImageContainer}>
									<Image source={{ uri: image }} style={styles.mainImage} resizeMode="cover" />
								</View>
							</View>

							<View style={styles.infoContainer}>
								<Text style={styles.title}>{title}</Text>
								<View style={styles.channelContainer}>
									<Text style={styles.channelText}>
										{program.canale.name} | #{program.canale.number} su {platformName}
									</Text>
								</View>

								<Text style={styles.today}>Oggi</Text>

								<View style={styles.timeContainer}>
									<View style={styles.timeWrapper}>
										<Image
											source={require("../../assets/icons/clock.png")}
											resizeMode="cover"
											style={styles.timeIcon}
										/>
										<Text style={styles.time}>
											{startTime} - {endTime}
										</Text>
										<Text style={styles.duration}>{durationMinutes} min</Text>
									</View>
									<View style={styles.additionalTime}>
										<Image
											source={require("../../assets/icons/clock.png")}
											resizeMode="cover"
											style={styles.timeIcon}
										/>
										<Text style={styles.altriOrari}>Altri orari</Text>
									</View>
								</View>

								<Text style={styles.categoryLabel}>{category}</Text>

								<View style={{ flex: 1 }}>
									<View style={{ flexDirection: "row" }}>
										<DynamicTextWrapper description={description} bk={bk} styles={styles} />
									</View>
								</View>

								<View style={styles.problemContainer}>
									<Text style={styles.infoIcon}>ⓘ</Text>
									<Text style={styles.reportProblem}>Segnala un problema </Text>
									<Text style={styles.infoIcon}>&gt;</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={styles.footerContainer}>
					<View style={styles.pillContainer}>
						<Text style={styles.pillText}>Trailer</Text>
						<Text style={styles.pipeText}>|</Text>
						<Text style={styles.pillText}>Youtube</Text>
						<Text style={styles.pipeText}>|</Text>
						<Text style={styles.pillText}>Google</Text>
					</View>

					<View style={styles.shareButtons}>
						<View style={styles.social}>
							<Image
								source={require("../../assets/icons/share.png")}
								resizeMode="cover"
								style={styles.footerIcon}
							/>
						</View>
						<View style={styles.social}>
							<Image
								source={require("../../assets/icons/bell.png")}
								resizeMode="cover"
								style={styles.footerIcon}
							/>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	notFound: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
		marginTop: 50,
	},
	card: {
		flex: 1,
	},
	headerContainer: {
		height: 320,
		position: "relative",
		overflow: "hidden",
	},
	iconContainer: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.greyscale.extraDark,
		borderRadius: 20,
	},
	playIcon: {
		width: 25,
		height: 25,
	},
	heartIconImage: {
		width: 20,
		height: 20,
	},
	backgroundWrapper: {
		position: "absolute",
		width: "100%",
		height: "100%",
		overflow: "hidden",
	},
	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0.9,
	},
	backgroundOverlay: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(20, 20, 20, 0.65)",
	},
	navControlsContainer: {
		position: "absolute",
		top: 45,
		left: 15,
		right: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		zIndex: 10,
	},
	mainImageContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		zIndex: 2,
	},
	mainImage: {
		width: "100%",
		height: Dimensions.get("window").width * 0.6,
		borderRadius: 8,
		resizeMode: "cover",
	},
	infoContainer: {
		paddingHorizontal: 16,
		paddingTop: 10,
	},
	title: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	channelContainer: {
		marginVertical: 8,
	},
	channelText: {
		color: "#fff",
		fontSize: 14,
	},
	today: {
		color: "#ffcc00",
		fontWeight: "bold",
	},
	timeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	timeWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	timeIcon: {
		marginRight: 8,
		width: 20,
		height: 20,
	},
	time: {
		color: Colors.yellow.light,
		fontWeight: "bold",
		marginRight: 8,
	},
	duration: {
		color: Colors.info,
	},
	additionalTime: {
		backgroundColor: Colors.greyscale.darkgrey,
		padding: 8,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	altriOrari: {
		color: Colors.yellow.light,
		fontSize: 14,
	},
	categoryLabel: {
		color: Colors.secondary.dark,
		fontWeight: "bold",
		marginTop: 16,
		marginBottom: 4,
	},
	description: {
		color: Colors.greyscale.white,
		marginBottom: 16,
		fontSize: 16,
		fontWeight: "300",
	},
	descriptionBk: {
		color: Colors.greyscale.white,
		fontSize: 16,
		fontWeight: "300",
	},
	problemContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoIcon: {
		color: Colors.info,
		marginRight: 8,
		fontSize: 16,
	},
	reportProblem: {
		color: Colors.info,
		fontSize: 14,
		textDecorationLine: "underline",
	},

	footerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 16,
	},
	pillContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: Colors.secondary.light,
		borderWidth: 2,
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	pillText: {
		color: Colors.greyscale.white,
		fontSize: 16,
	},
	pipeText: {
		color: Colors.greyscale.white,
		fontSize: 16,
		marginHorizontal: 8,
	},
	shareButtons: {
		flexDirection: "row",
	},
	social: {
		width: 40,
		height: 40,
		borderWidth: 3,
		borderColor: Colors.secondary.light,
		borderRadius: 20,
		marginLeft: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	footerIcon: {
		width: 20,
		height: 20,
	},
	bkImg: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
});
