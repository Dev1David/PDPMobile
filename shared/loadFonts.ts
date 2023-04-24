import * as Font from 'expo-font';

export async function loadFonts() {
    await Font.loadAsync({
        'fontFamily': {
            uri: 'https://fonts.googleapis.com/css2?family=fontFamily&display=swap'
        }
    });
}
