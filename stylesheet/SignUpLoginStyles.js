import { StyleSheet } from 'react-native';

const neonGreen = '#39FF14'; // Define a neon green color

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color to neon green
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white', // Use white color for the logo text
  },
  logoText: {
    fontSize: 24,
    color: 'black', // Use white color for the logo text
    marginTop: 10,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white', // Set the content background color to white
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Add a shadow effect
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: neonGreen, // Use neon green for input border
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: neonGreen, // Use neon green for the button background
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInLinkContainer: {
    flexDirection: 'row', // Arrange the text components in a row
    marginTop: 10,
    justifyContent: 'center', // Center the content horizontally
  },
  signInText: {
    fontSize: 16,
    color: 'black', // Use white color for the "Having an account?" text
    fontStyle: 'italic', // make the text italic
  },
  signInLink: {
    fontSize: 16,
    color: 'black', // Use white color for the "Sign In" link
    marginLeft: 5, // Add some space between the "Having an account?" text and the link
    fontWeight: 'bold', // Make the link text bold
    fontStyle: 'italic', // make the text italic
  },
  image: {
    width: 100,
    height: 40,
  },
});
