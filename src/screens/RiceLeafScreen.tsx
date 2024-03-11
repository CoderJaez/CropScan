import {RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../constants/route';
import {RiceLeaf} from '../constants/types';
type PROPS = {
  route?: RouteProp<RootStackParamList, 'RiceLeaf'> | undefined;
};
const RiceLeafScreen: React.FC<PROPS> = ({route}) => {
  const [riceDisease, setRiceDisease] = useState(route?.params as RiceLeaf);

  return (
    <View>
      <Text>{riceDisease?.disease}</Text>
    </View>
  );
};

export default RiceLeafScreen;
