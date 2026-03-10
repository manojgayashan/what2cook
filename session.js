import AsyncStorage from "@react-native-async-storage/async-storage";
let finalval = "-";

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    // read key error
  }

  console.log("all keys");
  console.log(values);
};

export async function session(key1 = null, value1 = null) {
  if (finalval != "-") {
    return finalval;
  } else {
    if (key1 !== null && value1 !== null) {
      const storeData = async (key, value) => {
        value = value1.toString();
        try {
          if (value == "") {
            await AsyncStorage.removeItem(key1);
          } else {
            await AsyncStorage.setItem(key1, value);
          }
        } catch (e) {}
      };
      return storeData(key1, value1);
    } else if (key1 !== null && value1 === null) {
      const getData = async (key1) => {
        try {
          if (typeof key1 == "object") {
            const value = await AsyncStorage.multiGet(key1);

            let sessionData = {};
            value.map((result, i) => {
              sessionData[result[0]] = result[1];
            });
            return sessionData;
          } else {
            const value = await AsyncStorage.getItem(key1);
            return value === null ? false : value;
          }
        } catch (e) {}
      };

      return getData(key1);
    }
  }
}