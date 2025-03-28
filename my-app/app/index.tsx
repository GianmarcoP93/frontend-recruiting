import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View>
			<Text>Ciao</Text>
			<Link href="/details/1">
				<Text>Go to details</Text>
			</Link>
		</View>
	);
}
