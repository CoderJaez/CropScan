/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  View,
  Image,
} from 'react-native';
import {Camera, CameraType, WhiteBalance} from 'expo-camera';
import {
  convertBase64ToTensor,
  getModel,
  startPrediction,
} from './src/helpers/tensor-helper';
import {LayersModel} from '@tensorflow/tfjs';
import {decodeJpeg, fetch} from '@tensorflow/tfjs-react-native';
import {cropPicture} from './src/helpers/image-helper';

function App(): React.JSX.Element {
  const [model, setModel] = useState<LayersModel | null>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef<Camera>(null);
  const RESULT_MAPPING = ['Bacterial Blight', 'Blast', 'Brownspot', 'Tungro'];
  const onTakePicture = async () => {
    console.log('Taking photo');
    try {
      const imageData = await camera.current?.takePictureAsync({base64: true});
      processImagePrediction(imageData);
    } catch (error) {
      console.log('Error taking photo: ', error);
    }
  };

  const processImagePrediction = async (base64Image: any) => {
    const croppedData = await cropPicture(base64Image, 200);
    const tensor = await convertBase64ToTensor(croppedData?.base64);

    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    console.log(prediction);
    console.log(RESULT_MAPPING[highestPrediction]);
  };

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  async function setupModel() {
    const model = await getModel();
    setModel(model);
  }

  useEffect(() => {
    setupModel();

    return () => {
      setModel(null);
    };
  }, []);

  // if (!device) return <Text>Camera Device Not Found.</Text>;
  return (
    <View style={{flex: 1}}>
      {/* <Camera
        ref={camera}
        device={device}
        isActive={true}
        style={{flex: 1}}
        photo={true}
      /> */}

      <Camera
        ref={camera}
        style={{flex: 1}}
        type={CameraType.back}
        autoFocus={true}></Camera>
      <Pressable
        onPress={onTakePicture}
        style={{
          backgroundColor: 'red',
          width: 75,
          height: 75,
          borderRadius: 75,
          padding: 10,
          left: 150,
          top: 500,
          position: 'absolute',
        }}
      />
    </View>
  );
}

export default App;
