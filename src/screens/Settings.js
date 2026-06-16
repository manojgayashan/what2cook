import React, { useContext } from 'react'
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { settingsStyles as styles } from '../constants/styles'
import { AppContext } from '../../Context'

export default function Settings() {
  const navigation = useNavigation();
  const { user, signOut } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
          {user ? (
            <>
              {user.photoURL ? <Image source={{ uri: user.photoURL }} style={styles.profileImage} /> : null}
              <Text style={styles.item}>Name: {user.displayName || 'Guest'}</Text>
              <Text style={styles.item}>Email: {user.email}</Text>
              <TouchableOpacity style={styles.authButton} onPress={signOut}>
                <Text style={styles.authButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('Auth')}>
              <Text style={styles.authButtonText}>Sign In / Sign Up</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.item}>Profile</Text>
          <Text style={styles.item}>Notifications</Text>
          <Text style={styles.item}>Privacy</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <Text style={styles.item}>Dark Mode</Text>
          <Text style={styles.item}>Language</Text>
          <Text style={styles.item}>About</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Text style={styles.item}>Terms of Service</Text>
          <Text style={styles.item}>Privacy Policy</Text>
          <Text style={styles.item}>Send Feedback</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


