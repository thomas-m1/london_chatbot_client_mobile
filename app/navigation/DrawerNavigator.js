import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import ChatbotNavigator from './ChatbotNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ChatbotNavigator" component={ChatbotNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator