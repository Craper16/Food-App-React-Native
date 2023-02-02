import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Formik} from 'formik';
import {Colors} from '../../constants/colors/colorsConsts';
import {signUpValidations} from '../../validations/authValidations';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/base';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getUserData, signUpUser} from '../../helpers/auth/authHelpers';
import {
  ErrorResponse,
  SigninData,
  userDataModel,
} from '../../interfaces/auth/authInterfaces';
import {useAppDispatch} from '../../redux/hooks';
import {setUser, setUserTokens} from '../../redux/auth/authSlice';
import {setKeychainTokens} from '../../helpers/keychain/keychainHelpers';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation/auth/AuthNavigation';

type props = StackScreenProps<AuthStackParams, 'Signup'>;

const Signup = ({navigation}: props) => {
  const dispatch = useAppDispatch();

  const {replace} = navigation;

  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);

  const {refetch} = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
    enabled: false,
    refetchOnMount: false,
    cacheTime: 0,
  });

  const {error, isError, isLoading, mutate, data, isSuccess} = useMutation({
    mutationFn: signUpUser,
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
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      }}
      onSubmit={values =>
        mutate({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: +values.phoneNumber,
        })
      }
      validateOnMount={true}
      validationSchema={signUpValidations}>
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
            <SafeAreaView>
              <View style={styles.mainTextContainer}>
                <Text style={styles.mainText}>Signup</Text>
              </View>
              <ScrollView>
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
                <View style={styles.inputContainer}>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputStyle={{color: Colors.secondary}}
                    disabled={isLoading}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    errorMessage={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : undefined
                    }
                    rightIcon={
                      values.confirmPassword !== ''
                        ? {
                            type: 'font-awesome',
                            name: viewConfirmPassword ? 'eye' : 'eye-slash',
                            size: 18,
                            color: Colors.secondary,
                            onPress: () => {
                              setViewConfirmPassword(
                                prevViewConfirmPassword =>
                                  !prevViewConfirmPassword,
                              );
                            },
                          }
                        : undefined
                    }
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.secondary}
                    label="Confirm Password"
                    labelStyle={{textAlign: 'center', color: Colors.secondary}}
                    secureTextEntry={viewConfirmPassword}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    disabled={isLoading}
                    autoCorrect={false}
                    autoCapitalize="none"
                    inputStyle={{color: Colors.secondary}}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    errorMessage={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : undefined
                    }
                    placeholder="First Name"
                    placeholderTextColor={Colors.secondary}
                    label="First Name"
                    labelStyle={{textAlign: 'center', color: Colors.secondary}}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    disabled={isLoading}
                    autoCorrect={false}
                    autoCapitalize="none"
                    inputStyle={{color: Colors.secondary}}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    errorMessage={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : undefined
                    }
                    placeholder="Last Name"
                    placeholderTextColor={Colors.secondary}
                    label="Last Name"
                    labelStyle={{textAlign: 'center', color: Colors.secondary}}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Input
                    disabled={isLoading}
                    keyboardType="numeric"
                    autoCorrect={false}
                    autoCapitalize="none"
                    inputStyle={{color: Colors.secondary}}
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    errorMessage={
                      errors.phoneNumber && touched.phoneNumber
                        ? errors.phoneNumber
                        : undefined
                    }
                    placeholder="Phone Number"
                    placeholderTextColor={Colors.secondary}
                    label="Phone Number"
                    labelStyle={{textAlign: 'center', color: Colors.secondary}}
                  />
                </View>
                <View style={styles.actionsContainer}>
                  <Button
                    buttonStyle={{borderRadius: 24}}
                    color="secondary"
                    disabled={!isValid || isLoading}
                    loading={isLoading}
                    onPress={handleSubmit}>
                    Signup
                  </Button>
                  <Button
                    buttonStyle={{borderRadius: 24, margin: 14}}
                    color="secondary"
                    onPress={() => replace('Signin')}>
                    Already have an account? Signin now!
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
              </ScrollView>
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

export default Signup;
