import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LayersModel} from '@tensorflow/tfjs';
import {Camera, CameraType, WhiteBalance} from 'expo-camera';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import riceData from '../assets/data/rice_disease.json';
import LoadingScreen from '../components/utilities/LoadingScreen';
import images from '../constants/images';
import {RootStackParamList} from '../constants/route';
import {RiceLeaf} from '../constants/types';
import {cropPicture} from '../helpers/image-helper';
import {
  convertBase64ToTensor,
  getModel,
  startPrediction,
} from '../helpers/tensor-helper';

const CameraScanScreen: React.FC = () => {
  const [model, setModel] = useState<LayersModel | null>();
  const [predictionResult, setPredictionResult] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);
  const RESULT_MAPPING = ['Bacterial Blight', 'Blast', 'Brownspot', 'Tungro'];
  // const RESULT_MAPPING = ['Triangle', 'Circle', 'Square'];
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onTakePicture = async () => {
    try {
      setIsProcessing(true);
      const imageData = await camera.current?.takePictureAsync({base64: true});
      console.log('Capturing photo.');
      processImagePrediction(imageData);
    } catch (error) {
      setIsProcessing(false);
      console.log('Error taking photo: ', error);
    }
  };
  const options: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  };

  const openGallery = async () => {
    try {
      const images: ImagePickerResponse = await launchImageLibrary(options);

      if (images.assets) {
        setIsProcessing(true);
        const imageAsset: any = images.assets;
        processImagePrediction(imageAsset[0]);
      }
    } catch (error) {
      setIsProcessing(false);
      console.log('Error taking photo: ', error);
    }
  };

  const processImagePrediction = async (base64Image: any) => {
    const croppedData = await cropPicture(base64Image, 300);
    const tensor = await convertBase64ToTensor(croppedData?.base64);

    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    console.log(prediction);
    console.log(Math.max.apply(null, prediction));

    const data = riceData.find(
      item => item.disease === RESULT_MAPPING[highestPrediction],
    );
    navigation.navigate('RiceLeaf', data as RiceLeaf);
    setIsProcessing(false);
    ``;
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

  return (
    <View style={{flex: 1}}>
      {isProcessing ? <LoadingScreen /> : null}
      {isFocused ? (
        <>
          <Camera
            ref={camera}
            style={{flex: 1}}
            type={CameraType.back}
            autoFocus={true}
            whiteBalance={WhiteBalance.auto}></Camera>
          <View style={styles.overlay} />
          <View style={styles.bottomOverlay}>
            <View style={{flex: 1}}>
              <Pressable style={styles.imageButton} onPress={openGallery}>
                <Image source={images.imageIcon} />
              </Pressable>
            </View>
            <View style={{flex: 1.5}}>
              <Pressable onPress={onTakePicture} style={styles.cameraButton}>
                <Image source={images.cameraIcon} />
              </Pressable>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 224,
    height: 224,
    marginLeft: -112,
    marginTop: -112,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black', // Just to see the box clearly, you can remove this line if you want completely transparent box
  },
  bottomOverlay: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    height: '13%',
    backgroundColor: 'green',
  },
  imageButton: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    width: 75,
    height: 75,
    borderRadius: 75,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CameraScanScreen;
