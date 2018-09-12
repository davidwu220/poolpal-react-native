import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import AssetMap from '../config/AssetMap'

import {
  LocationSearchHeader,
  LocationSearchResults,
  SearchResultsList,
  NavigationIcon,
} from '../components'

import MapViewDirections from 'react-native-maps-directions';

const mapStateToProps = (state) => ({
  recentLocations: state.recentLocations,
  shortcutLocations: state.recentLocations.slice(0, 3),
})

const GOOGLE_MAPS_API_KEY = "AIzaSyCjoSnExkHFCAHQayRetiW4w-dnSWCdeR0";
const { width, height } = Dimensions.get('window');

class Main extends Component {

  state = {
    searchResultsOpen: false,
    sourceText: 'Work',
    destinationText: '',
    coordinates: [
      // {
      //   latitude: 34.031684,
      //   longitude: -118.457605
      // }
    ],
  }

  mapView = null;

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords

        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000}
    )
    navigator.geolocation.watchPosition(
      ({coords}) => {
        const {latitude, longitude} = coords

        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 0}
    )
  }

  toggleSearchResults = () => {
    const {searchResultsOpen} = this.state

    this.setState({searchResultsOpen: !searchResultsOpen})
  }

  onSourceTextChange = (sourceText) => {
    this.setState({sourceText})
  }

  onDestinationTextChange = (destinationText) => {
    this.setState({destinationText})
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  render() {
    const {recentLocations, shortcutLocations} = this.props
    const {searchResultsOpen, sourceText, destinationText, region, position} = this.state

    return (
      <View style={styles.container}>
        <NavigationIcon
          icon={searchResultsOpen ? 'arrow-left' : 'hamburger'}
          onPress={searchResultsOpen ? this.toggleSearchResults : Actions.drawerOpen }
        />
        <LocationSearchHeader
          onPress={this.toggleSearchResults}
          expanded={searchResultsOpen}
          sourceText={sourceText}
          destinationText={destinationText}
          onSourceTextChange={this.onSourceTextChange}
          onDestinationTextChange={this.onDestinationTextChange}
        />
        {/* <LocationButtonGroup
          visible={!searchResultsOpen}
          locations={shortcutLocations}
        /> */}
        <LocationSearchResults visible={searchResultsOpen}>
          <SearchResultsList list={recentLocations} />
        </LocationSearchResults>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          region={region}
          onPress={this.onMapPress}
          ref={c => this.mapView = c}
        >
          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}
          {/* {position && (
            <MapView.Circle
              center={position}
              radius={300}
              strokeColor={'transparent'}
              fillColor={'rgba(112,185,213,0.30)'}
            />
          )} */}
          {position && (
            <MapView.Marker.Animated
              image={AssetMap['curr-pos']}
              coordinate={position}
              flat={true}
              anchor={{x: 0.5, y: 0.3}}
            />
          )}
          <MapViewDirections
            origin={position}
            waypoints={ this.state.coordinates.length >= 2 ? this.state.coordinates : this.state.coordinates.slice(1, -1) }
            optimizeWaypoints={true}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            onReady={(result) => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 3.5),
                }
              });
            }}
          />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: -1
  },
})

export default connect(mapStateToProps)(Main);
