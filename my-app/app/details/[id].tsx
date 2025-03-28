import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function Details() {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>Ciao {id}</Text>
		</View>
	);
}
