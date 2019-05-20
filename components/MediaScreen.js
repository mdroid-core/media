import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ImageBackground
} from 'react-native';
import MediaButtonArray from './MediaButtonArray';

export default class MediaScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = { title: "Nothing Playing", artist: "", album: "", albumArtwork: "../assets/images/black.png", status: "Paused" };

		// Continously get media state from controller
		this.interval = setInterval(() => {
			this._btPlayerCommandAsync("info");
		}, 500);
	}

	// Sends a GET request to the Bluetooth command handler on the RPi
	_btPlayerCommandAsync(command) {
		try {
			componentHandler = this;
			return fetch("http://192.168.8.159/web-media-control/media.php?command=" + command)
			.then(function(response) {
				return response.json();
			})
			.then(function(mediaObject) {
				componentHandler._updateSongInfo(mediaObject);
			});
		}
		catch (error) {
			console.log(error);
		}
	}

	_getAlbumArtwork(album, artist) {
        searchQuery = album+" "+artist+" album artwork";
        componentHandler = this;
		if(album !== undefined && artist !== undefined) {
			fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyBkLyJ_C764-xzcMNomj5YUOI-jqzCoVgo&cx=004286675445984025592:ypgpkv9fjd4&filter=1&searchType=image&q='+searchQuery, {
				method: 'GET'
			})
			.then(function(response) {
				if(response["ok"]) {
					return response.json();
				} else {
					return null;
				}
			})
			.then(function(data) {
				if(data !== null) {
					componentHandler.setState({
						albumArtwork: data.items[0].link
					});
				}
			}).catch((error) => {
				console.log(error);
			});
		} else {
			return null;
		}
	}

	// Requests media info from controller and updates the UI if applicable
	_updateSongInfo(mediaObject) {
		console.log(mediaObject);
		newAlbumArtwork = null;
		if(mediaObject !== undefined && "Artist" in mediaObject) {
			if(mediaObject["Artist"] !== this.state.artist || mediaObject["Album"] !== this.state.album) {

				// Check & set local link if it exists first
				if("Album_Artwork" in mediaObject) {
					this.setState({
						albumArtwork: "http://192.168.8.159/web-media-control/"+mediaObject["Album_Artwork"]
					});
				} else {
					this._getAlbumArtwork(mediaObject["Album"], mediaObject["Artist"]);
				}
			}

			this.setState({
				album: mediaObject["Album"],
				artist: mediaObject["Artist"],
				title: mediaObject["Title"],
				status: ("playing" in mediaObject) ? "Playing" : "Paused"
			});
		}
	}

  	render() {
		return (
		<View style={[styles.container]}>
			<ImageBackground imageStyle={{resizeMode: 'cover'}} style={[styles.imageBg]} source={{uri: this.state.albumArtwork}}>
				<View style={[styles.imageBgMask]}></View>
			</ImageBackground>
			<View style={[styles.mainContainer]}>
				<Text style={styles.mediaTitleText}>{ this.state.title }</Text>
				<Text style={styles.mediaArtistText}>{ this.state.artist }</Text>
				<MediaButtonArray status={ this.state.status } />
			</View>
		</View>
		);
  	}
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	color: '#fff'
  },
  mediaTitleText: {
	fontSize: 50,
	color: '#fff',
	fontWeight: 'bold'
  },
  mediaArtistText: {
	color: 'rgba(255,255,255,0.9)',
	fontSize: 40,
	marginTop: 10
  },
  mainContainer: {
	alignItems: 'center',
	justifyContent: 'center',
	marginHorizontal: 50
  },
  imageBg: {
  	flex: 1,
  	position: "absolute", top: 0, bottom: 0, left: 0, right: 0
  },
  imageBgMask: {
  	flex: 1,
  	backgroundColor: 'rgba(0,0,0,.7)',
  	position: "absolute", top: 0, bottom: 0, left: 0, right: 0
  }
});
