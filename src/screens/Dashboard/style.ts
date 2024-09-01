import { StyleSheet } from "react-native";
import { MontserratMedium } from "../../constants/fontConstants";
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, backgroundColor: '#FFF'
  },
  list: {
    padding: 16,
  },
  header: {
    height: 60, width: '100%', backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,
      elevation: 10, flexDirection: 'row'
  },
  card: {
    width: "100%",
    minHeight: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    opacity: 0.5
  },
  info: {
    padding: 8,
    position: 'absolute', zIndex: 9, bottom: 0
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    fontFamily: MontserratMedium
  },
  loadingIndicator: {
    flex: 1, 
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff80'
  },
  logoutButton: {
    height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-end'
  }
});

export default styles;
