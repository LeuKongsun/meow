import React, { useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Dimensions } from 'react-native';

let number = 0;

function Cat() {
  // useEffect(() => {
  //   const maxNum = 9;
  //   number = Math.floor(Math.random() * maxNum + 1)

  // })
  return (
    <View style={{ flex: 1}}>
      {/* <ScrollView> */}
      <Image
        resizeMode='stretch'
        style={styles.image}
        source={{ uri: `http://placekitten.com/200/300` }} />
      <Text style={{alignSelf: 'center'}}>This is my cat</Text>

      {/* </ScrollView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  image: { height: 300, width: Dimensions.get('window').width - 10, margin: 5 },

})

export default Cat;