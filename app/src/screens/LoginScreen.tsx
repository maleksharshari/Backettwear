import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../FirebaseConfig';

const LoginScreen = () => {
    const authContext = useContext(AuthContext);
    const { login, isLoading } = authContext;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }
        
        try {
            if (isSignUp) {
                // Sign up with Firebase
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                login(user);
            } else {
                // Login with Firebase
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                login(user);
            }
        } catch (error) {
            let errorMessage = 'An unexpected error occurred';
            
            if (error instanceof Error) {
                // Handle specific Firebase error codes
                const errorCode = error.message;
                
                if (errorCode.includes('auth/user-not-found') || errorCode.includes('auth/wrong-password')) {
                    errorMessage = 'Invalid email or password';
                } else if (errorCode.includes('auth/email-already-in-use')) {
                    errorMessage = 'Email is already in use';
                } else if (errorCode.includes('auth/invalid-email')) {
                    errorMessage = 'Invalid email address';
                } else if (errorCode.includes('auth/weak-password')) {
                    errorMessage = 'Password is too weak';
                } else {
                    errorMessage = error.message;
                }
            }
            
            Alert.alert('Authentication Failed', errorMessage);
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome to backettwear</Text>
                <Text style={styles.subtitle}>
                    {isSignUp ? 'Sign up for an account' : 'Sign in to continue'}
                </Text>
                
                <TextInput
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                    style={styles.input}
                />
                
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleAuth}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.loginButtonText}>
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={toggleAuthMode} style={styles.toggleButton}>
                    <Text style={styles.toggleText}>
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
        backgroundColor: '#000000',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    toggleText: {
        color: '#000000',
        fontSize: 14,
    },
});

export default LoginScreen;

