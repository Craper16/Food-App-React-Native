import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SigninData, userDataModel} from '../../interfaces/auth/authInterfaces';

interface UserModel {
  access_token: string | null;
  refresh_token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: number | null;
  address: string | null;
}

const initialState: UserModel = {
  access_token: null,
  refresh_token: null,
  email: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  address: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    defaultAuth: state => {
      state.access_token = initialState.access_token;
      state.refresh_token = initialState.refresh_token;
      state.email = initialState.email;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.phoneNumber = initialState.phoneNumber;
    },
    setUserTokens: (
      state,
      action: PayloadAction<{access_token: string; refresh_token: string}>,
    ) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    setUser: (state, action: PayloadAction<userDataModel>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
    },
  },
});

export const {defaultAuth, setUserTokens, setUser} = authSlice.actions;

export default authSlice.reducer;
