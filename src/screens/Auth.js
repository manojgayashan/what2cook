import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../constants/colors';
import { AppContext } from '../../Context';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function Auth() {
  const navigation = useNavigation();
  const {
    user,
    authError,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
  } = useContext(AppContext);

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChooseProfileImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.7,
    });

    if (result.didCancel) {
      return;
    }

    const asset = result.assets && result.assets[0];
    if (asset?.uri) {
      setProfileImage(asset.uri);
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        navigation.goBack();
        return;
      }

      if (!displayName) {
        Alert.alert('Missing name', 'Please enter a display name for your profile.');
        setLoading(false);
        return;
      }

      if (!profileImage) {
        Alert.alert('Profile image required', 'Please select a profile image before signing up.');
        setLoading(false);
        return;
      }

      await signUpWithEmail({
        email,
        password,
        displayName,
        photoURI: profileImage,
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Authentication error', error?.message || 'Could not complete the request.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Google sign-in failed', error?.message || 'Unable to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Already signed in</Text>
        {user.photoURL ? <Image source={{ uri: user.photoURL }} style={styles.avatar} /> : null}
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.displayName || 'Guest'}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
        <TouchableOpacity style={styles.switchButton} onPress={() => navigation.goBack()}>
          <Text style={styles.switchButtonText}>Back to Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topHeader} > 
            
      {mode === 'signup' ? (
        <TouchableOpacity style={styles.backButton} onPress={() => setMode('signin')}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black900} />
        </TouchableOpacity>
      ) : 
      <View style={{ height: 16 }} />
      }
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={COLORS.black900} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</Text>

      {mode === 'signup' ? (
        <>
          <Text style={styles.label}>Display name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={displayName}
            onChangeText={setDisplayName}
            autoCapitalize="words"
          />
          <Text style={styles.label}>Profile image</Text>
          <TouchableOpacity style={styles.photoButton} onPress={handleChooseProfileImage}>
            <Text style={styles.photoButtonText}>
              {profileImage ? 'Change profile image' : 'Select profile image'}
            </Text>
          </TouchableOpacity>
          {profileImage ? <Image source={{ uri: profileImage }} style={styles.avatar} /> : null}
        </>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {authError ? <Text style={styles.error}>{authError}</Text> : null}

      <TouchableOpacity style={styles.actionButton} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color={COLORS.whiteMain} /> : <Text style={styles.actionButtonText}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={loading}>
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchButton} onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
        <Text style={styles.switchButtonText}>
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: COLORS.whiteMain,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.black900,
    marginBottom: 24,
    textAlign: 'center',
  },
  topHeader: {
        position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    width: '100%',
    alignItems: 'center',
    // Adjust this height as needed to ensure the back button doesn't overlap content
  },
  backButton: {
    alignSelf: 'center',

  },
  backButtonText: {
    color: COLORS.primaryMain,
    fontSize: 15,
    fontWeight: '600',
  },
  label: {
    color: COLORS.black700,
    marginBottom: 8,
    marginTop: 12,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: COLORS.white100,
  },
  actionButton: {
    marginTop: 24,
    backgroundColor: COLORS.primaryMain,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.whiteMain,
    fontWeight: '700',
    fontSize: 16,
  },
  googleButton: {
    marginTop: 14,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  googleButtonText: {
    color: COLORS.black900,
    fontWeight: '700',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  switchButtonText: {
    color: COLORS.primaryMain,
    fontWeight: '600',
    fontSize: 15,
  },
  photoButton: {
    backgroundColor: COLORS.white100,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  photoButtonText: {
    color: COLORS.black900,
    fontWeight: '600',
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    marginTop: 16,
    alignSelf: 'center',
  },
  error: {
    color: COLORS.danger || '#D32F2F',
    marginTop: 12,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    color: COLORS.black900,
    marginBottom: 8,
  },
});
