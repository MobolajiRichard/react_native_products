import { Alert } from 'react-native'

export const showAlert = (productIsSelected:boolean) => {
  Alert.alert(
    'Checkout',
    `${productIsSelected ? 'You are about to be directed to the checkout page' : "You haven't selected any products yet, please select and try again"}`,
    [
        {
            text:'Cancel',
            style:'cancel'
        },
        {
            text:`${productIsSelected ? 'Proceed' : 'OK'}`
        }
    ],
    {cancelable:false}
  )
}

