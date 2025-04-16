# Backettwear
An e-commerce application project
## 1. Introduction

### 1.1 Purpose

This document specifies the functional and non-functional requirements for **Backettwear**, a mobile e-commerce application designed for the sale of clothing and accessories. This document serves as a guide for developers, designers, and stakeholders.

### 1.2 Scope

Backettwear will allow users to:

- Browse and search for clothing products.
- Create and manage user accounts.
- Add or remove products from a shopping cart.
- Complete purchases

---

## 2. System Description

### 2.1 System Overview

Backettwear is a **React Native** mobile application that enables users to shop for clothing and accessories. The system includes user account management, a product catalog, a shopping cart, and secure checkout capabilities.

### 2.2 System Architecture

- **Frontend:** React Native with TypeScript.
- **Authentication:** Firebase Authentication.
- **Database:** Firebase Firestore (implied for product and user data storage).

---

## 3. Functional Requirements

### 3.1 User Authentication

- **FR1.1:** Users shall be able to create new accounts using email and password.
- **FR1.2:** Users shall be able to log in with valid credentials.
- **FR1.3:** The system shall validate user credentials against Firebase Authentication.
- **FR1.4:** The system shall display meaningful error messages upon failed login attempts.

### 3.2 Product Management

- **FR2.1:** The system shall display products with name, price, image, and description.
- **FR2.2:** Products shall be organized into categories for easy browsing.
- **FR2.3:** Users shall be able to view detailed information for each product.

### 3.3 Shopping Cart

- **FR3.1:** Users shall be able to add products to their shopping cart.
- **FR3.2:** The system shall increment the product quantity when the same product is added multiple times.
- **FR3.3:** Users shall be able to remove individual products from their cart.
- **FR3.4:** The system shall calculate and display the total price for items in the cart.

---

## 4. Non-Functional Requirements

### 4.1 Performance

- **NFR1.1:** The application shall load the product listings within 2 seconds under normal network conditions.
- **NFR1.2:** Cart operations (add, remove) shall complete within 1 second.

### 4.2 Security

- **NFR2.1:** User authentication shall be securely handled using Firebase Authentication.
- **NFR2.2:** User passwords shall never be stored or transmitted in plain text.

### 4.3 Usability

- **NFR3.1:** The user interface shall be intuitive and conform to modern mobile design patterns.
- **NFR3.2:** The application shall maintain responsive design across a variety of device screen sizes.

---

## 5. System Constraints

- The application shall be developed using **React Native** with **TypeScript**.
- **Firebase Authentication** shall be used for all user login and registration processes.
- The application shall be compatible with both **iOS** and **Android** platform
