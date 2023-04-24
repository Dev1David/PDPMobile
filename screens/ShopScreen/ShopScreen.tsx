import {StyleSheet, Text, View} from 'react-native';
import { RootTabScreenProps } from '../../types';

import IconHeart from "../../assets/images/SplashScreen/heart_icon_white.svg";
import React from "react";
import CommonScrollableLayout from "../../components/Layouts/CommonScrollableLayout";
import styles from "./shopStyles";

export default function ShopScreen({ navigation }: RootTabScreenProps<'ShopScreen'>) {
  return (
      <CommonScrollableLayout>
          <View style={styles.container}>
              <Text style={styles.infoText}>Coming soon...</Text>
          </View>
      </CommonScrollableLayout>
  );
}

