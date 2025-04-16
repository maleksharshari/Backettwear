import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../data/products';
import { isRemoteImage, handleImageError } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const [imageError, setImageError] = useState(false);
  
  const imageSource = imageError || !isRemoteImage(product.image)
    ? require('../assets/general-img-portrait.png')
    : { uri: product.image };

  return (
    <View style={styles.card}>
      <Image 
        source={imageSource} 
        style={styles.image}
        onError={(e) => {
          handleImageError(e);
          setImageError(true);
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Ionicons name="add-circle" size={24} color="#ff6347" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: '48%',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    height: 32,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  addButtonText: {
    marginLeft: 5,
    color: '#000000',
    fontWeight: '500',
  },
});

export default ProductCard;
