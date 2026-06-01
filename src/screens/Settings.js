import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import COLORS from '../constants/colors'
import { settingsStyles as styles } from '../constants/styles'

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account</Text>
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


