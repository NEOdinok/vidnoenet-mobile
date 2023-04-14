import { Pressable, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { clearData } from '../../utils/asyncStorage';
import store from '../../stores/store';
import { observer } from 'mobx-react-lite';

const LogOutBtn: React.FC = () => {
	const AuthCtx = useContext(AuthContext);
	return (
		<Pressable onPress={ () => { 
			Alert.alert(
				'Выход',
				'Вы уверены, что хотите выйти из системы ?',
				[
					{
						text: 'Отмена',
						style: 'cancel',
					},
					{
						text: 'OK', 
						onPress: () => {store.logUserOut()},
					},
				],
				{cancelable: false},
			);}
		}>
			<AntDesign name="logout" size={24} color="red" />
		</Pressable>
	);
}
 
// export default LogOutBtn;
export default observer(LogOutBtn);