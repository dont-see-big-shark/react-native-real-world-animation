/**
 * Created by qzy on 12/06/2017.
 */
import React, {Component} from 'react';
import {
    View, Text, StyleSheet, Animated, Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get("window");


export default class Moment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const animatedStyle = {
            transform: [
                {translateX: this.props.translateX}
            ]
        }
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={this.props.image}
                    style={[styles.image, animatedStyle]}
                    resizeMode="cover"
                />
                <View style={[StyleSheet.absoluteFill, styles.center]}>
                    <View style={styles.textWrap}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    center: {
        justifyContent: "center"
    },
    textWrap: {
        backgroundColor: "rgba(0,0,0,.5)",
        paddingVertical: 10
    },
    title: {
        backgroundColor: "transparent",
        fontSize: 20,
        color: "#fff",
        textAlign: "center"
    }
});

