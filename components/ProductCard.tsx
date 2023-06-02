

import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import {COLOR, IMAGE} from '../constant'
import ArrowLeft from '../assets/icons/ArrowLeft'
import { AntDesign } from '@expo/vector-icons';

export default function ProductCard({product, setSelectedProducts}) {
    const [checked, setChecked] = useState(false)
    const onSelect = () => {
        setChecked(prev => !prev)
        setSelectedProducts((selected) => [...selected, product])
    }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
            <Image  source={product.image}/>
            <Pressable onPress={() => setChecked(prev => !prev)} style={[styles.checkbox, checked && styles.check]}>
            {checked && <AntDesign name="check" size={18} color={COLOR.black} />}
            </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.desc}>{product?.desc}</Text>
        <View style={styles.properties}>
            <Text style={styles.weight}>{product?.weight} LB</Text>
            <View style={styles.divider}></View>
            <Text style={styles.price}>{product?.price}$</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:1,
        borderColor:COLOR.neutral,
        borderRadius:10,
        margin:8
    },
    imageContainer:{
        flex:0.68,
        borderBottomWidth:1,
        borderBottomColor:COLOR.neutral,
        alignItems:'center',
        justifyContent:'center',
        position:'relative',
        paddingVertical:28,
        paddingHorizontal:42
    },
    checkbox:{
        width:24,
        height:24,
        borderWidth:2,
        borderColor:COLOR.primary,
        borderRadius:6,
        position:'absolute',
        top:0,
        right:0,
        marginTop:12,
        marginRight:12,
        // padding:7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    check:{
        backgroundColor:COLOR.primary
    },
    textContainer:{
        paddingVertical:12,
        paddingHorizontal:10,
    },
    title:{
        fontFamily: 'outfit_medium',
        color:COLOR.black,
        fontSize:17,
        marginBottom:2      
    },
    desc:{
        fontFamily:'outfit_light',
        color:COLOR.grey,
        fontSize:14,
        marginBottom:2      
    },
    properties:{
        flexDirection:'row',
        width:76,
        justifyContent:'space-between',
        alignItems:'center'
    },
    weight:{
        fontFamily:'outfit_light',
        fontSize:14,
    },
    divider:{
        borderRightWidth:2,
        borderRightColor:COLOR.neutral,
        height:14

    },
    price:{
        fontFamily:'outfit_regular',
        fontSize:14
    }

})