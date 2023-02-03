import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Formik} from 'formik';
import {Colors} from '../../constants/colors/colorsConsts';
import {signInValidations} from '../../validations/authValidations';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/base';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getUserData, signInUser} from '../../helpers/auth/authHelpers';
import {
  ErrorResponse,
  SigninData,
  userDataModel,
} from '../../interfaces/auth/authInterfaces';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setUser, setUserTokens} from '../../redux/auth/authSlice';
import {setKeychainTokens} from '../../helpers/keychain/keychainHelpers';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation/auth/AuthNavigation';

type props = StackScreenProps<AuthStackParams, 'Signin'>;

const Signin = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const {replace} = navigation;

  const [viewPassword, setViewPassword] = useState(true);

  const {refetch, isFetching} = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const {error, isError, isLoading, mutate, data, isSuccess} = useMutation({
    mutationFn: signInUser,
  });

  const handleStoreData = async (loginData: SigninData) => {
    await setKeychainTokens(loginData.access_token, loginData.refresh_token);
    const {data} = await refetch();
    dispatch(setUser({...data!}));
    dispatch(setUserTokens({...loginData}));
  };

  useEffect(() => {
    if (isSuccess) {
      handleStoreData(data);
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values =>
        mutate({email: values.email, password: values.password})
      }
      validateOnMount={true}
      validationSchema={signInValidations}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <SafeAreaView style={{marginBottom: 200}}>
              <View style={styles.mainTextContainer}>
                <Text style={styles.mainText}>Signin</Text>
              </View>
              <View style={styles.inputContainer}>
                <Input
                  disabled={isLoading}
                  autoCorrect={false}
                  autoCapitalize="none"
                  inputStyle={{color: Colors.secondary}}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errorMessage={
                    errors.email && touched.email ? errors.email : undefined
                  }
                  placeholder="Email"
                  placeholderTextColor={Colors.secondary}
                  label="Email"
                  labelStyle={{textAlign: 'center', color: Colors.secondary}}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  inputStyle={{color: Colors.secondary}}
                  disabled={isLoading}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  errorMessage={
                    errors.password && touched.password
                      ? errors.password
                      : undefined
                  }
                  rightIcon={
                    values.password !== ''
                      ? {
                          type: 'font-awesome',
                          name: viewPassword ? 'eye' : 'eye-slash',
                          size: 18,
                          color: Colors.secondary,
                          onPress: () => {
                            setViewPassword(
                              prevViewPassword => !prevViewPassword,
                            );
                          },
                        }
                      : undefined
                  }
                  placeholder="Password"
                  placeholderTextColor={Colors.secondary}
                  label="Password"
                  labelStyle={{textAlign: 'center', color: Colors.secondary}}
                  secureTextEntry={viewPassword}
                />
              </View>
              <View style={styles.actionsContainer}>
                <Button
                  buttonStyle={{borderRadius: 24}}
                  color="secondary"
                  disabled={!isValid || isLoading || isFetching}
                  loading={isLoading || isFetching}
                  onPress={handleSubmit}>
                  Login
                </Button>
                <Button
                  buttonStyle={{borderRadius: 24, margin: 14}}
                  color="secondary"
                  onPress={() => replace('Signup')}>
                  Not registered yet? Signup now!
                </Button>
              </View>
              {isError && (
                <View style={styles.apiErrorContainer}>
                  <Text style={styles.apiError}>
                    {(error as ErrorResponse)?.response?.data?.message ||
                      'Network error check your internet connection and try again'}
                  </Text>
                </View>
              )}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  mainTextContainer: {
    marginTop: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    color: Colors.secondary,
    margin: 29,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  apiErrorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  apiError: {
    color: 'tomato',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Signin;
