import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { auth } from '../../config/firebaseConfig'; // Adjust import paths as needed
import styles from './style';
import { resetScreen } from '../../utils/utils';
import { DASHBOARD } from '../../constants/screenNameConstants';
import TextComponent from '../../components/TextComponent';
import { Montserrat_Bold, MontserratMedium } from '../../constants/fontConstants';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginProps> = (props) => {
  const { navigation } = props;
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          resetScreen(navigation, DASHBOARD);
        } else {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              AsyncStorage.setItem('user', JSON.stringify(user));
              resetScreen(navigation, DASHBOARD);
            }
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUserStatus();
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
        resetScreen(navigation, DASHBOARD);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        AsyncStorage.setItem('user', JSON.stringify(user));
        resetScreen(navigation, DASHBOARD);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextComponent
        value={"Welcome to\nAsteride Properties"}
        styles={{ alignSelf: 'center', textAlign: 'center', marginBottom: 30 }}
        fontFamily={Montserrat_Bold}
        color="#000"
        fontSize={16}
      />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading} > 
        <TextComponent value={"Login"} fontFamily={MontserratMedium} color='#000' fontSize={12} styles={{ textAlign: 'center', padding: 10 }}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.transparentbutton} onPress={() => setShowRegisterForm(true)} disabled={loading} > 
        <TextComponent value={"Don't have account? Register Here!"} fontFamily={MontserratMedium} color='#000' fontSize={12} styles={{ textAlign: 'center', padding: 10 }}/>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Modal
        visible={showRegisterForm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRegisterForm(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TextComponent
              value={"New to Asteride Properties\nRegister Here!"}
              styles={{ alignSelf: 'center', textAlign: 'center', marginBottom: 30 }}
              fontFamily={Montserrat_Bold}
              color="#000"
              fontSize={16}
            />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter Name"
            />
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading} > 
              <TextComponent value={"Register"} fontFamily={MontserratMedium} color='#000' fontSize={12} styles={{ textAlign: 'center', padding: 10 }}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.transparentbutton} onPress={() => setShowRegisterForm(false)} disabled={loading} > 
              <TextComponent value={"Already have an account? Login Here!"} fontFamily={MontserratMedium} color='#000' fontSize={12} styles={{ textAlign: 'center', padding: 10}}/>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
