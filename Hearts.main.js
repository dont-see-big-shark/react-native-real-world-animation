/**
 * Created by qzy on 06/07/2017.
 * File description:
 */
/**
 * Created by qzy on 06/07/2017.
 * File description:
 */
import React, {Component} from "react";
import {Animated, AppRegistry, Dimensions, ScrollView, StyleSheet, View, TouchableWithoutFeedback} from "react-native";


import Heart from "./hearts";
const {width, height} = Dimensions.get("window");


export default class realAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      scale: new Animated.Value(0),
      animations: [
          new Animated.Value(0),
          new Animated.Value(0),
          new Animated.Value(0),
          new Animated.Value(0),
          new Animated.Value(0),
          new Animated.Value(0),
      ]
    };
  }

  triggerLike = () => {
    this.setState({
      liked: !this.state.liked,
    })
    Animated.spring(this.state.scale, {
      toValue: 2,
      duration: 3
    }).start(() => {
      this.state.scale.setValue(0);
    })
  }

  render() {
    const bouncyHeart = this.state.scale.interpolate({
      inputRange:[0,1,2],
      outputRange:[1, .8, 1]
    })
    const heartButtonStyle = {
      transform: [
        {scale: bouncyHeart}
      ]
    }
    return (
        <View style={[styles.container]}>
          <View>
            <TouchableWithoutFeedback onPress={this.triggerLike}>
              <Animated.View style={heartButtonStyle}>
                <Heart fill={this.state.liked}/>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
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