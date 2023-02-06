import {Text, StyleSheet, View, ScrollView, Alert} from 'react-native';
import React from 'react';
import {Overlay, Button, Icon, Input, CheckBox} from '@rneui/themed';
import {Colors} from '../../constants/colors/colorsConsts';
import {MealData} from '../../interfaces/meals/mealsInterfaces';
import {useAppDispatch} from '../../redux/hooks';
import {
  addUpgrade,
  removeMeal,
  removeUpgrade,
} from '../../redux/orders/ordersSlice';
import {UpgradeModel} from '../../interfaces/upgrades/upgradesInterfaces';

type props = {
  isVisible: boolean;
  meals: MealData[];
  upgrades: UpgradeModel[];
  orderUpgrades: UpgradeModel[];
  toggleOverlay: () => void;
  comments: string;
  isError: boolean;
  errorMessage: string | null;
  onCommentTextChange: (text: string) => void;
  onOrderNow: () => void;
  setIsDelivery: () => void;
  setIsTakeaway: () => void;
  total: number;
  buttonLoading: boolean;
  isDelivery: boolean;
  isTakeaway: boolean;
};

const OrderOverlay = ({
  isVisible,
  toggleOverlay,
  comments,
  onCommentTextChange,
  onOrderNow,
  orderUpgrades,
  errorMessage,
  isError,
  meals,
  total,
  buttonLoading,
  isDelivery,
  isTakeaway,
  setIsDelivery,
  setIsTakeaway,
  upgrades,
}: props) => {
  const dispatch = useAppDispatch();

  return (
    <Overlay
      animationType="slide"
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}>
      <ScrollView>
        <Text style={styles.textPrimary}>Current Order</Text>
        <Text style={styles.textSecondary}>{`Meals`.toUpperCase()}</Text>
        <View style={styles.listContainer}>
          {meals.length === 0 ? (
            <Text style={styles.mealsEmpty}>No meals added</Text>
          ) : (
            meals.map((meal, i) => (
              <View key={i}>
                <View style={styles.mealContainer}>
                  <Button
                    onPress={() =>
                      Alert.alert(
                        `Delete ${meal.title}`,
                        `Are you sure you want to delete ${meal.title}?`,
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () => dispatch(removeMeal({mealIndex: i})),
                          },
                        ],
                      )
                    }
                    loading={buttonLoading}
                    size="sm"
                    type="clear"
                    icon={<Icon type="font-awesome" name="trash" color="red" />}
                  />
                  <Text style={styles.mealTitle}>{meal.title}</Text>
                  <Text>{`$${meal.price}`}</Text>
                </View>
              </View>
            ))
          )}
        </View>
        {meals.length !== 0 && (
          <View>
            <View>
              {upgrades.map((upgrade, i) => (
                <Button
                  key={i}
                  icon={
                    <Icon type="material-community" name="plus" color="green" />
                  }
                  color="secondary"
                  type="clear"
                  style={styles.upgradesActions}
                  onPress={() => dispatch(addUpgrade(upgrade))}>
                  {`${upgrade.title} for $${upgrade.price}`}
                </Button>
              ))}
            </View>
            <Text style={styles.textSecondary}>{`Upgrades`.toUpperCase()}</Text>
            <View>
              {orderUpgrades.length === 0 ? (
                <Text style={styles.mealsEmpty}>No upgrades added</Text>
              ) : (
                orderUpgrades.map((orderUpgrade, i) => (
                  <View key={i}>
                    <View style={styles.mealContainer}>
                      <Button
                        onPress={() =>
                          Alert.alert(
                            `Delete ${orderUpgrade.title}`,
                            `Are you sure you want to delete ${orderUpgrade.title}?`,
                            [
                              {text: 'Cancel', style: 'cancel'},
                              {
                                text: 'Delete',
                                style: 'destructive',
                                onPress: () =>
                                  dispatch(removeUpgrade({upgradeIndex: i})),
                              },
                            ],
                          )
                        }
                        loading={buttonLoading}
                        size="sm"
                        type="clear"
                        icon={
                          <Icon type="font-awesome" name="trash" color="red" />
                        }
                      />
                      <Text style={styles.mealTitle}>{orderUpgrade.title}</Text>
                      <Text>{`$${orderUpgrade.price}`}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
            <View>
              <Input
                style={styles.inputField}
                placeholder="Comment"
                leftIcon={{type: 'font-awesome', name: 'comment'}}
                value={comments}
                onChangeText={onCommentTextChange}
              />
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalStyle}>{`TOTAL $${total}`}</Text>
            </View>
            <View style={styles.checkBoxesContainer}>
              <CheckBox
                title="Delivery"
                checked={isDelivery}
                onPress={setIsDelivery}
              />
              <CheckBox
                title="Takeaway"
                checked={isTakeaway}
                onPress={setIsTakeaway}
              />
            </View>
          </View>
        )}
        <Button
          style={styles.actions}
          color="secondary"
          icon={
            <Icon
              name="check-circle"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{marginRight: 10}}
            />
          }
          loading={buttonLoading}
          title="Order now"
          onPress={() => onOrderNow()}
        />
        <View style={styles.apiErrorContainer}>
          {isError ? <Text style={styles.apiError}>{errorMessage}</Text> : null}
        </View>
      </ScrollView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 0.8,
    width: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 16,
  },
  actions: {
    margin: 12,
    marginTop: '100%',
  },
  upgradesActions: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  inputField: {
    width: 200,
  },
  listContainer: {
    width: 'auto',
    height: 'auto',
    margin: 13,
  },
  mealsEmpty: {
    textAlign: 'center',
    margin: 13,
  },
  apiErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  apiError: {
    fontWeight: 'bold',
    color: 'tomato',
    margin: 12,
  },
  mealContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 9,
    height: 'auto',
    width: 'auto',
  },
  mealTitle: {
    fontSize: 17,
  },
  checkBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 4,
  },
  totalContainer: {
    margin: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  totalStyle: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 23,
  },
});

export default OrderOverlay;
