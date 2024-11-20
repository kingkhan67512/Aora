import { View, Text,Image,TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import {icons} from '../constants'
const FormField = ({title,otherStyles,value,placeholder,handleChangeText,...props}) => {
    const[showPassword,setshowPassword]=useState(false)
    return (
      <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className="flex-row bg-black-100 w-full h-16 px-4 border-2 border-black rounded-2xl  items-center">
        <TextInput
            className='flex-1 text-white font-psemibold text-base w-full focus:border-secondary'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
      />
        {title === 'Password' && (
            <TouchableOpacity 
                onPress={()=> setshowPassword(!showPassword)}>
            <Image 
                source={!showPassword ? icons.eye: icons.eyehide}
                className='h-6 w-6'
                resizeMode='contain'
            />
            </TouchableOpacity>
        )}
      </View>
      </View>
      
    );
}
  
export default FormField