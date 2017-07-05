/**
 * Created by qzy on 12/06/2017.
 */
import React, {Component} from "react";
import {Animated, AppRegistry, Dimensions, ScrollView, StyleSheet, View} from "react-native";


import Moment from "./moment";
const {width, height} = Dimensions.get("window");

const Images = [
  {image: require('./images/vodka.jpg'), title: "Vodka Cran"},
  {
    image: require('./images/an-old-fashioned-with-a-surprising-design-specially-for-you-as-the-latest-Old-Fashion-collection-12.jpg'),
    title: "Old Fashion"
  },
  {image: require('./images/Moscow-Mule-new.jpg'), title: "Mule"},
  {image: require('./images/strawberry.jpg'), title: "Strawberry Daiquiri"},

];
const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    (i - 1) * width,
    i * width,
    (i + 1) * width
  ]
  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150]
  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  })
}
const getSeparator = (i) => {
  return <View key={i} style={[styles.separate, {left: (i - 1) * width - 2.5}]}/>
}
export default class EggHeadRNAnimations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0),
      scrollEnabled: true,
    };

  }

  handleFocus = (focused) => {
    this.setState({
      scrollEnabled: !focused,
    })
  }

  render() {
    return (
        <View style={[styles.container]}>
          <ScrollView
              pagingEnabled
              horizontal
              scrollEnabled={this.state.scrollEnabled}
              scrollEventThrottle={16}
              onScroll={
                Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.state.animatedScroll
                      }
                    }
                  }
                ])
              }>
            {
              Images.map((image, i) => {
                return (
                    <Moment
                        key={i}
                        onFocus={this.handleFocus}
                        focused={!this.state.scrollEnabled}
                        {...image}
                        translateX={getInterpolate(this.state.animatedScroll, i, Images.length)}
                    />
                )

              })}
            {Array.apply(null, {length: Images.length + 1}).map((_, i) => getSeparator(i))}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  separate: {
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 5
  }
});

AppRegistry.registerComponent('EggHeadRNAnimations', () => EggHeadRNAnimations);
