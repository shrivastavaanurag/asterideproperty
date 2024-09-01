# AsterideProperty

AsterideProperty is a React Native application developed using Expo. This app is designed to showcase property listings, providing details such as images, descriptions, and pricing. It also includes functionality to unlock properties based on the user's location. I used Firebase Database and Firestore for login and register and retrive the data from the firebase database. 

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building the App](#building-the-app)
- [EAS Commands](#eas-commands)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display property details with images
- Location-based unlocking feature
- Smooth animations with `react-native-reanimated-carousel`
- Persistent storage with AsyncStorage
- Supports both Android and iOS platforms

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- Expo CLI installed globally (`npm install -g expo-cli`)
- An Expo account (for EAS builds)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shrivastavaanurag/asterideproperty.git
   cd asterideproperty

2. **Install dependencies:**

    ```bash
   npm install
   
3. **Start the Expo development server:**

    ```bash
   npx expo start -c


## Building the App

1. **Login to Expo:**

    ```bash
    eas login

2. **Configure the project:**

    This has already been done in your app.json file. The projectId is set, and the necessary plugins are configured.

3. **Build the app:**

    ```bash
    eas build --profile development --platform all


## Other EAS Commands

1.  **Build**
    ```bash
    eas build --profile development --platform all

2. **Update**
    ```bash
    eas update --platform all

3. **Submit**
    ```bash
    eas submit --platform all

    

### Notes:
Please contact ```shrivastava.anurag18@gmail.com``` for further information, or setup. 
