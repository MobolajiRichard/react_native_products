import { Alert } from 'react-native'

export const showAlert = () => {
  Alert.alert(
    'Checkout',
    'You are about to be directed to the checkout page',
    [
        {
            text:'Cancel',
            style:'cancel'
        },
        {
            text:'Proceed'
        }
    ],
    {cancelable:false}
  )
}

