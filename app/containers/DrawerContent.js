import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  };

  static contextTypes = {
    drawer: PropTypes.object,
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
          {/* <Text>Drawer Content</Text>
          <Button onPress={Actions.closeDrawer}>Back</Button> */}
          <Button title="Close" onPress={Actions.pop} />
          <Text>Title: {this.props.title} Name: {this.props.name}</Text>
          <Button title="Learn More" onPress={Actions.second} />
        </View>
      </SafeAreaView>
    );
  }
}

export default DrawerContent;