import React, { useContext, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import { PRODUCTS } from '../data/products';
import Layout from '../layout/_layout';
import SearchBar from '../components/SearchBar';
import SortSelector from '../components/SortSelector';
import { searchProducts, sortProducts, SortType } from '../utils/searchUtils';

const HomeScreen = () => {
    const cartContext = useContext(CartContext);
    const { addToCart } = cartContext;

    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState<SortType>(SortType.NONE);

    // Filter and sort products based on search query and sort type
    const filteredAndSortedProducts = useCallback(() => {
        const searchResults = searchProducts(PRODUCTS, searchQuery);
        return sortProducts(searchResults, sortType);
    }, [searchQuery, sortType]);

    const displayedProducts = filteredAndSortedProducts();

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <Layout>
            <SearchBar 
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={handleClearSearch}
            />
            
            <SortSelector 
                selectedSort={sortType}
                onSelectSort={setSortType}
            />
            
            {displayedProducts.length === 0 ? (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>
                        No products found matching "{searchQuery}"
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={displayedProducts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ProductCard product={item} onAdd={() => addToCart(item)} />
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.productList}
                />
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    productList: {
        paddingVertical: 10,
    },
    noResults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    noResultsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    }
});

export default HomeScreen;
