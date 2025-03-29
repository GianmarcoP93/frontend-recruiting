import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				header: () => <Header />,
				contentStyle: { backgroundColor: Colors.primary },
				gestureEnabled: true,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Stasera in TV",
				}}
			/>
			<Stack.Screen
				name="details/[progId]"
				options={{
					title: "Details",
					headerStyle: {
						backgroundColor: "blue",
					},
				}}
			/>
		</Stack>
	);
}
