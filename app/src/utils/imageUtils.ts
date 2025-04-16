/**
 * Image utility functions for the Shopping Cart application
 */
import React from 'react';
import { NativeSyntheticEvent, ImageErrorEventData } from 'react-native';

/**
 * Default placeholder image to use when an image fails to load
 */
export const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/150';

/**
 * Checks if the provided URL is a valid image URL
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return Boolean(parsedUrl);
  } catch (e) {
    return false;
  }
};

/**
 * Checks if the provided image source is a remote URL
 * @param source The image source to check
 * @returns Boolean indicating if the source is a remote URL
 */
export const isRemoteImage = (source: string): boolean => {
  if (!source) return false;
  return source.startsWith('http://') || source.startsWith('https://');
};
/**
 * Returns a fallback image URL if the provided URL is invalid
 * @param url The image URL to check
 * @param fallback Optional custom fallback URL
 * @returns Valid image URL or fallback
 */
export const getValidImageUrl = (url: string, fallback = PLACEHOLDER_IMAGE_URL): string => {
  return isValidImageUrl(url) ? url : fallback;
};

/**
 * Preloads an image to ensure it's cached before displaying
 * @param url The image URL to preload
 * @returns Promise that resolves when the image is loaded or rejects on error
 */
export const preloadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
};

/**
 * Resizes an image URL by appending query parameters
 * (Works with services that support URL-based resizing like Cloudinary)
 * @param url The original image URL
 * @param width Desired width
 * @param height Desired height
 * @returns Resized image URL
 */
export const getResizedImageUrl = (url: string, width: number, height: number): string => {
  if (!isValidImageUrl(url)) return PLACEHOLDER_IMAGE_URL;

  // This is a simplified example. Implementation depends on your image service.
  // For services like Cloudinary, you might transform the URL differently.
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.append('width', width.toString());
    parsedUrl.searchParams.append('height', height.toString());
    return parsedUrl.toString();
  } catch (e) {
    return url;
  }
};

/**
 * Handles image loading errors by replacing with a placeholder
 * @param event The error event from an img element or React Native image
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement> | NativeSyntheticEvent<ImageErrorEventData>
): void => {
  // For web React
  if ('target' in event && event.target instanceof HTMLImageElement) {
    event.target.src = PLACEHOLDER_IMAGE_URL;
  }
  // For React Native, we don't modify the source here
  // Instead, the component should handle fallback rendering
};

