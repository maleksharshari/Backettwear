import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import Layout from '../layout/_layout';
import { isRemoteImage } from '../utils/imageUtils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen = () => {
    const cartContext = useContext(CartContext);
    const { cart, removeFromCart, clearCart } = cartContext;
    const navigation = useNavigation<CartScreenNavigationProp>();
    const totalPrice = cart.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0).toFixed(2);

    const handleCheckout = () => {
        // First navigate to payment success
        navigation.navigate('PaymentSuccess');
        // Then clear the cart after navigation is initiated
        clearCart();
    };

    if (cart.length === 0) {
        return (
            <Layout>
                <View style={styles.emptyCart}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
            </Layout>
        );
    }

    return (
        <Layout>
            <FlatList
                data={cart}
                keyExtractor={item => item.product.id}
                renderItem={({ item }) => {
                    const imageSource = isRemoteImage(item.product.image)
                        ? { uri: item.product.image }
                        : require('../assets/general-img-portrait.png');
                        
                    return (
                        <View style={styles.cartItem}>
                            <Image 
                                source={imageSource} 
                                style={styles.thumbnail}
                            />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.product.name}</Text>
                                <Text style={styles.itemPrice}>${item.product.price}</Text>
                                <Text style={styles.itemDescription} numberOfLines={1}>
                                    {item.product.description}
                                </Text>
                                <Text>Qty: {item.quantity}</Text>
                            </View>
                            <Button
                                title="Remove"
                                onPress={() => removeFromCart(item.product.id)}
                                color="#ff6347"
                            />
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Text style={styles.total}>Total: ${totalPrice}</Text>
                        <Button 
                            title="Checkout" 
                            color="#4caf50" 
                            onPress={handleCheckout}
                        />
                    </View>
                }
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        alignItems: 'center',
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#666',
    },
    itemDescription: {
        color: '#777',
        fontSize: 12,
        marginBottom: 4,
    },
    footer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
    }
});

export default CartScreen;
