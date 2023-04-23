import React, { useRef } from 'react';
import { View, Text, FlatList, Animated, Button, Dimensions, StyleSheet } from 'react-native';

const ScrollerText = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const textData = [
    'This is line 1.',
    'This is line 2.',
    'This is line 3.',
    'This is line 4.',
    'This is line 5.',
  ];

  const renderItem = ({ item }) => (
    <Animated.View
      style={{ transform: [{ translateY }], justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={styles.text}>{item}</Text>
    </Animated.View>
  );

  const startScroll = () => {
    translateY.setValue(0);
    Animated.timing(translateY, {
      toValue: -1 * textData.length * 50,
      duration: 5000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        startScroll();
      }
    });
  };

  const stopScroll = () => {
    translateY.stopAnimation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <FlatList
          data={textData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startScroll} color="#333" />
        <Button title="Stop" onPress={stopScroll} color="#333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  textContainer: {
    height: Dimensions.get('window').height - 150,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
});

export default ScrollerText;
