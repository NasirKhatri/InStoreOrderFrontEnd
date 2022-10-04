import * as React from 'react';
import { View, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import globalStyles from '../../globalStyles';
import { CartButton } from '../../Components/Button.js';
import CategoryCard from '../../Components/CategoryCard';
import { getCategories, getTables } from '../../SharedFunctions.js/GetQueries';
import { Dropdown } from '../../Components/Dropdown';
import { StoreContext } from '../../SharedFunctions.js/StoreContext';


const CategoriesScreen = ({ navigation }) => {
    const storeData = React.useContext(StoreContext);
    const { isLoading: cloading, data: cdata } = useQuery(['categories'], () => getCategories("POS"));
    const branchNo = 15; // Branch Number should not be fixed need to be fixed later
    const { isLoading: tloading, data: tdata} = useQuery(['tables', branchNo], () => getTables("dropdown", branchNo));

    React.useEffect(() => {
        if(tdata) {
            storeData.setTableNumber(tdata[0].id);
        }
    }, [tloading]);

    if (cloading || tloading) {
        return (
            <></>
        )
    }

    else {
        return (
            <View style={globalStyles.body}>
                <View style={{marginBottom : 15}}>
                <Dropdown value={storeData.tableNumber} setValue={storeData.setTableNumber} data={!tloading ? tdata : []} />
                </View>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'flex-start'}}
                    data={cdata}
                    numColumns={3}
                    keyExtractor={category => category.CategoryID}
                    renderItem={({item}) => <CategoryCard item={item} onPress={() => navigation.navigate('Items', {categoryID: item.CategoryID})} />}
                />
                <CartButton text='View Cart' onPress={() => navigation.navigate('Cart')} />
            </View>
        )
    }
}

export default CategoriesScreen;