import {Box, ListItem, Text} from '@react-native-material/core';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import images from '../constants/images';
import {RootStackParamList} from '../constants/route';
import {SIZES} from '../constants/theme';
import {RiceLeaf} from '../constants/types';
type PROPS = {
  route?: RouteProp<RootStackParamList, 'RiceLeaf'> | undefined;
};

const RiceLeafScreen: React.FC<PROPS> = ({route}) => {
  const [riceDisease, setRiceDisease] = useState(route?.params as RiceLeaf);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [img, setImg] = useState('');

  useEffect(() => {
    setImg(riceDisease.image);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Rice Crop Disease',
    });

    return () => {
      navigation.setOptions({
        title: undefined,
      });
    };
  }, []);

  return (
    <Box style={{flex: 1}}>
      {riceDisease.disease === 'Bacterial Blight' ? (
        <Image source={images.blight} style={styles.image} />
      ) : riceDisease.disease === 'Brownspot' ? (
        <Image source={images.brownspot} style={styles.image} />
      ) : riceDisease.disease === 'Blast' ? (
        <Image source={images.blast} style={styles.image} />
      ) : (
        <Image source={images.tungro} style={styles.image} />
      )}

      <Text variant="h4" style={{textAlign: 'center'}}>
        {riceDisease?.disease}
      </Text>

      <Box p={10} style={{flex: 1}}>
        <Text variant="h5" style={{marginTop: SIZES.margin, padding: 10}}>
          {riceDisease.title}
        </Text>
        <FlatList
          data={riceDisease.prevention}
          renderItem={({item}) => <ListItem secondaryText={item} />}
        />
      </Box>
    </Box>
  );
};

export default RiceLeafScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
    alignSelf: 'center',
  },
});
