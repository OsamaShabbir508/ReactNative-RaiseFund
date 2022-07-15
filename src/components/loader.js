import React from "react";
import { Modal,View,Text,ActivityIndicator } from "react-native";
import Colros from '../theme/color';
import {useSelector} from 'react-redux'

const AppLoader=()=>{
    const {loader} = useSelector(state => state.user);
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={loader}
        >
            <View style={{
                height:'100%',
                width:'100%',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <ActivityIndicator color={Colros.darkBlue} size='large' />

            </View>
        </Modal>
    )
}
export default AppLoader;