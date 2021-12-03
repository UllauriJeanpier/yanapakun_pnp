import React, { useState ,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LocationUserScreenProps } from '../../utils/types';
import Header from '../../components/Header';
import { CallHelp } from '../../interfaces/callHelp';
import MapView, { Marker } from 'react-native-maps';
import Button from '../../components/Button';
import { FONTS } from '../../utils/constants';

const { height } = Dimensions.get('window')



interface Props extends LocationUserScreenProps { }

interface RouteParams {
    user: CallHelp
  }

export const LocationUserScreen = ({ navigation, route }: Props) => {

    const params = route.params;
    const [isActive, setIsActive] = useState(false)
    const location = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return (
        <SafeAreaView>
          <View>
            <Header title="Historial de Emergencias" navigation={ navigation } />
            <View style={ styles.container }>
                <MapView
                    mapType="standard"
                    style={ styles.mapContainer }
                    initialRegion={ location }
                >
                    <Marker
                        key={ 0 }
                        coordinate={location}
                        title={'Elsa'}
                        description={'Hola como estas'}
                    />
                </MapView>
                <View style={ styles.containBtns }>
                        {
                            isActive
                            ?
                            (
                            <TouchableOpacity
                                onPress={()=>setIsActive(false)}
                                style={ [styles.btn, styles.btnGreen] }
                            >
                                <Text style={ styles.btnTxt }>La emergencia ha sido atendida</Text>
                            </TouchableOpacity>
                            )
                            : 
                            (
                            <TouchableOpacity
                                onPress={()=>setIsActive(true)}
                                style={ [styles.btn, styles.btnRed] }
                            >
                                <Text style={ styles.btnTxt }>Atender emergencia</Text>
                            </TouchableOpacity>
                            )
                        }
                        {
                            isActive
                            ?
                            (
                            <TouchableOpacity style={ [styles.btn] }>
                                <Text style={ styles.btnTxt }>Sin respuesta</Text>
                            </TouchableOpacity>
                            )
                            :
                            (
                            <TouchableOpacity style={ [styles.btn] }>
                                <Text style={ styles.btnTxt }>Atender la siguiente emergencia</Text>
                            </TouchableOpacity>
                            )
                        }

                </View>
            </View>
          </View>
        </SafeAreaView>
       )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
    mapContainer : {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue'
    },
    containBtns: {
        height: '20%',
        width: '100%',
        padding: 15,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '57%'
    },
    btn: {
        width: '100%',
        backgroundColor: '#8F9290',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 17,
        marginBottom: 10
    },
    btnRed: {
        backgroundColor: '#E30027'
    },
    btnGreen:{
        backgroundColor: '#216D3F'
    },
    btnTxt: {
        color: 'white',
        fontSize: 18,
        fontFamily: FONTS.ProximaNovaBold
    }
})