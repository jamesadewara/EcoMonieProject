import { StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';

export const Styles = StyleSheet.create({
    //recommends
    p2: {
        padding: 20,
    },
    m2: {
        margin: 20,
    },
    mb2: {
      marginBottom: 20,
    },
    mh100: {
        height: "100%"
    },
    mw100: {
        width: "100%"
    },
    w3: {
      width: 310,
    },
    w2:{
      width:220
    },
    container: {
      justifyContent: 'center',
      alignSelf: 'center',
    },
    defaultGradient: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        ...StyleSheet.absoluteFillObject,
        opacity: 0.55,
      },
    noBg: {
        backfaceVisibility: 'hidden',
        backgroundColor: "transparent"
    },
    inputContainer: {
      marginBottom: 16,
      width: "90%"
    },

    //Splash Page Section
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashImage: {
      width: 100,
      height: 100,
    },
    hero: {
        width: "100%",
        height: "80vh",
        background: "#377e4c",
    },
    animated: {
        animation: "up-down 2s ease-in-out infinite alternate-reverse both",
    },
    //end of splash page section

    //Team section
    teamContainer: {
        backgroundColor: '#f8f9fa', // Set the background color as needed
        paddingTop: 40,
        paddingBottom: 40,
      },
      sectionTitle: {
        alignItems: 'center',
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      description: {
        marginTop: 10,
        textAlign: 'center',
      },
      teamMember: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
        paddingHorizontal: 15,
      },
      memberImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
      },
      memberInfo: {
        flex: 1,
        marginLeft: 15,
      },
      memberName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      memberRole: {
        marginTop: 5,
        fontSize: 14,
        color: '#666',
      },
      memberDescription: {
        marginTop: 10,
      },
      memberSocial: {
        marginTop: 20,
        flexDirection: 'row',
      },
    
})
   
export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green:  MD2Colors.green900,
    lightgreen:  MD2Colors.green300,
    red: MD2Colors.red800,
    blue: MD2Colors.blue500,
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
  };