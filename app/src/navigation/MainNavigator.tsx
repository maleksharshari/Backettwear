import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

// Define navigation parameter types
export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  PaymentSuccess: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
    const auth = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    
    const { cart } = cartContext;
    const { user } = auth;

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            {user ? (
                <>
                    <Stack.Screen 
                        name="Home" 
                        component={HomeScreen} 
                        options={({ navigation }) => ({
                            headerRight: () => (
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Cart')}
                                    style={{ marginRight: 15 }}
                                >
                                    <Ionicons name="cart-outline" size={24} color="white" />
                                    {cart.length > 0 && (
                                        <Ionicons 
                                            name="ellipse" 
                                            size={12} 
                                            color="#4caf50" 
                                            style={{ 
                                                position: 'absolute', 
                                                top: -5, 
                                                right: -5 
                                            }} 
                                        />
                                    )}
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen 
                        name="PaymentSuccess" 
                        component={PaymentSuccessScreen}
                        options={{ 
                            headerShown: true,
                            title: "Payment Successful"
                        }} 
                    />
                </>
            ) : (
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
            )}
        </Stack.Navigator>
    );
};

export default MainNavigator;
