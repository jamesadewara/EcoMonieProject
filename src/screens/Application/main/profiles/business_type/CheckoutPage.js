import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Appbar, useTheme, List } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { selectCurrentToken } from '../../../../../app/actions/authSlice';
import { useGetBuyerQuery, useGetSellerQuery, useGetUserQuery } from '../../../../../app/services/registration/signupApiSlice';
import { useSelector } from 'react-redux';
import LoadingSkeleton from '../../../../../Components/LoadingSkeleton';

const CheckoutPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  // Redux state and actions
  const accessToken = useSelector(selectCurrentToken);

  // Query for getting user info
  const { data: userInfo, isLoading: isLoadingUser, isError: isErrorUser, refetch: userRefetch } = useGetUserQuery({ accessToken });

  const id = userInfo?.id;

  const { data: buyerInfo, isLoading: isLoadingBuyer, isError: isErrorBuyer, refetch: refetchBuyer } = useGetBuyerQuery({ accessToken, id });
  const { data: sellerInfo, isLoading: isLoadingSeller, isError: isErrorSeller, refetch: refetchSeller } = useGetSellerQuery({ accessToken, id });

  // useEffect to refetch the buyerInfo or sellerInfo based on changes in userInfo
  useEffect(() => {
    if (userInfo?.is_buyer) {
      refetchBuyer();
    } else if (userInfo?.is_seller) {
      refetchSeller();
    }
  }, [userInfo]);

  console.log(userInfo);

  if (isLoadingUser || (userInfo?.is_buyer ? isLoadingBuyer : isLoadingSeller)) {
    return <LoadingSkeleton isLoading={true} />;
  }

  return (
    <SafeAreaProvider>
      {/* Appbar */}
      <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.color} />
        <Appbar.Content title="My Profile" titleStyle={{ color: theme.colors.color }} />
        <Appbar.Action icon="pen" iconColor={theme.colors.color} onPress={() => userInfo?.is_buyer ? navigation.navigate("register_buyer", { 'update': true }) : navigation.navigate("register_seller", { 'update': true })} />
      </Appbar.Header>


      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.contentContainer}>
          {/* User Profile Picture */}
          <Image source={{ uri: userInfo?.profile_pic }} style={[styles.profilePicture, { backgroundColor: theme.colors.appbar }]} />

          {/* User Section */}
          <Text style={[styles.title, { color: theme.colors.color }]}>User</Text>

          <List.Section>
            {/* Name */}
            <List.Item
              style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
              titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
              descriptionStyle={{ color: theme.colors.color }}
              description={userInfo?.first_name + ' ' + userInfo?.last_name}
              title="Name"
              left={() => <List.Icon icon="account" color={theme.colors.color} />}
            />

            {/* Email */}
            <List.Item
              style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
              titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
              descriptionStyle={{ color: theme.colors.color }}
              description={userInfo?.email}
              title="Email"
              left={() => <List.Icon icon="email" color={theme.colors.color} />}
            />
          </List.Section>

          {/* Buyer-specific content */}
          {userInfo?.is_buyer && (
            <React.Fragment>
              {/* Business Section */}
              <Text style={[styles.title, { color: theme.colors.color }]}>Business: Buyer</Text>

              <List.Section>

                {/* Company's Name */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={buyerInfo?.company_name}
                  title="Company's Name"
                  left={() => <List.Icon icon="business" color={theme.colors.color} />}
                />

                {/* Address */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={buyerInfo?.address}
                  title="Address"
                  left={() => <List.Icon icon="map-marker" color={theme.colors.color} />}
                />

                {/* Phone Number */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={buyerInfo?.phone_number}
                  title="Phone Number"
                  left={() => <List.Icon icon="phone" color={theme.colors.color} />}
                />

                {/* About */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={buyerInfo?.about}
                  title="About"
                  left={() => <List.Icon icon="information" color={theme.colors.color} />}
                />

                
              </List.Section>
            </React.Fragment>
          )}

          {/* Seller-specific content */}
          {userInfo?.is_seller && (
            <React.Fragment>
              {/* Business Section */}
              <Text style={[styles.title, { color: theme.colors.color }]}>Business: Seller</Text>

              <List.Section>

                {/* Paypal */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={sellerInfo?.paypal_email}
                  title="Paypal's Email Address"
                  left={() => <List.Icon icon="email" color={theme.colors.color} />}
                />

                {/* Address */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={sellerInfo?.address}
                  title="Address"
                  left={() => <List.Icon icon="map-marker" color={theme.colors.color} />}
                />

                {/* Phone Number */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={sellerInfo?.phone_number}
                  title="Phone Number"
                  left={() => <List.Icon icon="phone" color={theme.colors.color} />}
                />

                {/* About */}
                <List.Item
                  style={[styles.listItem, { backgroundColor: theme.colors.cardsdialogs }]}
                  titleStyle={{ color: theme.colors.color, fontWeight: 'bold' }}
                  descriptionStyle={{ color: theme.colors.color }}
                  description={sellerInfo?.about}
                  title="About"
                  left={() => <List.Icon icon="information" color={theme.colors.color} />}
                />

              </List.Section>
            </React.Fragment>
          )}
        </View>

        <View style={{ marginBottom: 300 }}></View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePicture: {
    width: 300,
    height: 280,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  listItem: {
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CheckoutPage;
