import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Colors} from '../../constants/colors/colorsConsts';
import {Input} from '@rneui/themed';
import {Button} from '@rneui/base';
import {Formik} from 'formik';
import {updateUserValidations} from '../../validations/authValidations';
import {useMutation} from '@tanstack/react-query';
import {updateUser} from '../../helpers/auth/authHelpers';
import {ErrorResponse} from '../../interfaces/auth/authInterfaces';
import {setUser} from '../../redux/auth/authSlice';

const Account = () => {
  const dispatch = useAppDispatch();

  const [isInEditMode, setIsInEditMode] = useState(false);

  const {email, firstName, lastName, phoneNumber, address} = useAppSelector(
    state => state.auth,
  );

  const {data, error, isError, isLoading, mutate, isSuccess} = useMutation({
    mutationFn: updateUser,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          email: data.email,
          address: data.address,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        }),
      );
      setIsInEditMode(prevIsInEditMode => !prevIsInEditMode);
    }
  }, [isSuccess, dispatch]);

  return isInEditMode ? (
    <Formik
      initialValues={{
        firstName: firstName!,
        lastName: lastName!,
        phoneNumber: phoneNumber!.toString(),
        address: address || '',
      }}
      onSubmit={values =>
        mutate({
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: +values.phoneNumber,
          address: values.address,
        })
      }
      validateOnMount={true}
      validationSchema={updateUserValidations}>
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <KeyboardAvoidingView
          style={styles.screen}
          behavior="padding"
          keyboardVerticalOffset={50}>
          <ScrollView>
            <View style={styles.fieldContainer}>
              <Text style={styles.field}>Email: {email}</Text>
            </View>
            <View>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={{color: Colors.secondary}}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                errorMessage={
                  errors.firstName && touched.firstName
                    ? errors.firstName
                    : undefined
                }
                placeholder="First name"
                label="First Name"
                labelStyle={{textAlign: 'center', color: Colors.secondary}}
                disabled={isLoading}
              />
            </View>
            <View>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={{color: Colors.secondary}}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                errorMessage={
                  errors.lastName && touched.lastName
                    ? errors.lastName
                    : undefined
                }
                placeholder="Last name"
                label="Last Name"
                labelStyle={{textAlign: 'center', color: Colors.secondary}}
                disabled={isLoading}
              />
            </View>
            <View>
              <Input
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
                placeholder="Phone number"
                label="Phone number"
                labelStyle={{textAlign: 'center', color: Colors.secondary}}
                disabled={isLoading}
              />
            </View>
            <View>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                inputStyle={{color: Colors.secondary}}
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                errorMessage={
                  errors.address && touched.address ? errors.address : undefined
                }
                placeholder="Address"
                label="Address"
                labelStyle={{textAlign: 'center', color: Colors.secondary}}
                disabled={isLoading}
              />
            </View>
            <View style={styles.actionsContainer}>
              <Button
                disabled={isLoading}
                color="error"
                style={styles.actions}
                onPress={() => setIsInEditMode(false)}>
                Cancel
              </Button>
              <Button
                color="success"
                disabled={!isValid || isLoading}
                style={styles.actions}
                onPress={handleSubmit}>
                Save
              </Button>
            </View>
            {isError && (
              <View>
                <Text>
                  {(error as ErrorResponse).response.data.message ||
                    (error as Error).message}
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  ) : (
    <ScrollView style={styles.screen}>
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>Email: {email}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>First name: {firstName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>Last name: {lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>Phone number: {phoneNumber}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.field}>
          Address:{' '}
          {address
            ? address
            : 'No Address found, please add your address to successfully order'}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <Button
          style={styles.actions}
          onPress={() => setIsInEditMode(true)}
          color="secondary">
          Edit Information
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  fieldContainer: {
    justifyContent: 'center',
    margin: 13,
    alignItems: 'center',
  },
  field: {
    color: Colors.secondary,
    fontSize: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  actions: {
    margin: 12,
    width: 150,
  },
});

export default Account;
