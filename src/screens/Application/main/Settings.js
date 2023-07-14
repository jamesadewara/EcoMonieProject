import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, Linking, StyleSheet, View, Image, RefreshControl,Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, List, TouchableRipple, Dialog, Portal, Appbar, Switch, ActivityIndicator, useTheme, Badge, MD2Colors } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';

import CustomAlert from "../../../Components/CustomAlert";
import { useGetSettingsQuery } from '../../../app/services/features/settingsServerApi';

import { useLogoutMutation } from '../../../app/services/authentication/authApiSlice';
import ErrorPage from '../../../Components/ErrorPage';

import { logOut, selectCurrentToken } from '../../../app/actions/authSlice';
import { selectCurrentTheme, setTheme } from '../../../app/actions/themeSlice';
import { useGetUserQuery } from '../../../app/services/registration/signupApiSlice';
import LoadingSkeleton from '../../../Components/LoadingSkeleton';

// Import images
const Thumbnail = {
  noNetwork: require('../../../../assets/img/anime/noInternet.gif'),
  icon: require('../../../../assets/icon.png')
};

export default function SettingsPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // Redux state and actions
  const accessToken = useSelector(selectCurrentToken);
  console.log(accessToken, 'settings');
  const { data: settings = [], isLoading, isError, error, refetch } = useGetSettingsQuery({ accessToken });
  // Query for getting user info
  const { data: userInfo, isLoadingUser, isErrorUser, refetch: userRefetch } = useGetUserQuery({ accessToken });
  const { logout } = useLogoutMutation();

  // Settings and dialogs state
  const settingsInfo = settings[0];
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [cacheDialog, setCacheDialog] = useState(false);
  const [aboutDialog, setAboutDialog] = useState(false);

  // Theme state and theme context
  const currentTheme = useSelector(selectCurrentTheme);
  const [isThemeMode, setIsThemeMode] = useState(currentTheme === 'dark');
  const theme = useTheme();

  // Show/hide logout dialog
  const showLogoutDialog = () => setLogoutDialog(true);
  const hideLogoutDialog = () => setLogoutDialog(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout({ accessToken });
    } catch (error) {
      // Handle error
    }
    dispatch(logOut());
  };


  // Toggle theme mode
  const onToggleThemeMode = () => {
    console.log(1, isThemeMode)
    setIsThemeMode(!isThemeMode)
    const newThemeMode = !isThemeMode ? 'dark' : 'light';
    dispatch(setTheme(newThemeMode));
    
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

  // Extract data from users object
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: shareData,
        url: shareData,
        title: 'EcoMonie',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Sharing completed
          console.log(`Shared with ${result.activityType}`);
        } else {
          // Sharing dismissed
          console.log('Sharing dismissed');
        }
      } else if (result.action === Share.dismissedAction) {
        // Sharing dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };
  

  useEffect(() => {
    if (isErrorUser) {
      // Handle error case
      setIsBuyer(false);
      setIsSeller(false);
    } else if (!isLoadingUser && userInfo) {
      // Handle success case
      setIsBuyer(userInfo?.is_buyer);
      setIsSeller(userInfo?.is_seller);
    }
  }, []);

  // Sections and items
  const SECTIONS = [
    {
      id: 1,
      header: 'Account',
      items: [
        {
          id: 'account',
          icon: 'account',
          label: 'Edit your profile',
          description: '',
          color: 'green',
          navigate: !isBuyer && !isSeller ? "business_type" : "checkout",
          internet: true,
        },
        {
          id: 'history',
          icon: 'history',
          label: 'History',
          color: 'blue',
          navigate: 'history',
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
      id: 2,
      header: 'Services',
      items: [
        {
          id: 'updates',
          icon: 'update',
          label: 'Check for updates',
          description: '',
          color: MD2Colors.blueGrey700,
          url: "updatesData",
          internet: true,
        },
        {
          id: 'customer_service',
          icon: 'phone',
          label: 'Customer Service',
          description: 'Sell by making a call',
          color: 'green',
          url: `tel:${contactData}`,
          internet: true,
        },
      ],
    },
    {
      id: 3,
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
          switched: isThemeMode,
          onSwitch: onToggleThemeMode,
        },
        {
          id: 'rates',
          icon: 'star',
          label: 'Rate our app',
          description: '',
          color: 'orange',
          url: rateData,
          internet: true,
        },
        {
          id: 'share',
          icon: 'share',
          label: 'Share the app',
          description: '',
          color: 'purple',
          action: shareApp,
          internet: true,
        },
        {
          id: 'feedback',
          icon: 'chat',
          label: 'Feedback',
          description: 'Give us a review of what you like about our app',
          color: 'green',
          url: `mailto:${feedbackData}`,
          internet: true,
        },
        {
          id: 'about',
          icon: 'information',
          label: 'About Us',
          color: 'gray',
          navigate: "about",
        },
        {
          id: 'terms',
          icon: 'file-document',
          label: 'Terms & Conditions',
          description: '',
          color: 'teal',
          navigate: "terms",
          data_route: { page: "Terms & Conditions", link: terms_and_serviceData },
          internet: true,
        },
        {
          id: 'help',
          icon: 'lifebuoy',
          label: 'Help & Support',
          description: '',
          color: 'green',
          navigate: "terms",
          data_route: { page: "Help & Support", link: help_and_supportData },
          internet: true,
        },
      ],
    },
  ];

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    userRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Render view based on loading and error state
  const renderView = () => {
    if (isLoading || isLoadingUser) {
      return <LoadingSkeleton />;
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} enabled={true} />
        }>
          {SECTIONS.map(({ header, items, id }) => (
            <View key={id} style={[styles.section, { backgroundColor: theme.colors.cardsdialogs }]}>
              <List.Section>
                <List.Subheader style={[styles.sectionHeader, { color: theme.colors.color }]}>
                  {header}
                </List.Subheader>
                {items.map(({ id, label, icon, color, action, navigate, description, url, data_route, displaySwitch, switched, onSwitch, internet }) => (
                  (internet === undefined || !isError) && (
                    <TouchableRipple
                      key={id}
                      onPress={() => (navigate ? navigation.navigate(navigate, data_route) : url ? Linking.openURL(url) : action())}
                      rippleColor="grey"
                    >
                      <List.Item
                        style={styles.listItem}
                        titleStyle={{ color: theme.colors.color }}
                        descriptionStyle={{ color: theme.colors.color }}
                        description={description}
                        title={label}
                        left={() => <List.Icon icon={icon} color={color} />}
                        right={() => displaySwitch ? <Switch value={switched} onValueChange={onSwitch} ios_backgroundColor="#E5E5EA" /> : null}
                      />
                    </TouchableRipple>
                  )
                ))}
              </List.Section>
            </View>
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.Content
          title="Settings"
          titleStyle={{ color: theme.colors.color }}
        />
        <Appbar.Action
          icon="bell"
          iconColor="royalblue"
          onPress={() => navigation.navigate('notification')}
        />
        <Badge style={styles.badge} size={16}>
          3
        </Badge>
      </Appbar.Header>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {renderView()}
        <Portal>
          <Dialog visible={logoutDialog} onDismiss={hideLogoutDialog} style={{ backgroundColor: theme.colors.cardsdialogs }}>
            <Dialog.Title style={{ color: theme.colors.color }}>Logout</Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: theme.colors.color }}>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideLogoutDialog} style={{ marginRight: 8 }}>No</Button>
              <Button onPress={() => { handleLogout(); hideLogoutDialog(); }} mode="contained" style={{ backgroundColor: theme.colors.primary }}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  section: {
    marginVertical: 15,
    borderRadius: 20,
    marginHorizontal: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    right: 10,
  },
});
