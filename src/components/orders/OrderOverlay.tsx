import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {Overlay, Button, Icon, Input} from '@rneui/themed';

type props = {
  isVisible: boolean;
  toggleOverlay: () => void;
  comments: string;
  onCommentTextChange: (text: string) => void;
};

const OrderOverlay = ({
  isVisible,
  toggleOverlay,
  comments,
  onCommentTextChange,
}: props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Current Order</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
        <View>
          <Input
            style={styles.inputField}
            placeholder="Comment"
            leftIcon={{type: 'font-awesome', name: 'comment'}}
            value={comments}
            onChangeText={onCommentTextChange}
          />
        </View>
        <Button
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
          title="Order now"
          onPress={() => {
            return console.log(comments), toggleOverlay();
          }}
        />
      </Overlay>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
});

export default OrderOverlay;
