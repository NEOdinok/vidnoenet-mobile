import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import HomeCard from "../comps/home/HomeCard";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { loginUser } from "../utils/auth";
import { getData } from "../utils/asyncStorage";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import store from "../stores/store";

const HomeScreen: React.FC = () => {
  // const [refreshing, setRefreshing] = useState(false);
  const AuthCtx = useContext(AuthContext);

  const onRefresh = useCallback(async () => {
    store.changeIsRefreshing(true);
    const dataFromAsyncStorage = await getData();
    const res = await loginUser(dataFromAsyncStorage.login, dataFromAsyncStorage.password);
    if (res) AuthCtx.fillUserData(res);
    store.changeIsRefreshing(false);
  }, []);

	return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={store.isRefreshing} onRefresh={onRefresh} />
        }
      >
        <HomeCard />
      </ScrollView>
    </View>
	);
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
		backgroundColor: "#fff",
  }
});
 