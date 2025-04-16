import React, { useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  
  const handleLogout = async () => {
    if (authContext) {
      await authContext.logout();
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>backettwear</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>{children}</View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#000000',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  logoutButton: {
    padding: 5,
  }
});

export default Layout;

