import {ActivityIndicator} from '@react-native-material/core';
import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';

const LoadingScreen: React.FC = () => {
  return (
    <Modal animationType="fade">
      <View style={styles.container}>
        <Text style={styles.text}>Processing...</Text>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark80,
    height: SIZES.height,
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    textTransform: 'uppercase',
    color: COLORS.light,
  },
});
