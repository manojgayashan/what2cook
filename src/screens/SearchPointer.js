import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import CollapsibleHeader from '../components/CollapsibleHeader'
import Ionicons from '@react-native-vector-icons/ionicons';
import globalStyles from '../constants/styles';
import COLORS from '../constants/colors';
import RecipeCard from '../components/RecipeCard'

export default function SearchPointer() {
    const route = useRoute()
    const data = route.params?.data
    const navigation = useNavigation()

    console.log(data.length)
  return (
    <View style={{flex:1,backgroundColor:COLORS.gray100}}>
          <CollapsibleHeader
        title={data.length+" Recipe"+(data.length==1?'':'s')+' Found'}
        leftIcon={<Ionicons name="arrow-back" size={24} color={COLORS.black900} />}
        onLeftPress={()=>{navigation.goBack()}}
        rightIcon={<Ionicons name="filter" size={24} color={COLORS.black900} />}
        // collapseArea={
        //   <View style={[globalStyles.row, { paddingBottom: 16 }]}>
            
        //   </View>}
      >
              <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
        </CollapsibleHeader>
    </View>
  )
}