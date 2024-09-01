import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import TextComponent from '../../components/TextComponent';
import { Montserrat_Bold, MontserratMedium, MontserratSemiBold } from '../../constants/fontConstants';
import { LOGINSCREEN } from '../../constants/screenNameConstants';
import { goBack, resetScreen } from '../../utils/utils';
import styles from './style';
import * as Location from 'expo-location';

// Calculate distance between two coordinates (in meters)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const { width: viewportWidth } = Dimensions.get('window');

const Details: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item }: any = route.params;

  const [loading, setLoading] = useState<boolean>(true); 
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isNearProperty, setIsNearProperty] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user location
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (userLocation && item.coordinates) {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        item.coordinates.latitude,
        item.coordinates.longitude
      );
      setIsNearProperty(distance <= 30);
      setLoading(false);
    }
  }, [userLocation, item]);

  if (!item) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderCarouselItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack(navigation)} style={styles.backarrow}>
          <Image source={{ uri: 'https://static.thenounproject.com/png/1165042-200.png' }} resizeMode={'contain'} height={20} width={20}/>
        </TouchableOpacity>
        <TextComponent
          value={"Property Details"}
          color="#000"
          fontFamily={Montserrat_Bold}
          fontSize={14}
        />
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.setItem('user', "");
          resetScreen(navigation, LOGINSCREEN);
        }} style={styles.logoutButton}>
          <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/interface-essentials-1-2/24/logout--logout-frame-leave-exit-arrow-right-circle-512.png' }} resizeMode={'contain'} height={20} width={20}/>
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
            {/* Property Details */}
            <View style={styles.detailsContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'flex-end' }}>
                <TextComponent value={item.address} color='#000' fontFamily={Montserrat_Bold} fontSize={16} styles={{ flex: 1 }}/>
                <View style={{ width: 10 }} />
                <TextComponent value={`₹${item.price.toLocaleString()}`} color='#ff0000' fontFamily={Montserrat_Bold} fontSize={14} />
              </View>
              <TextComponent value={item.description} color='#000' fontFamily={MontserratMedium} fontSize={14} />
              <View style={{ marginTop: 10 }}>
                <TextComponent value={`Size: ${item.size_sq_ft}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Property Age: ${item.property_age_years}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Construction Year: ${item.construction_year}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Rooms: ${item.rooms}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Bathrooms: ${item.bathrooms}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Balconies: ${item.balconies}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Car Parking: ${item.car_parking ? 'Available' : 'Not Available'}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
                <TextComponent value={`Construction Material: ${item.construction_material}`} color='#888888' fontFamily={MontserratSemiBold} fontSize={12} styles={{ marginTop: 5 }} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {isNearProperty && (
        <TouchableOpacity style={styles.unlockButton} onPress={() => { /* Add unlock functionality here */ }}>
          <Text style={styles.unlockButtonText}>Unlock</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Details;
