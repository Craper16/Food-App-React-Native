import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UpgradeModel} from '../../interfaces/upgrades/upgradesInterfaces';

interface UpgradesModel {
  upgrades: UpgradeModel[];
}

const initialState: UpgradesModel = {
  upgrades: [],
};

const upgradesSlice = createSlice({
  name: 'upgrades',
  initialState,
  reducers: {
    defaultUpgrades: state => {
      state.upgrades = initialState.upgrades;
    },
    setUpgrades: (state, action: PayloadAction<UpgradeModel[]>) => {
      state.upgrades = [...action.payload];
    },
  },
});

export const {defaultUpgrades, setUpgrades} = upgradesSlice.actions;

export default upgradesSlice.reducer;
