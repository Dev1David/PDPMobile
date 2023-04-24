import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import React, {useState} from "react";
import * as Font from "expo-font";
import {Text, View} from "react-native";
import {NativeBaseProvider} from "native-base";
import {createLogger} from "redux-logger";
import rootReducer from "./store/redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";

const logger = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    (async () => {
        await Font.loadAsync({
            'PressStart2P-Regular': require('./assets/fonts/PressStart2P-Regular.ttf'),
        });
        setFontLoaded(true);
    })();


    if (!fontLoaded) {
        return <View>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <SafeAreaProvider>
                    <Navigation/>
                    <StatusBar/>
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    );
}
