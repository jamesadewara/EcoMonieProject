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
import { Button, List, TouchableRipple, Dialog, Portal, Appbar, MD2Colors } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../../widgets/customAlert';
import { useGetSettingsQuery } from '../../../app/services/features/settingsServerApi';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentToken } from '../../../app/actions/authSlice';

const Thumbnail = {
  noNetwork: require('../../../../assets/img/anime/noInternet.gif'),
  icon: require('../../../../assets/icon.png')
};

export default function SettingsPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const accessToken = useSelector(selectCurrentToken);
  const { data: settings = [], isLoading, isError, error, refetch } = useGetSettingsQuery({ accessToken });

  const settingsInfo = settings[0];
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [cacheDialog, setCacheDialog] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);

  const showLogoutDialog = () => setLogoutDialog(true);
  const hideLogoutDialog = () => setLogoutDialog(false);
  const showCacheDialog = () => setCacheDialog(true);
  const hideCacheDialog = () => setCacheDialog(false);
  const showAboutDialog = () => setAboutDialog(true);
  const hideAboutDialog = () => setAboutDialog(false);

  function logout() {
    dispatch(logOut());
  }

  function clearCache() {
    // Add the necessary code for clearing cache here
  }

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
      header: 'Services',
      items: [
        {
          id: 'notifications',
          icon: 'bell',
          label: 'Notifications',
          description: '',
          color: 'midnightblue',
          navigate: "notification",
        },
        {
          id: 'updates',
          icon: 'update',
          label: 'Check for updates',
          description: '',
          color: 'royalblue',
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
      header: 'General',
      items: [
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
      return (
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']} style={styles.defaultGradient} />
            <View style={styles.noConnectionContainer}>
              <Text style={{ color: 'green', fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>
                NO NETWORK CONNECTION
              </Text>
              <Image source={Thumbnail.noNetwork} style={{ width: 150, height: 150 }} />
              <View>
                <Button style={{ backgroundColor: 'green' }} onPress={handleRefresh} mode="contained">
                  Reload
                </Button>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    }

    return (
      <View>
        {isLoading && (
          <CustomAlert visible={isLoading} message="Loading..." />
        )}

        <Portal>
          <Dialog visible={logoutDialog} onDismiss={hideLogoutDialog}>
            <Dialog.Title>Logout</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideLogoutDialog}>No</Button>
              <Button onPress={() => { logout(); hideLogoutDialog(); }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={cacheDialog} onDismiss={hideCacheDialog}>
            <Dialog.Title>Reset Systems Cache</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>
                By resetting the system's cache, you will be automatically logged out from your account and all data stored from the internet will be lost.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideCacheDialog}>No</Button>
              <Button onPress={() => { clearCache(); hideCacheDialog(); }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={aboutDialog} onDismiss={hideAboutDialog}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={styles.aboutDialogContent}>
                <Text>{aboutData}</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>

        <ScrollView contentContainerStyle={styles.container}>
          <React.Fragment>
            {SECTIONS.map(({ header, items }) => (
              <View key={header} style={styles.section}>
                <List.Section>
                  <List.Subheader style={styles.sectionHeader}>
                    {header}
                  </List.Subheader>
                  {items.map(({ id, label, icon, color, action, navigate, description, url, data_route }) => (
                    <List.Item
                      key={id}
                      onPress={() => (navigate ? navigation.navigate(navigate, data_route) : url ? Linking.openURL(url) : action())}
                      style={styles.listItem}
                      description={description}
                      title={label}
                      left={() => <List.Icon icon={icon} color={color} />}
                    />
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
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <SafeAreaView style={styles.safeAreaContainer}>
        {renderView()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  section: {
    marginVertical: 15,
    backgroundColor: 'white',
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
    fontWeight: '400',
  },
  aboutDialogContent: {
    paddingHorizontal: 24,
  },
  defaultGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  noConnectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
