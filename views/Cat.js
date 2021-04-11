import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Description from '../data/descriptions.json';
import Names from '../data/catnames.json'

function Cat() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const maxNumber = 8;
    let num = Math.floor(Math.random() * maxNumber + 1);
    setNumber(num);
  }, [])

  const route = useRoute();

  return (
    <View style={{ flex: 1 }}>
      <Image
        resizeMode='stretch'
        style={styles.image}
        source={{ uri: `https://placekitten.com/200/300?image=${route.params.pic}` }}
      />
      <Text style={styles.name}>{Names[route.params.name]}</Text>
      <Text style={styles.description}>{Description[number]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: { margin: 10, fontSize: 16 },
  name: { alignSelf: 'center' },
  image: { height: 400, width: Dimensions.get('window').width - 10, margin: 5 },

})

export default Cat;