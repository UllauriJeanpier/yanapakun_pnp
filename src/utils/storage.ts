import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}

export const clean = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // error reading value
  }
}
