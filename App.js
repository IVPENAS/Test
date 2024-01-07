import React, { useState} from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Text, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/FontAwesome";
import RecordingPage from './screens/RecordingPage';

const FloatingButton = () => {

 const [icon_1] = useState(new Animated.Value(40));
 const [icon_2] = useState(new Animated.Value(40));
 const [overlayOpacity] = useState(new Animated.Value(0));
 const [pop, setPop] = useState(false);
 const Stack = createNativeStackNavigator();

 /* Modal Pop In Animation */
 const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      /* Degree */
      toValue: 110,
      /* Speed */
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
   }).start();
 };

 /* Modal Pop Out Animation */
 const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
   }).start();
 };

 


 return(
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = 'Recording' component={RecordingPage}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* Dimming Animation */}
       <Animated.View style={[styles.backgroundOverlay, { opacity: overlayOpacity }]} />

      {/* Upload Button */}
      <Animated.View style={[styles.modalBox, {  right: icon_1, bottom: icon_1,}]}>
        <TouchableOpacity onPress={RecordingPage}> 
          <Icon name="upload" size={24} color="#FF9700" />
        </TouchableOpacity>
      </Animated.View>

      {/* Record Button */}
      <Animated.View style={[styles.modalBox, {  bottom: icon_2, left: icon_2,}]}>
        <TouchableOpacity>
          <Icon name="microphone" size={24} color="#FF9700" />
        </TouchableOpacity>
      </Animated.View>

      {/* NavBar */}
      {/* Scan Button */}
      <View style={styles.navbar}>
      <TouchableOpacity style={styles.scanButton} onPress={() => {pop === false ? popIn() : popOut();}}>
        <Text style = {styles.scanText}>
        <Icon name="plus" size={17} color="#FFFF"/> Scan
        </Text>
      </TouchableOpacity>
      </View>
    </View>
 );
}

export default FloatingButton;

const styles = StyleSheet.create({
container: {
flex: 1,
},
/* Navication Bar */
navbar: {
flex: 1,
position: 'absolute', 
top: 0,
left: 0,
right: 0,
bottom: '0%',
top: '90%',
backgroundColor: '#0B3954',
alignItems: 'center',
justifyContent: 'center',
},
/* Animation Modal Buttons */
modalBox: {
flex: 1,
backgroundColor:'white',
paddingVertical: 10,
paddingHorizontal: 5,
padding: 10,
width: 90,
position: 'absolute',
bottom: 40,
right: 100,
borderRadius: 10,
justifyContent: 'center',
alignItems: 'center',
},
/* Scan */
scanButton: {
backgroundColor:'#FF9700',
width: 100,
paddingVertical: 8,
paddingHorizontal: 5,
borderRadius: 10,
position: 'absolute',
justifyContent: 'center',
alignItems: 'center',
},
scanText: {
fontWeight: 'bold',
fontSize: 18,
color: 'white'
},
/* Dims the BG when Scan Button is pressed */
backgroundOverlay: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: '#c0c0c0',
opacity: 0.5,
},
})