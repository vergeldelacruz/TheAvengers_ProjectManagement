import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Header from '../components/common/header'

export default function Home() {
  return (
    <SafeAreaView>
      <View>
        <Header userFirstName={'Litson Thomas'}/>
      </View>
    </SafeAreaView>
  )
}