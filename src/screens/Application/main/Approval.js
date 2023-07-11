import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CustomAlert from "../../../Components/CustomAlert";
import ErrorPage from '../../../Components/ErrorPage';
import ChatList from '../../../Components/ChatList';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { selectCurrentToken } from '../../../app/actions/authSlice';
import { useGetPartnersQuery } from '../../../app/services/features/partnersApiServer';
import { useGetUserQuery } from '../../../app/services/registration/signupApiSlice';
// import { useGetProfileQuery } from '../../../app/services/features/usersProfileApi';


const partners = [
  {
    id: 1,
    username: 'AdewaraJames',
    email: 'mail.com',
  },
];

const ApprovalPage = () => {
  const theme = useTheme();
  const accessToken = useSelector(selectCurrentToken);
  const {
    data: userInfo,
    isLoadingUser,
    isErrorUser,
    refetch: userInfoRefetch,
  } = useGetUserQuery({ accessToken });

  // const {
  //   data: partners,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetProfileQuery({ accessToken});

  // console.log(userInfo,"userinfostardoy",partners)

  const renderView = () => {
    // if (isErrorUser) {
    //   return <ErrorPage handleRefresh={handleRefresh} />;
    // }
    if (isLoadingUser) {
      return (
        <LoadingSkeleton isLoading={true} />
      );
    }

    return (
      <View>
      {/* //   {isLoadingUser && <CustomAlert visible={true} message="Loading..." />}
      //   {!isLoadingUser && ( */}
          <ChatList
            partners={partners}
            backgroundColor={theme.colors.cardsdiaogs}
            color={theme.colors.color}
          />
        {/* //)} */}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.colors.appbar }}>
          <Appbar.Content title="Approval" titleStyle={{ color: theme.colors.color }} />
        </Appbar.Header>
        {renderView()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ApprovalPage;
