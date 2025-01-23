import React, {FC, useState} from 'react';
import {Alert, Button, KeyboardAvoidingView, View} from 'react-native';
import colors from '../styles/colors';
import styled from 'styled-components/native';
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import TextInputField from '../constants/TextInputField';
import {ActivityIndicator} from 'react-native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import Typography from '../constants/Typography';

const LoginScreen: FC<any> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      Alert.alert(`Sign in failed: + ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
      Alert.alert('Check your emails');
    } catch (error: any) {
      console.log(error);
      Alert.alert(`Sign Up failed: + ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaViewContainer>
      <ViewContainer>
        <KeyboardAvoidingViewContainer behavior="padding">
          <TitleContainer>
            <Typography text="PentaValue" textAlign="left" size={40} />
          </TitleContainer>
          <View>
            <TextInputField
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInputField
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <ButtonsContainer>
            {loading ? (
              <ActivityIndicator size={'large'} color={colors.grey} />
            ) : (
              <ButtonsContainer>
                <Button title="Sign In" onPress={signIn} />
                <Button title="Create Account" onPress={signUp} />
              </ButtonsContainer>
            )}
          </ButtonsContainer>
        </KeyboardAvoidingViewContainer>
      </ViewContainer>
    </SafeAreaViewContainer>
  );
};

export default LoginScreen;

const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;
const ViewContainer = styled.View`
  flex: 1;
  margin-horizontal: 20px;
`;

const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  flex: 0.9;
  justify-content: space-evenly;
`;

const TitleContainer = styled.View`
  margin: 20px;
`;

const ButtonsContainer = styled.View`
  margin-horizontal: 20px;
`;
