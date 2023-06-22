import React from 'react';
import { View, ImageBackground, Dimensions, ScrollView, Image, StyleSheet, Linking } from 'react-native';
import { Text, Card, FAB, MD2Colors, List } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import CustomAlert from '../../../widgets/customAlert';
import { Styles } from '../../../css/design';
import { useNavigation } from '@react-navigation/native';
import { useGetArticlesQuery } from '../../../app/services/features/articleServerApi';
import { useDispatch, useSelector } from 'react-redux';

const ArticlePage = () => {
  const screenSize = Dimensions.get('window');
  // Hooks and state variables
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.user.token);
  const {
    data: articles = [],
    isLoading,
    isFetching,
  } = useGetArticlesQuery({ accessToken });

  const articleInfo = articles[0];
  const articleSummary = articleInfo?.summary;
  const articleCore = articleInfo?.core;
  const articleTeam = articleInfo?.team;

  const SummarySection = ({ data }) => {
    if (!data) {
      return null;
    }

    return (
      <View style={[Styles.p2, { backgroundColor: MD2Colors.green50 }]}>
        <View>
          {data.image && (
            <Image resizeMode="contain" style={{ width: screenSize.width, height: screenSize.width }} source={{ uri: data.image }} />
          )}
        </View>
        <View style={[Styles.m2]}>
          <Text variant='headlineSmall' style={[{ fontWeight: "bold", color: MD2Colors.green700, textAlign: "center" }]}>{data.title}</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text variant="bodyLarge" style={{ textAlign: "justify", fontWeight: "100" }}>
            {data.description}
          </Text>
        </View>
        <View style={[{ paddingHorizontal: 10, marginBottom: 0 }]}>
          {data.list?.map((items, index) => (
            <List.Section style={{ paddingHorizontal: 0, paddingVertical: 0, margin: 0, backgroundColor: "white" }} key={index}>
              <List.Accordion
                titleNumberOfLines={15}
                descriptionNumberOfLines={300}
                title={items.title}
                titleStyle={{ color: MD2Colors.green800 }}
              >
                <List.Item title={items.text} titleNumberOfLines={900} />
              </List.Accordion>
            </List.Section>
          ))}
        </View>
      </View>
    );
  };

  const CoreSection = ({ data }) => {
    if (!data) {
      return null;
    }

    return (
      <View style={[Styles.p2, { backgroundColor: MD2Colors.white }]}>
        <View style={[Styles.m2]}>
          <Text variant='headlineSmall' style={[{ fontWeight: "bold", color: MD2Colors.green700, textAlign: "center" }]}>Our Core Values</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text variant="bodyLarge" style={{ textAlign: "justify", fontWeight: "100" }}>
            
          </Text>
        </View>
        <View style={[{ paddingHorizontal: 10, marginBottom: 0 }]}>
          {data?.map((items, index) => (
            <Card style={{ marginVertical: 25 }} key={index}>
              {items.image && (
                <Card.Cover source={{ uri:items.image }} />
              )}
              <Card.Title title={items.title} titleStyle={{ textAlign: "center", fontWeight: "bold" }} />
            </Card>
          ))}
        </View>
      </View>
    );
  };

  const TeamSection = ({ data }) => {
    if (!data) {
      return null;
    }

    return (
      <View style={[Styles.p2, { backgroundColor: MD2Colors.white }]}>
        <View style={[Styles.m2]}>
          <Text variant='headlineSmall' style={[{ fontWeight: "bold", color: MD2Colors.green700, textAlign: "center" }]}>Our Team</Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text variant="bodyLarge" style={{ textAlign: "justify", fontWeight: "100" }}>
            
          </Text>
        </View>
        <View style={[{ paddingHorizontal: 10, marginBottom: 0 }]}>
          {data?.map((items, index) => (
            <Card style={{ marginVertical: 25 }} key={index}>
              {items.img && (
                <Card.Cover source={{ uri:items.img }} />
              )}
              <Card.Title title={items.name} titleStyle={{ textAlign: "center", fontWeight: "bold" }} />
            </Card>
          ))}
        </View>
      </View>
    );
  };


  return (
    <SafeAreaProvider>
      <CustomAlert visible={isLoading || isFetching} message="Loading..." />
      <SafeAreaView>
        {!isLoading || isFetching ? (
          <ImageBackground
            style={[Styles.mh100]}
            source={{ uri: articleInfo?.image }}
            resizeMode='cover'
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.5)']}
              style={[Styles.defaultGradient, { opacity: 0.45 }]}
            />
            <ScrollView>
              <View style={[{ paddingHorizontal: 10, top: 25, marginTop: 100, alignContent: "center" }]}>
                <Text variant='headlineLarge' style={{ color: MD2Colors.white }}>{articleInfo?.slogan}</Text>
                <Text variant='labelMedium' style={{ color: MD2Colors.white, top: 20 }}>
                  {articleInfo?.description}
                </Text>
              </View>
              <View style={{ alignItems: "center", borderTopRadius: 30, paddingTop: 150, alignItems: 'center' }}>
                <React.Fragment>
                  <View style={{ width: "100%" }}>
                    {articleSummary?.map((data, index) => (
                      <SummarySection data={data} key={index} />
                    ))}
                  </View>
                  <View style={{ width: "100%" }}>
                    <CoreSection data={articleCore} />
                  </View>
                  <View style={{ width: "100%" }}>
                    <TeamSection data={articleTeam} />
                  </View>
                </React.Fragment>
              </View>
            </ScrollView>
          </ImageBackground>
        ) : null}
      </SafeAreaView>
      <FAB
        icon="youtube"
        color="white"
        style={[styles.fabStyle, { backgroundColor: MD2Colors.red700 }]}
        onPress={() => Linking.openURL(articleInfo?.video_ads_link)}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArticlePage;
