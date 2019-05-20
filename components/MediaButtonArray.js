import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	ToastAndroid
  } from 'react-native';
import Colors from '../constants/Colors';

export default class MediaButtonArray extends React.Component {

	constructor(props) {
		super(props);
	}

	// Sends a GET request to the Bluetooth command handler on the RPi
	_btPlayerCommand(command) {
		fetch("http://192.168.8.159/web-media-control/media.php?command="+command)
		.catch((error) => {
			ToastAndroid.show("Could not connect to the media player", ToastAndroid.SHORT);
		});
	}

	_onPressPlayPause() {
		if(this.state.status == "Playing") {
			this.setState({
				status: "Paused"
			});
			this._btPlayerCommand("pause");
        } else if(this.state.status == "Paused") {
			this.setState({
				status: "Playing"
			});
			this._btPlayerCommand("play");
        }
	}

	_onPressRewind() {
		this._btPlayerCommand("prevTrack");
	}

	_onPressForward() {
		this._btPlayerCommand("nextTrack");
	}

	render() {
		this.state = { status: this.props.status };
		return (
			<View style={{flexDirection: 'row', marginLeft: 8}}>
				<TouchableOpacity style={styles.mediaButtonContainer} onPress={this._onPressRewind.bind(this)}>
					<Image style={styles.mediaButton} source={require("../assets/images/ios-rewind.png")} />
				</TouchableOpacity>

				{ this._playPauseButtons() }

				<TouchableOpacity style={styles.mediaButtonContainer} onPress={this._onPressForward.bind(this)}>
					<Image style={styles.mediaButton} source={require("../assets/images/ios-fastforward.png")} />
				</TouchableOpacity>
			</View>
		);
	}
	
	_playPauseButtons() {
		if(this.state.status == "Playing") {
			return (
				<TouchableOpacity style={styles.mediaButtonContainer} onPress={this._onPressPlayPause.bind(this)}>
					<Image style={styles.mediaButton} source={require("../assets/images/ios-pause.png")} />
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style={styles.mediaButtonContainer} onPress={this._onPressPlayPause.bind(this)}>
					<Image style={styles.mediaButton} source={require("../assets/images/ios-play.png")} />
				</TouchableOpacity>
			);
		}
	}
}

const styles = StyleSheet.create({
	mediaButtonContainer: {
		marginHorizontal: 10,
		paddingHorizontal: 50,
		paddingVertical: 30
	},
	mediaButton: {
		width: 90,
		height: 90,
		marginTop: 0,
		marginHorizontal: 10,
		paddingHorizontal: 50,
		paddingVertical: 30
	}
});