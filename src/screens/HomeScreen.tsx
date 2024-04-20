import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import {Flex, VStack, Text, Button} from '@react-native-material/core';
import {COLORS} from '../constants/theme';
import {StyleSheet} from 'react-native';
import images from '../constants/images';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../constants/route';

const HomeScreen: React.FC = () => {
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Flex fill style={styles.container}>
      <ImageBackground
        source={images.ricefieldBG}
        style={{display: 'flex', flex: 1}}>
        <Text variant="h3" style={{textAlign: 'center', marginTop: 20}}>
          Welcome to CropScan
        </Text>
        <VStack m={4} spacing={10} items="center" style={{marginTop: 20}}>
          <Button
            variant="contained"
            title="Scan"
            style={{width: 200}}
            onPress={() => nav.navigate('Camera')}
            leading={() => (
              <Image source={images.scanIcon} style={{width: 30, height: 30}} />
            )}
          />
          <Button
            variant="contained"
            title="About CropScan"
            style={{width: 200}}
            onPress={() => nav.navigate('About')}
          />
        </VStack>
      </ImageBackground>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGrey60,
  },
});

export default HomeScreen;
