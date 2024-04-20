import {ImageBackground} from 'react-native';
import React from 'react';
import {Flex, VStack, Box, Text} from '@react-native-material/core';
import images from '../constants/images';
import {COLORS} from '../constants/theme';
const AboutScreen = () => {
  return (
    <Flex fill>
      <ImageBackground
        source={images.ricefieldBG}
        style={{display: 'flex', flex: 1}}>
        <Box
          style={{
            display: 'flex',
            flex: 1,
            padding: 10,
            backgroundColor: COLORS.dark60,
          }}>
          <Text variant="h5" color={COLORS.light} style={{padding: 10}}>
            CropScan
          </Text>
          <Text
            variant="body1"
            color={COLORS.light}
            style={{marginTop: 10, padding: 10, textAlign: 'justify'}}>
            <Text color={COLORS.primary} variant="h5">
              CropScan
            </Text>{' '}
            is a cutting-edge mobile application developed using ReactNative
            technology, designed to revolutionize agricultural practices.
            Leveraging the power of Mobile Net and Google Teachable Machine,
            CropScan enables farmers to accurately identify common rice leaf
            diseases such as Tungro, Bacterial Blight, Brownspot, and Blast
            directly from their smartphones. With its intuitive interface and
            advanced image recognition capabilities, CropScan empowers farmers
            to swiftly detect and diagnose crop diseases, facilitating timely
            interventions to ensure optimal crop
          </Text>
        </Box>
      </ImageBackground>
    </Flex>
  );
};

export default AboutScreen;
