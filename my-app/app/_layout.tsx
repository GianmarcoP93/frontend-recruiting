// RootLayout.tsx
import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { HeaderIndex } from "@/components/Header/HeaderIndex";
import { HeaderDetail } from "@/components/Header/HeaderDetails";
import { CurrentProgProvider } from "@/contexts/currentProgContext";

export default function RootLayout() {
	return (
		<CurrentProgProvider>
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
						title: "Stasera in TV",
						header: () => <HeaderIndex />,
					}}
				/>
				<Stack.Screen
					name="details/[progId]"
					options={{
						title: "Details",
						headerTransparent: true,
						header: () => <HeaderDetail />,
					}}
				/>
			</Stack>
		</CurrentProgProvider>
	);
}
