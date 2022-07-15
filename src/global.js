import Toast from 'react-native-toast-message';
export const baseUrl = 'https://shehnaiyan-backend.herokuapp.com';
import { Linking } from 'react-native';
export const showToast = (props) =>{
  Toast.show({
    type: props.type,
    text1: props.text,
  });
}
export const openApp = async url => {
  try {
    
    await Linking.openURL(url);
  } catch (error) {
    showToast({
      type:'error',
      text1: 'failed to open App',
    })
  }
};
const toastList=(status)=>{
  switch (status) {
    case status>=200&& status <300:
      return 'success'
    case status >=400 && status<500:
    return 'error'
    case status >=500:
      return 'error'
  
    default:
      return ''
      
  }

}
