import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  Linking,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, List, TouchableRipple, Dialog, Portal, Appbar, MD2Colors, useTheme,Switch } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../../widgets/customAlert';
import { useGetSettingsQuery } from '../../../app/services/features/settingsServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentToken } from '../../../app/actions/authSlice';
import * as FileSystem from 'expo-file-system';
import { useLogoutMutation } from '../../../app/services/authentication/authApiSlice';
import ErrorPage from '../../../Components/ErrorPage';
import { selectCurrentTheme, setTheme } from '../../../app/actions/themeSlice';


const Thumbnail = {
  noNetwork: require('../../../../assets/img/anime/noInternet.gif'),
  icon: require('../../../../assets/icon.png')
};

export default function SettingsPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const accessToken = useSelector(selectCurrentToken);
  const { data: settings = [], isLoading, isError, error, refetch } = useGetSettingsQuery({ accessToken });
  const { logout } = useLogoutMutation();

  const settingsInfo = settings[0];
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [cacheDialog, setCacheDialog] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);

  const [isThemeMode, setIsThemeMode] = useState(useSelector(selectCurrentTheme));
  const  theme = useTheme()

  // Show/hide logout dialog
  const showLogoutDialog = () => setLogoutDialog(true);
  const hideLogoutDialog = () => setLogoutDialog(false);

  // Show/hide cache dialog
  const showCacheDialog = () => setCacheDialog(true);
  const hideCacheDialog = () => setCacheDialog(false);

  // Show/hide about dialog
  const showAboutDialog = () => setAboutDialog(true);
  const hideAboutDialog = () => setAboutDialog(false);

  // Handle logout
  async function handleLogout() {
    try {
      await logout({ accessToken });
    } catch (error) {
      // Handle error
    }
    dispatch(logOut());
  }

  // Clear app cache
  const handleClearCache = async () => {
    try {
      // Get the cache directory path
      const cacheDirectory = FileSystem.cacheDirectory;

      // Delete all files in the cache directory
      await FileSystem.deleteAsync(cacheDirectory, { idempotent: true });

      console.log('Cache cleared successfully');
    } catch (error) {
      console.log('Error clearing cache:', error);
    }
  };


  const onToggleThemeMode = async () => {
    setIsThemeMode(!isThemeMode); // Toggle the theme value
    dispatch(setTheme(!isThemeMode))
  };
  

  // Extract data from settings object
  const aboutData = settingsInfo?.about;
  const contactData = settingsInfo?.contact_no;
  const feedbackData = settingsInfo?.feedback_email;
  const shareData = settingsInfo?.share_link;
  const rateData = settingsInfo?.rate_link;
  const terms_and_serviceData = settingsInfo?.terms_and_service;
  const help_and_supportData = settingsInfo?.help_and_support;
  const updatesData = settingsInfo?.updates;

  


  const SECTIONS = [
    {
      id:1,
      header: 'Account',
      items: [
        {
          id: 'account',
          icon: 'account',
          label: 'Edit your profile',
          description: '',
          color: MD2Colors.green900,
          navigate: "edit_profile",
          data_route: { 'email': 'jamesadewara1@gmail.com' }
        },
        {
          id: 'change_password',
          icon: 'key',
          label: 'Change your password',
          color: 'silver',
          navigate: "change_password",
          data_route: { 'email': 'jamesadewara1@gmail.com' }
        },
        {
          id: 'cache',
          icon: 'memory',
          label: 'Clear your device cache',
          color: MD2Colors.blue800,
          action: showCacheDialog,
        },
        {
          id: 'logout',
          icon: 'logout',
          label: 'Logout',
          color: 'pink',
          action: showLogoutDialog,
        },
      ],
    },
    {
      id:2,
      header: 'Services',
      items: [
        {
          id: 'notifications',
          icon: 'bell',
          label: 'Notifications',
          description: '',
          color: 'royalblue',
          navigate: "notification",
        },
        {
          id: 'updates',
          icon: 'update',
          label: 'Check for updates',
          description: '',
          color: 'cyan',
          url: updatesData,
        },
        {
          id: 'customer_service',
          icon: 'phone',
          label: 'Customer Service',
          description: 'Sell by making a call',
          color: 'green',
          url: `tel:${contactData}`,
        },
      ],
    },
    {
      id:3,
      header: 'General',
      items: [
        {
          id: 'theme',
          icon: 'palette',
          label: 'Enable Dark Mode',
          description: '',
          color: 'brown',
          displaySwitch: true,
          action: onToggleThemeMode,
          switched: isThemeMode, // Correct the variable name here
          onSwitch: onToggleThemeMode, // Use onToggleThemeMode function
        },
        {
          id: 'rates',
          icon: 'star',
          label: 'Rate our app',
          description: '',
          color: 'orange',
          url: rateData,
        },
        {
          id: 'share',
          icon: 'share',
          label: 'Share the app',
          description: '',
          color: 'purple',
          url: shareData,
        },
        {
          id: 'feedback',
          icon: 'chat',
          label: 'Feedback',
          description: 'Give us a review of what you like about our app',
          color: 'green',
          url: `mailto:${feedbackData}`,
        },
        {
          id: 'about',
          icon: 'information',
          label: 'About Us',
          color: 'gray',
          action: showAboutDialog,
        },
        {
          id: 'terms',
          icon: 'file-document',
          label: 'Terms & Conditions',
          description: '',
          color: MD2Colors.teal300,
          navigate: "terms",
          data_route: { page: "Terms & Conditions", link: terms_and_serviceData },
        },
        {
          id: 'help',
          icon: 'lifebuoy',
          label: 'Help & Support',
          description: '',
          color: MD2Colors.green300,
          navigate: "terms",
          data_route: { page: "Help & Support", link: help_and_supportData },
        },
      ],
    },
  ];

  const handleRefresh = () => {
    refetch();
  };

  const renderView = () => {
    if (isError) {
      return <ErrorPage handleRefresh={handleRefresh} />;
    }

    return (
      <View>
        {isLoading && (
          <CustomAlert visible={isLoading} message="Loading..." />
        )}

        <Portal>
          <Dialog visible={logoutDialog} onDismiss={hideLogoutDialog} style={{ backgroundColor: theme.colors.cardsdiaogs }}>
            <Dialog.Title style={{ color: theme.colors.color }}>Logout</Dialog.Title>
            <Dialog.Content>
              <Text variant="titleLarge" style={{ color: theme.colors.color }}>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideLogoutDialog}>No</Button>
              <Button onPress={() => { handleLogout(); hideLogoutDialog(); }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={cacheDialog} onDismiss={hideCacheDialog} style={{ backgroundColor: theme.colors.cardsdiaogs }}>
            <Dialog.Title style={{ color: theme.colors.color }}>Reset Systems Cache</Dialog.Title>
            <Dialog.Content>
              <Text style={[styles.dialogText, { color: theme.colors.color }]}>
                By resetting the system's cache, you will be automatically logged out from your account and all data stored from the internet will be lost.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideCacheDialog}>No</Button>
              <Button onPress={() => { handleClearCache(); hideCacheDialog(); }}>Yes</Button>

            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={aboutDialog} onDismiss={hideAboutDialog} style={{ backgroundColor: theme.colors.cardsdiaogs }}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={styles.aboutDialogContent}>
                <Text style={{ color: theme.colors.color }}>{aboutData}</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>

        <ScrollView contentContainerStyle={styles.container}>
          <React.Fragment>
            {SECTIONS.map(({ header, items,id }) => (
              <View key={id} style={[styles.section, { backgroundColor: theme.colors.cardsdiaogs }]}>
                <List.Section>
                  <List.Subheader style={[styles.sectionHeader, { color: theme.colors.color }]}>
                    {header}
                  </List.Subheader>
                  {items.map(({ id, label, icon, color, action, navigate, description, url, data_route,displaySwitch ,switched,onSwitch}) => (
                    <TouchableRipple
                      key={id}
                      onPress={() => (navigate ? navigation.navigate(navigate, data_route) : url ? Linking.openURL(url) : action())}
                      rippleColor="beige"
                    >
                      <List.Item
                        style={[styles.listItem, {}]}
                        titleStyle={{ color: theme.colors.color }}
                        descriptionStyle={{ color: theme.colors.color }}
                        description={description}
                        title={label}
                        left={() => <List.Icon icon={icon} color={color} />}
                        right={() => displaySwitch ? <Switch value={switched} onValueChange={onSwitch} ios_backgroundColor="#E5E5EA" /> : null}
                      />
                    </TouchableRipple>
                  ))}
                </List.Section>
              </View>
            ))}
          </React.Fragment>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.Content
          title="Settings"
          titleStyle={{ color: theme.colors.color }}
        />
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {renderView()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  section: {
    marginVertical: 15,
    borderRadius: 20,
    margin: 15,
    paddingBottom: 7,
  },
  sectionHeader: {
    fontWeight: 'bold',
  },
  listItem: {
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    marginBottom: 120,
  },
  dialogText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutDialogContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
  },
});
