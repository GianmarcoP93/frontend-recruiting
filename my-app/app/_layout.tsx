import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				contentStyle: { backgroundColor: Colors.primary },
				gestureEnabled: true,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					header: () => <Header />,
					title: "Stasera in TV",
				}}
			/>
			<Stack.Screen
				name="details/[id]"
				options={{
					title: "Details",

					contentStyle: { backgroundColor: "yellow" },
					headerStyle: {
						backgroundColor: "blue",
					},
				}}
			/>
		</Stack>
	);
}
