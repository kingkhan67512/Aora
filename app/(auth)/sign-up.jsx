import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useRouter, Link } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const router = useRouter();  // Make sure you call useRouter to get the router object

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Avoid proceeding if validation fails
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      console.log("User created successfully:", result);
      
      // Navigate to home page after user is created
      router.replace("/home");  // Make sure you use 'replace' to navigate to Home without stack issues
    } catch (error) {
      Alert.alert("Error", error.message);  // Show the error in case of failure
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[25px]'
          />
          <Text className='text-2xl text-white font-semibold mt-10'>Sign up to Aora</Text>
          
          {/* Username Field */}
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles='mt-7'
          />

          {/* Email Field */}
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* Password Field */}
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          {/* Sign Up Button */}
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          {/* Link to Sign In */}
          <View className='justify-center items-center flex-row gap-2 pt-5'>
            <Text className='text-lg text-gray-100'>Already have an account?</Text>
            <Link href='/sign-in' className='text-secondary font-semibold text-lg'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
