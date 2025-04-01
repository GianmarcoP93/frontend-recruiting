import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

interface DynamicTextWrapperProps {
	description: string;
	bk?: string;
	styles: {
		description: object;
		descriptionBk: object;
	};
}

const DynamicTextWrapper = ({ description, bk, styles }: DynamicTextWrapperProps) => {
	const [containerWidth, setContainerWidth] = useState<number | null>(null);
	const [textParts, setTextParts] = useState({ first: "", second: "" });

	useEffect(() => {
		if (containerWidth && bk) {
			const availableWidth = containerWidth - 110;

			const charsPerLine = Math.floor(availableWidth / 6.7);
			const maxChars = charsPerLine * 6;

			setTextParts({
				first: description.substring(0, maxChars),
				second: description.substring(maxChars),
			});
		}
	}, [containerWidth, description, bk]);

	return (
		<View
			style={{ flex: 1, marginBottom: 20 }}
			onLayout={event => {
				setContainerWidth(event.nativeEvent.layout.width);
			}}
		>
			{bk ? (
				<>
					<View style={{ flexDirection: "row" }}>
						<Image source={{ uri: bk }} style={{ width: 100, height: 130 }} resizeMode="cover" />
						<Text style={[styles.descriptionBk, { flex: 1, paddingLeft: 10 }]}>{textParts.first}</Text>
					</View>
					{textParts.second ? (
						<Text style={[styles.descriptionBk, { marginTop: 5 }]}>{textParts.second}</Text>
					) : null}
				</>
			) : (
				<Text style={styles.description}>{description}</Text>
			)}
		</View>
	);
};

export default DynamicTextWrapper;
