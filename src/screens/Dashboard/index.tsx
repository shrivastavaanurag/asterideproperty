import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Alert } from "react-native";
import TextComponent from "../../components/TextComponent";
import { database } from "../../config/firebaseConfig";
import {
  Montserrat_Bold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../constants/fontConstants";
import styles from "./style";
import { NavigationProp, useNavigation } from '@react-navigation/native'; 
import { navigateScreen, resetScreen } from "../../utils/utils";
import { DETAILS, LOGINSCREEN } from "../../constants/screenNameConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface DashboardProps {
  navigation: NavigationProp<any>;
}


const Dashboard: React.FC<DashboardProps> = (props) => {
  const { navigation } = props;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const propertiesListing = ref(database, "properties/");
    
    const unsubscribe = onValue(propertiesListing, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const properties = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setData(properties);
      } else {
        setData([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to load data.");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePress = (item: any) => {
    navigateScreen(navigation, DETAILS, { item });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />

      <View style={styles.info}>
        <TextComponent
          value={item.address}
          color="#fff"
          fontFamily={Montserrat_Bold}
          fontSize={16}
        />
        <TextComponent
          value={item.description}
          color="#fff"
          fontFamily={MontserratSemiBold}
          fontSize={12}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TextComponent
          value={"Properties"}
          color="#000"
          fontFamily={Montserrat_Bold}
          fontSize={14}
        />
        <TouchableOpacity onPress={() => {
          AsyncStorage.setItem('user', "");
          resetScreen(navigation, LOGINSCREEN)
        }} style={styles.logoutButton}>
          <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/interface-essentials-1-2/24/logout--logout-frame-leave-exit-arrow-right-circle-512.png' }} resizeMode={'contain'} height={20} width={20}/>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingIndicator}><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default Dashboard;
