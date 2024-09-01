import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import TextComponent from '../../components/TextComponent';
import { Montserrat_Bold, MontserratMedium, MontserratSemiBold } from '../../constants/fontConstants';
import { LOGINSCREEN } from '../../constants/screenNameConstants';
import { goBack, resetScreen } from '../../utils/utils';
import haversine from 'haversine-distance';
import styles from './style';

const { width: viewportWidth } = Dimensions.get('window');

const Details: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item }: any = route.params;

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [unlockVisible, setUnlockVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      checkProximity();
    }, 2000);
  }, []);

  const checkProximity = () => {
    const userLocation = {
      latitude: 28.6328,  // Example: Connaught Place, New Delhi
      longitude: 77.2197, 
    };

    const targetLocation = {
      latitude:  item?.coordinates?.latitude,
      longitude: item?.coordinates?.longitude
    };
    console.log(targetLocation)

    const distance = haversine(userLocation, targetLocation);

    if (distance <= 30) {
      setUnlockVisible(true);
    } else {
      Alert.alert('You are too far from the property to unlock it.');
    }
  };

  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack(navigation)} style={styles.backarrow}>
          <Image source={{ uri: 'https://static.thenounproject.com/png/1165042-200.png' }} resizeMode={'contain'} height={20} width={20} />
        </TouchableOpacity>
        <TextComponent
          value="Property Details"
          color="#000"
          fontFamily={Montserrat_Bold}
          fontSize={14}
        />
        <TouchableOpacity onPress={() => {
          AsyncStorage.setItem('user', "");
          resetScreen(navigation, LOGINSCREEN);
        }} style={styles.logoutButton}>
          <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/interface-essentials-1-2/24/logout--logout-frame-leave-exit-arrow-right-circle-512.png' }} resizeMode={'contain'} height={20} width={20} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingIndicator}><ActivityIndicator size="large" color="#0000ff" /></View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Carousel
              loop
              autoPlay
              width={viewportWidth}
              height={300}
              data={item.images}
              renderItem={renderCarouselItem}
              pagingEnabled
            />
            <View style={styles.detailsContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'flex-end' }}>
                <TextComponent value={item.address} color="#000" fontFamily={Montserrat_Bold} fontSize={16} styles={{ flex: 1 }} />
                <View style={{ width: 10 }} />
                <TextComponent value={`₹${item.price.toLocaleString()}`} color="#ff0000" fontFamily={Montserrat_Bold} fontSize={14} />
              </View>
              <TextComponent value={item.description} color="#000" fontFamily={MontserratMedium} fontSize={14} />
              <View style={{ marginTop: 10 }}>
                <TextComponent value={`Size: ${item.size_sq_ft}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Property Age: ${item.property_age_years}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Construction Year: ${item.construction_year}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Rooms: ${item.rooms}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Bathrooms: ${item.bathrooms}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Balconies: ${item.balconies}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Car Parking: ${item.car_parking ? 'Available' : 'Not Available'}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Construction Material: ${item.construction_material}`} color="#888888" fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {unlockVisible && (
        loadingButton ? <View style={styles.loadingButton}><ActivityIndicator size={'small'} color={'#f0000f'} /></View> :
        <TouchableOpacity style={styles.unlockButton} onPress={() => {
          setLoadingButton(true)
          setTimeout(() => {
            setLoadingButton(false)
            Alert.alert('Congratulations!\nProperty Unlocked')
          },1500)
          }}>
          <TextComponent value="Unlock" color="#fff" fontFamily={Montserrat_Bold} fontSize={16} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Details;
