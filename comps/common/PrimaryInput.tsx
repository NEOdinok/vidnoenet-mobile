import { COLORS, SPACING, FONT, SIZES } from "../../constants";
import MaskInput from "react-native-mask-input";
import { StyleSheet, KeyboardTypeOptions, View, Text } from "react-native";

interface Props {
	// textInputConfig: {
	// 	value: string,
	// 	setValue: React.Dispatch<React.SetStateAction<string>>,
	// 	mask?: (string | RegExp)[],
	// 	placeholder?: string|undefined,
	// 	keyboardType?: KeyboardTypeOptions | undefined,
	// 	maxLength?: number | undefined,
	// 	secureTextEntry?: boolean | undefined,
	//  autoCorrect={autoCorrect}
	// label: string,
	// },
	value: string,
	setValue: React.Dispatch<React.SetStateAction<string>>,
	mask?: (string|RegExp)[] | undefined,
	placeholder?: string|undefined,
	keyboardType?: KeyboardTypeOptions|undefined,
	maxLength?: number|undefined,
	secureTextEntry?: boolean|undefined,
	autoCorrect?: boolean|undefined,
	label: string,
}

const PrimaryInput: React.FC<Props> = ({
	value,
	setValue,
	mask,
	placeholder,
	keyboardType,
	maxLength,
	secureTextEntry,
	autoCorrect,
	label,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<MaskInput
				placeholderTextColor={COLORS.darkText}
				value={value}
				onChangeText={(masked, unmasked) => {
					setValue(masked);
				}}
				mask={mask}
				style={styles.input}
				placeholder={placeholder}
				keyboardType={keyboardType}
				maxLength={maxLength}
				secureTextEntry={secureTextEntry}
				autoCorrect={autoCorrect}
			/>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: SPACING*1.5,
	},
	input: {
		padding: SPACING*2,
		backgroundColor: COLORS.lightPrimary,
		fontFamily: FONT.regular,
		fontSize: SIZES.small,
		borderRadius: SPACING,
		// marginVertical: SPACING*2,
	},
	label: {
		marginBottom: 4,
		fontSize: SIZES.small,
		fontFamily: FONT.regular,
		color: COLORS.darkText,
	}
})

 
export default PrimaryInput;