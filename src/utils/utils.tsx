import { CommonActions, StackActions } from "@react-navigation/native";

export const navigateScreen = (
    navigation: any,
    screenName: string,
    params?: object
  ) => {
    if (params) {
      return navigation.navigate(screenName, params);
    } else {
      return navigation.navigate(screenName);
    }
  };
  
  export const resetScreen = (
    navigation: any,
    screenName: string,
    params?: object
  ) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName, params }],
      })
    );
  };

  export const goBack = (navigation: any) => {
    return navigation.goBack();
  };