import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { Router, Scene, Modal, Drawer, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Main from './Main'
import DrawerContent from './DrawerContent'

const { width } = Dimensions.get('window');

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Modal hideNavBar>
          <Scene key={'root'}>
            <Drawer key={'drawer'} contentComponent={DrawerContent} drawerLockMode={'locked-closed'} drawerWidth={ width*0.8 } hideDrawerButton hideNavBar>
              <Scene initial key={'main'} component={Main} title={'Main'} hideNavBar />
            </Drawer>
          </Scene>

          <Scene key={'second'} component={DrawerContent} title={'SecondPage'} hideNavBar />
        </Modal>
      </Router>
    )
  }
}

export default connect()(AppRouter);