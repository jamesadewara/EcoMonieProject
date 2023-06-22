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


// import * as React from "react";
// import { Text, StyleSheet, View } from "react-native";
// import { Image } from "expo-image";
// import { FontFamily, FontSize, Padding, Color, Border } from "../GlobalStyles";

// const LandingPage = () => {
//   return (
//     <View style={styles.landingPage}>
//       <View style={[styles.home, styles.homePosition]}>
//         <View style={styles.heroSection}>
//           <View style={styles.textParent}>
//             <View style={styles.text}>
//               <Text
//                 style={[
//                   styles.lessonsAndInsightsContainer,
//                   styles.letNextcentDoTypo,
//                 ]}
//               >
//                 <Text
//                   style={styles.lessonsAndInsights}
//                 >{`Lessons and insights `}</Text>
//                 <Text style={styles.from8Years}>from 8 years</Text>
//               </Text>
//               <Text style={[styles.whereToGrow, styles.labelLayout]}>
//                 Where to grow your business as a photographer: site or social
//                 media?
//               </Text>
//             </View>
//             <View style={[styles.button, styles.buttonFlexBox]}>
//               <Text style={[styles.label, styles.labelTypo1]}>Register</Text>
//             </View>
//           </View>
//           <Image
//             style={styles.illustrationIcon}
//             contentFit="cover"
//             source={require("../assets/illustration.png")}
//           />
//         </View>
//         <View style={[styles.clients, styles.clientsSpaceBlock]}>
//           <View style={styles.clients1}>
//             <Text style={[styles.sectionTitle, styles.sectionTypo]}>
//               Our Clients
//             </Text>
//             <Text style={[styles.description, styles.labelLayout]}>
//               We have been working with some Fortune 500+ clients
//             </Text>
//           </View>
//           <View style={[styles.clientsLogos, styles.unlock1FlexBox]}>
//             <Image
//               style={styles.logoIcon}
//               contentFit="cover"
//               source={require("../assets/logo.png")}
//             />
//             <Image
//               style={styles.logoIcon}
//               contentFit="cover"
//               source={require("../assets/logo1.png")}
//             />
//             <Image
//               style={styles.logoIcon2}
//               contentFit="cover"
//               source={require("../assets/logo2.png")}
//             />
//             <Image
//               style={styles.logoIcon}
//               contentFit="cover"
//               source={require("../assets/logo3.png")}
//             />
//             <Image
//               style={styles.logoIcon}
//               contentFit="cover"
//               source={require("../assets/logo4.png")}
//             />
//             <Image
//               style={styles.logoIcon5}
//               contentFit="cover"
//               source={require("../assets/logo5.png")}
//             />
//             <Image
//               style={styles.logoIcon2}
//               contentFit="cover"
//               source={require("../assets/logo2.png")}
//             />
//           </View>
//         </View>
//         <View style={styles.community}>
//           <View style={styles.community1}>
//             <Text style={[styles.sectionTitle1, styles.sectionTypo]}>
//               Manage your entire community in a single system
//             </Text>
//             <Text style={[styles.description, styles.labelLayout]}>
//               Who is Nextcent suitable for?
//             </Text>
//           </View>
//           <View
//             style={[styles.membershipOrganizatiosParent, styles.unlock1FlexBox]}
//           >
//             <View style={styles.nationalShadowBox}>
//               <View style={styles.member}>
//                 <View style={styles.icon}>
//                   <View style={styles.iconChild} />
//                   <Image
//                     style={[styles.icon1, styles.icon1Position]}
//                     contentFit="cover"
//                     source={require("../assets/icon.png")}
//                   />
//                 </View>
//                 <Text
//                   style={[styles.membershipOrganisations, styles.numberTypo]}
//                 >
//                   Membership Organisations
//                 </Text>
//               </View>
//               <View style={styles.ourMembershipManagementSoftWrapper}>
//                 <Text
//                   style={[styles.ourMembershipManagement, styles.ourLayout]}
//                 >
//                   Our membership management software provides full automation of
//                   membership renewals and payments
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.nationalShadowBox}>
//               <View style={styles.member}>
//                 <Image
//                   style={styles.icon}
//                   contentFit="cover"
//                   source={require("../assets/icon1.png")}
//                 />
//                 <Text
//                   style={[styles.membershipOrganisations, styles.numberTypo]}
//                 >
//                   National Associations
//                 </Text>
//               </View>
//               <View style={styles.ourMembershipManagementSoftWrapper}>
//                 <Text
//                   style={[styles.ourMembershipManagement1, styles.ourLayout]}
//                 >
//                   Our membership management software provides full automation of
//                   membership renewals and payments
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.nationalShadowBox}>
//               <View style={styles.member}>
//                 <Image
//                   style={styles.icon}
//                   contentFit="cover"
//                   source={require("../assets/icon2.png")}
//                 />
//                 <Text style={[styles.clubsAndGroups, styles.numberTypo]}>
//                   Clubs And Groups
//                 </Text>
//               </View>
//               <View style={styles.ourMembershipManagementSoftWrapper}>
//                 <Text
//                   style={[styles.ourMembershipManagement, styles.ourLayout]}
//                 >
//                   Our membership management software provides full automation of
//                   membership renewals and payments
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={styles.body}>
//         <View style={styles.unlock}>
//           <View style={[styles.unlock1, styles.unlock1FlexBox]}>
//             <Image
//               style={styles.unlockChild}
//               contentFit="cover"
//               source={require("../assets/frame-35.png")}
//             />
//             <View style={styles.frameParent}>
//               <View style={styles.theUnseenOfSpendingThreeYParent}>
//                 <Text style={[styles.theUnseenOf, styles.sectionTypo]}>
//                   The unseen of spending three years at Pixelgrade
//                 </Text>
//                 <Text style={[styles.whenJoiningThe, styles.ourLayout]}>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//                   sit amet justo ipsum. Sed accumsan quam vitae est varius
//                   fringilla. Pellentesque placerat vestibulum lorem sed porta.
//                   Nullam mattis tristique iaculis. Nullam pulvinar sit amet
//                   risus pretium auctor. Etiam quis massa pulvinar, aliquam quam
//                   vitae, tempus sem. Donec elementum pulvinar odio.
//                 </Text>
//               </View>
//               <View style={[styles.button, styles.buttonFlexBox]}>
//                 <Text style={[styles.label, styles.labelTypo1]}>
//                   Learn More
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.achievements, styles.footerBig4SpaceBlock]}>
//           <View style={styles.sectionHeading}>
//             <View style={styles.sectionHeading1}>
//               <Text style={[styles.sectionTitle2, styles.sectionTypo]}>
//                 <Text
//                   style={styles.lessonsAndInsights}
//                 >{`Helping a local `}</Text>
//                 <Text style={styles.from8Years}>business reinvent itself</Text>
//               </Text>
//             </View>
//             <Text style={[styles.description2, styles.labelTypo]}>
//               We reached here with our hard work and dedication
//             </Text>
//           </View>
//           <View style={styles.counts}>
//             <View style={styles.row1}>
//               <View style={styles.view}>
//                 <Image
//                   style={styles.icon4}
//                   contentFit="cover"
//                   source={require("../assets/icon3.png")}
//                 />
//                 <View style={styles.details}>
//                   <Text style={[styles.number, styles.numberLayout]}>
//                     2,245,341
//                   </Text>
//                   <Text style={[styles.label2, styles.numberLayout]}>
//                     Members
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.view1}>
//                 <Image
//                   style={styles.icon5}
//                   contentFit="cover"
//                   source={require("../assets/icon4.png")}
//                 />
//                 <View style={styles.details}>
//                   <Text style={[styles.number, styles.numberLayout]}>
//                     46,328
//                   </Text>
//                   <Text style={[styles.label2, styles.numberLayout]}>
//                     Clubs
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.row2}>
//               <View style={styles.view}>
//                 <Image
//                   style={styles.icon4}
//                   contentFit="cover"
//                   source={require("../assets/icon5.png")}
//                 />
//                 <View style={styles.details}>
//                   <Text style={[styles.number, styles.numberLayout]}>
//                     828,867
//                   </Text>
//                   <Text style={[styles.label2, styles.numberLayout]}>
//                     Event Bookings
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.view1}>
//                 <Image
//                   style={styles.icon4}
//                   contentFit="cover"
//                   source={require("../assets/icon6.png")}
//                 />
//                 <View style={styles.details}>
//                   <Text style={[styles.number, styles.numberLayout]}>
//                     1,926,436
//                   </Text>
//                   <Text style={[styles.label2, styles.numberLayout]}>
//                     Payments
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={styles.calender}>
//           <View style={[styles.unlock1, styles.unlock1FlexBox]}>
//             <View style={styles.unlockChild}>
//               <Image
//                 style={[
//                   styles.backgroundCompleteIcon,
//                   styles.backgroundIconLayout,
//                 ]}
//                 contentFit="cover"
//                 source={require("../assets/backgroundcomplete.png")}
//               />
//               <Image
//                 style={[
//                   styles.backgroundSimpleIcon,
//                   styles.backgroundIconLayout,
//                 ]}
//                 contentFit="cover"
//                 source={require("../assets/backgroundsimple.png")}
//               />
//               <Image
//                 style={styles.floorIcon}
//                 contentFit="cover"
//                 source={require("../assets/floor.png")}
//               />
//               <Image
//                 style={[styles.plantIcon, styles.iconLayout]}
//                 contentFit="cover"
//                 source={require("../assets/plant.png")}
//               />
//               <Image
//                 style={[styles.padlockIcon, styles.iconLayout]}
//                 contentFit="cover"
//                 source={require("../assets/padlock.png")}
//               />
//               <View style={styles.device}>
//                 <Image
//                   style={styles.vectorIcon}
//                   contentFit="cover"
//                   source={require("../assets/vector.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon1, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector1.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon2, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector2.png")}
//                 />
//                 <Text style={styles.singUp}>SING UP</Text>
//                 <Image
//                   style={styles.vectorIconPosition6}
//                   contentFit="cover"
//                   source={require("../assets/vector3.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon4, styles.vectorIconPosition6]}
//                   contentFit="cover"
//                   source={require("../assets/vector4.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon5, styles.vectorIconLayout2]}
//                   contentFit="cover"
//                   source={require("../assets/vector5.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition5}
//                   contentFit="cover"
//                   source={require("../assets/vector6.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon7, styles.vectorIconPosition5]}
//                   contentFit="cover"
//                   source={require("../assets/vector7.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition4}
//                   contentFit="cover"
//                   source={require("../assets/vector8.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon9, styles.vectorIconPosition4]}
//                   contentFit="cover"
//                   source={require("../assets/vector9.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon10, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector10.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition3}
//                   contentFit="cover"
//                   source={require("../assets/vector11.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon12, styles.vectorIconPosition3]}
//                   contentFit="cover"
//                   source={require("../assets/vector12.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon13, styles.vectorIconLayout2]}
//                   contentFit="cover"
//                   source={require("../assets/vector13.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition2}
//                   contentFit="cover"
//                   source={require("../assets/vector14.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon15, styles.vectorIconPosition2]}
//                   contentFit="cover"
//                   source={require("../assets/vector15.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon16, styles.iconPosition1]}
//                   contentFit="cover"
//                   source={require("../assets/vector16.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon17, styles.vectorIconLayout1]}
//                   contentFit="cover"
//                   source={require("../assets/vector17.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon18, styles.vectorIconLayout1]}
//                   contentFit="cover"
//                   source={require("../assets/vector18.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon19, styles.vectorIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector19.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon20, styles.vectorIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector20.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon21, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector21.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon22, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector22.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon23, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/vector23.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon24, styles.iconPosition]}
//                   contentFit="cover"
//                   source={require("../assets/vector24.png")}
//                 />
//                 <Image
//                   style={[styles.groupIcon, styles.iconPosition]}
//                   contentFit="cover"
//                   source={require("../assets/group.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition1}
//                   contentFit="cover"
//                   source={require("../assets/vector25.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon26, styles.vectorIconPosition1]}
//                   contentFit="cover"
//                   source={require("../assets/vector26.png")}
//                 />
//                 <Image
//                   style={styles.vectorIconPosition}
//                   contentFit="cover"
//                   source={require("../assets/vector27.png")}
//                 />
//                 <Image
//                   style={[styles.vectorIcon28, styles.vectorIconPosition]}
//                   contentFit="cover"
//                   source={require("../assets/vector28.png")}
//                 />
//               </View>
//               <Image
//                 style={[styles.speechBubbleIcon, styles.iconLayout]}
//                 contentFit="cover"
//                 source={require("../assets/speechbubble.png")}
//               />
//               <Image
//                 style={[styles.characterIcon, styles.iconLayout]}
//                 contentFit="cover"
//                 source={require("../assets/character.png")}
//               />
//             </View>
//             <View style={styles.frameParent}>
//               <View style={styles.theUnseenOfSpendingThreeYParent}>
//                 <Text style={[styles.theUnseenOf, styles.sectionTypo]}>
//                   How to design your site footer like we did
//                 </Text>
//                 <Text style={[styles.whenJoiningThe, styles.ourLayout]}>
//                   Donec a eros justo. Fusce egestas tristique ultrices. Nam
//                   tempor, augue nec tincidunt molestie, massa nunc varius arcu,
//                   at scelerisque elit erat a magna. Donec quis erat at libero
//                   ultrices mollis. In hac habitasse platea dictumst. Vivamus
//                   vehicula leo dui, at porta nisi facilisis finibus. In euismod
//                   augue vitae nisi ultricies, non aliquet urna tincidunt.
//                   Integer in nisi eget nulla commodo faucibus efficitur quis
//                   massa. Praesent felis est, finibus et nisi ac, hendrerit
//                   venenatis libero. Donec consectetur faucibus ipsum id gravida.
//                 </Text>
//               </View>
//               <View style={[styles.button, styles.buttonFlexBox]}>
//                 <Text style={[styles.label, styles.labelTypo1]}>
//                   Learn More
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.customers, styles.customersSpaceBlock]}>
//           <Image
//             style={styles.image9Icon}
//             contentFit="cover"
//             source={require("../assets/image-9.png")}
//           />
//           <View style={styles.contentParent}>
//             <View style={styles.text}>
//               <Text style={[styles.weHaveEnjoyed, styles.labelTypo1]}>
//                 Maecenas dignissim justo eget nulla rutrum molestie. Maecenas
//                 lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin
//                 eu enim metus. Vivamus sed libero ornare, tristique quam in,
//                 gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi
//                 laoreet elit at ligula molestie, nec molestie mi blandit.
//                 Suspendisse cursus tellus sed augue ultrices, quis tristique
//                 nulla sodales. Suspendisse eget lorem eu turpis vestibulum
//                 pretium. Suspendisse potenti. Quisque malesuada enim sapien,
//                 vitae placerat ante feugiat eget. Quisque vulputate odio neque,
//                 eget efficitur libero condimentum id. Curabitur id nibh id sem
//                 dignissim finibus ac sit amet magna.
//               </Text>
//               <View style={styles.timSmithParent}>
//                 <Text style={[styles.timSmith, styles.companyTypo]}>
//                   Tim Smith
//                 </Text>
//                 <Text style={[styles.britishDragonBoat, styles.labelLayout]}>
//                   British Dragon Boat Racing Association
//                 </Text>
//               </View>
//             </View>
//             <View style={[styles.frameContainer, styles.buttonFlexBox]}>
//               <View style={styles.view}>
//                 <Image
//                   style={styles.logoIcon}
//                   contentFit="cover"
//                   source={require("../assets/logo6.png")}
//                 />
//                 <Image
//                   style={[styles.logoIcon8, styles.logoIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/logo7.png")}
//                 />
//                 <Image
//                   style={[styles.logoIcon9, styles.logoIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/logo8.png")}
//                 />
//                 <Image
//                   style={[styles.logoIcon8, styles.logoIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/logo9.png")}
//                 />
//                 <Image
//                   style={[styles.logoIcon8, styles.logoIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/logo10.png")}
//                 />
//                 <Image
//                   style={[styles.logoIcon12, styles.logoIconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/logo11.png")}
//                 />
//               </View>
//               <View
//                 style={[styles.meetAllCustomersParent, styles.parentFlexBox]}
//               >
//                 <Text style={[styles.meetAllCustomers, styles.companyTypo]}>
//                   Meet all customers
//                 </Text>
//                 <Image
//                   style={styles.arrowsDirectionsright}
//                   contentFit="cover"
//                   source={require("../assets/24arrows--directionsright.png")}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={styles.communityUpdates}>
//           <View style={styles.clients1}>
//             <Text style={[styles.sectionTitle, styles.sectionTypo]}>
//               Caring is the new marketing
//             </Text>
//             <Text style={[styles.description3, styles.labelLayout]}>
//               The Nexcent blog is the best place to read about the latest
//               membership insights, trends and more. See who's joining the
//               community, read about how our community are increasing their
//               membership income and lot's more.​
//             </Text>
//           </View>
//           <View
//             style={[styles.membershipOrganizatiosParent, styles.unlock1FlexBox]}
//           >
//             <View style={styles.view4}>
//               <Image
//                 style={styles.image18Icon}
//                 contentFit="cover"
//                 source={require("../assets/image-18.png")}
//               />
//               <View style={styles.contentShadowBox}>
//                 <Text
//                   style={[
//                     styles.creatingStreamlinedSafeguard,
//                     styles.companyTypo,
//                   ]}
//                 >
//                   Creating Streamlined Safeguarding Processes with OneRen
//                 </Text>
//                 <View style={[styles.readmoreParent, styles.parentFlexBox]}>
//                   <Text style={[styles.readmore, styles.companyTypo]}>
//                     Readmore
//                   </Text>
//                   <Image
//                     style={styles.arrowsDirectionsright}
//                     contentFit="cover"
//                     source={require("../assets/24arrows--directionsright1.png")}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={styles.view4}>
//               <Image
//                 style={styles.image18Icon}
//                 contentFit="cover"
//                 source={require("../assets/image-19.png")}
//               />
//               <View style={styles.contentShadowBox}>
//                 <Text
//                   style={[
//                     styles.creatingStreamlinedSafeguard,
//                     styles.companyTypo,
//                   ]}
//                 >
//                   What are your safeguarding responsibilities and how can you
//                   manage them?
//                 </Text>
//                 <View style={[styles.readmoreParent, styles.parentFlexBox]}>
//                   <Text style={[styles.readmore, styles.companyTypo]}>
//                     Readmore
//                   </Text>
//                   <Image
//                     style={styles.arrowsDirectionsright}
//                     contentFit="cover"
//                     source={require("../assets/24arrows--directionsright1.png")}
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={styles.view4}>
//               <Image
//                 style={styles.image18Icon}
//                 contentFit="cover"
//                 source={require("../assets/image-20.png")}
//               />
//               <View style={styles.contentShadowBox}>
//                 <Text
//                   style={[
//                     styles.creatingStreamlinedSafeguard,
//                     styles.companyTypo,
//                   ]}
//                 >
//                   Revamping the Membership Model with Triathlon Australia
//                 </Text>
//                 <View style={[styles.readmoreParent, styles.parentFlexBox]}>
//                   <Text style={[styles.readmore, styles.companyTypo]}>
//                     Readmore
//                   </Text>
//                   <Image
//                     style={styles.arrowsDirectionsright}
//                     contentFit="cover"
//                     source={require("../assets/24arrows--directionsright1.png")}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={styles.dot}>
//         <Image
//           style={styles.dotLayout}
//           contentFit="cover"
//           source={require("../assets/ellipse-5.png")}
//         />
//         <Image
//           style={[styles.dotItem, styles.dotLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-6.png")}
//         />
//         <Image
//           style={[styles.dotItem, styles.dotLayout]}
//           contentFit="cover"
//           source={require("../assets/ellipse-6.png")}
//         />
//       </View>
//       <View style={[styles.footer, styles.homePosition]}>
//         <View
//           style={[
//             styles.letNextcentDoTheWorkSoYoParent,
//             styles.customersSpaceBlock,
//           ]}
//         >
//           <Text style={[styles.letNextcentDo, styles.letNextcentDoTypo]}>
//             Pellentesque suscipit fringilla libero eu.
//           </Text>
//           <View style={[styles.button, styles.buttonFlexBox]}>
//             <Text style={[styles.label, styles.labelTypo1]}>Get a Demo</Text>
//             <Image
//               style={styles.arrowsDirectionsright4}
//               contentFit="cover"
//               source={require("../assets/16arrows--directionsright.png")}
//             />
//           </View>
//         </View>
//         <View style={[styles.footerBig4, styles.footerBig4SpaceBlock]}>
//           <View style={styles.sectionHeading1}>
//             <View style={styles.view}>
//               <Image
//                 style={styles.icon8}
//                 contentFit="cover"
//                 source={require("../assets/icon7.png")}
//               />
//               <Image
//                 style={styles.nexcentIcon}
//                 contentFit="cover"
//                 source={require("../assets/nexcent.png")}
//               />
//             </View>
//             <View style={styles.copyright}>
//               <Text style={styles.copyright2020Typo}>
//                 Copyright © 2020 Nexcent ltd.
//               </Text>
//               <Text
//                 style={[styles.allRightsReserved, styles.copyright2020Typo]}
//               >
//                 All rights reserved
//               </Text>
//             </View>
//             <View style={styles.socialLinks}>
//               <Image
//                 style={styles.socialLayout}
//                 contentFit="cover"
//                 source={require("../assets/social-icons.png")}
//               />
//               <Image
//                 style={[styles.socialIcons1, styles.socialLayout]}
//                 contentFit="cover"
//                 source={require("../assets/social-icons1.png")}
//               />
//               <Image
//                 style={[styles.socialIcons1, styles.socialLayout]}
//                 contentFit="cover"
//                 source={require("../assets/social-icons2.png")}
//               />
//               <Image
//                 style={[styles.socialIcons1, styles.socialLayout]}
//                 contentFit="cover"
//                 source={require("../assets/social-icons3.png")}
//               />
//             </View>
//           </View>
//           <View style={styles.links}>
//             <View style={styles.sectionHeading1}>
//               <Text style={[styles.company, styles.blogLayout]}>Company</Text>
//               <View style={styles.listItems}>
//                 <Text style={[styles.aboutUs, styles.blogLayout]}>
//                   About us
//                 </Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>Blog</Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>Contact us</Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>Pricing</Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>
//                   Testimonials
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.col2}>
//               <Text style={[styles.company, styles.blogLayout]}>Support</Text>
//               <View style={styles.listItems}>
//                 <Text style={[styles.aboutUs, styles.blogLayout]}>
//                   Help center
//                 </Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>
//                   Terms of service
//                 </Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>Legal</Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>
//                   Privacy policy
//                 </Text>
//                 <Text style={[styles.blog, styles.blogLayout]}>Status</Text>
//               </View>
//             </View>
//             <View style={styles.col2}>
//               <Text style={[styles.company, styles.blogLayout]}>
//                 Stay up to date
//               </Text>
//               <View style={styles.emailInputField}>
//                 <View
//                   style={[styles.inputFieldBg, styles.headingNamePosition]}
//                 />
//                 <Image
//                   style={[styles.essentialIconsSend, styles.iconLayout]}
//                   contentFit="cover"
//                   source={require("../assets/essential-icons--send.png")}
//                 />
//                 <Text style={[styles.yourEmailAddress, styles.ourLayout]}>
//                   Your email address
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={[styles.groupParent, styles.icon1Position]}>
//         <View style={[styles.headingNameWrapper, styles.logo1Position]}>
//           <View style={[styles.headingName, styles.headingNamePosition]}>
//             <View style={styles.view}>
//               <Text style={[styles.label8, styles.labelTypo]}>Home</Text>
//             </View>
//             <View style={styles.menuItemDefault}>
//               <Text style={[styles.label9, styles.labelTypo]}>Service</Text>
//             </View>
//             <View style={styles.menuItemDefault}>
//               <Text style={[styles.label9, styles.labelTypo]}>Feature</Text>
//             </View>
//             <View style={styles.menuItemDefault}>
//               <Text style={[styles.label9, styles.labelTypo]}>Product</Text>
//             </View>
//             <View style={styles.menuItemDefault}>
//               <Text style={[styles.label9, styles.labelTypo]}>Testimonial</Text>
//             </View>
//             <View style={styles.menuItemDefault}>
//               <Text style={[styles.label9, styles.labelTypo]}>FAQ</Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.logo1, styles.logo1Position]}>
//           <Image
//             style={styles.icon9}
//             contentFit="cover"
//             source={require("../assets/icon8.png")}
//           />
//           <Image
//             style={styles.nexcentIcon1}
//             contentFit="cover"
//             source={require("../assets/nexcent1.png")}
//           />
//         </View>
//         <View style={styles.login}>
//           <View style={[styles.button4, styles.buttonSpaceBlock]}>
//             <Text style={[styles.login1, styles.ourLayout]}>Login</Text>
//           </View>
//           <View style={[styles.button5, styles.buttonSpaceBlock]}>
//             <Text style={[styles.signUp, styles.ourLayout]}>Sign up</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   homePosition: {
//     left: 0,
//     position: "absolute",
//   },
//   letNextcentDoTypo: {
//     fontFamily: FontFamily.headingHeadline4,
//     fontWeight: "600",
//     lineHeight: 76,
//     fontSize: FontSize.headingHeadline1_size,
//   },
//   labelLayout: {
//     lineHeight: 24,
//     fontSize: FontSize.bodyRegularBody2_size,
//   },
//   buttonFlexBox: {
//     marginTop: 32,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   labelTypo1: {
//     fontFamily: FontFamily.labelMediumLabel,
//     fontWeight: "500",
//   },
//   clientsSpaceBlock: {
//     paddingVertical: 0,
//     width: 1440,
//     paddingHorizontal: Padding.p_125xl,
//   },
//   sectionTypo: {
//     lineHeight: 44,
//     fontSize: FontSize.headingHeadline2_size,
//     fontFamily: FontFamily.headingHeadline4,
//     fontWeight: "600",
//   },
//   unlock1FlexBox: {
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   icon1Position: {
//     top: 0,
//     left: 0,
//     position: "absolute",
//   },
//   numberTypo: {
//     fontFamily: FontFamily.headingHeadline3,
//     fontWeight: "700",
//     lineHeight: 36,
//     fontSize: FontSize.headingHeadline3_size,
//     color: Color.neutralDGrey,
//   },
//   ourLayout: {
//     lineHeight: 20,
//     fontSize: FontSize.labelMediumLabel_size,
//   },
//   footerBig4SpaceBlock: {
//     paddingVertical: Padding.p_45xl,
//     flexDirection: "row",
//   },
//   labelTypo: {
//     color: Color.textGray900,
//     lineHeight: 24,
//     fontSize: FontSize.bodyRegularBody2_size,
//     textAlign: "left",
//   },
//   numberLayout: {
//     width: 191,
//     textAlign: "left",
//   },
//   backgroundIconLayout: {
//     opacity: 0,
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   iconLayout: {
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition6: {
//     left: "15.98%",
//     bottom: "74.34%",
//     right: "67%",
//     top: "24.21%",
//     width: "17.02%",
//     height: "1.45%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconLayout2: {
//     width: "68.27%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition5: {
//     left: "21.1%",
//     bottom: "69.34%",
//     right: "47.8%",
//     top: "29.34%",
//     width: "31.1%",
//     height: "1.32%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition4: {
//     left: "15.86%",
//     bottom: "61.44%",
//     right: "67.12%",
//     top: "37.12%",
//     width: "17.02%",
//     height: "1.45%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition3: {
//     left: "15.73%",
//     bottom: "47.97%",
//     right: "67.25%",
//     top: "50.58%",
//     width: "17.02%",
//     height: "1.45%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition2: {
//     left: "20.42%",
//     bottom: "56.06%",
//     right: "48.46%",
//     top: "42.55%",
//     width: "31.12%",
//     height: "1.39%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   iconPosition1: {
//     left: "20.53%",
//     top: "56.18%",
//   },
//   vectorIconLayout1: {
//     top: "56.2%",
//     width: "2.72%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconLayout: {
//     bottom: "42.55%",
//     width: "2.72%",
//     height: "1.23%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   iconPosition: {
//     right: "43.04%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition1: {
//     left: "45.69%",
//     bottom: "84.24%",
//     right: "45.55%",
//     top: "11.43%",
//     width: "8.76%",
//     height: "4.33%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIconPosition: {
//     left: "33.98%",
//     bottom: "81.37%",
//     right: "34.8%",
//     top: "16.87%",
//     width: "31.22%",
//     height: "1.75%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   customersSpaceBlock: {
//     paddingVertical: Padding.p_13xl,
//     width: 1440,
//     alignItems: "center",
//     backgroundColor: Color.neutralSilver,
//   },
//   companyTypo: {
//     lineHeight: 28,
//     fontSize: FontSize.headingHeadline4_size,
//     fontFamily: FontFamily.headingHeadline4,
//     fontWeight: "600",
//   },
//   logoIconLayout: {
//     marginLeft: 41,
//     height: 48,
//     borderRadius: Border.br_5xs,
//   },
//   parentFlexBox: {
//     padding: Padding.p_5xs,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   dotLayout: {
//     height: 10,
//     width: 10,
//   },
//   copyright2020Typo: {
//     width: 350,
//     color: Color.neutralSilver,
//     lineHeight: 20,
//     fontSize: FontSize.labelMediumLabel_size,
//     fontFamily: FontFamily.bodyRegularBody2,
//     textAlign: "left",
//   },
//   socialLayout: {
//     height: 32,
//     width: 32,
//   },
//   blogLayout: {
//     width: 160,
//     textAlign: "left",
//   },
//   headingNamePosition: {
//     right: "0%",
//     height: "100%",
//     left: "0%",
//     bottom: "0%",
//     top: "0%",
//     position: "absolute",
//     width: "100%",
//   },
//   logo1Position: {
//     bottom: "35.71%",
//     top: "35.71%",
//     height: "28.57%",
//     position: "absolute",
//   },
//   buttonSpaceBlock: {
//     paddingVertical: Padding.p_3xs,
//     paddingHorizontal: Padding.p_xl,
//     borderRadius: Border.br_7xs,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   lessonsAndInsights: {
//     color: Color.neutralDGrey,
//   },
//   from8Years: {
//     color: Color.brandPrimary,
//   },
//   lessonsAndInsightsContainer: {
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   whereToGrow: {
//     marginTop: 16,
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   text: {
//     alignSelf: "stretch",
//   },
//   label: {
//     textAlign: "center",
//     color: Color.defaultWhite,
//     lineHeight: 24,
//     fontSize: FontSize.bodyRegularBody2_size,
//   },
//   button: {
//     borderRadius: Border.br_9xs,
//     paddingVertical: Padding.p_sm,
//     justifyContent: "center",
//     paddingHorizontal: Padding.p_13xl,
//     marginTop: 32,
//     backgroundColor: Color.brandPrimary,
//   },
//   textParent: {
//     flex: 1,
//   },
//   illustrationIcon: {
//     width: 391,
//     height: 407,
//     marginLeft: 104,
//   },
//   heroSection: {
//     paddingVertical: 96,
//     alignItems: "center",
//     paddingHorizontal: Padding.p_125xl,
//     flexDirection: "row",
//     backgroundColor: Color.neutralSilver,
//     alignSelf: "stretch",
//   },
//   sectionTitle: {
//     textAlign: "center",
//     color: Color.neutralDGrey,
//     alignSelf: "stretch",
//   },
//   description: {
//     marginTop: 8,
//     textAlign: "center",
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//     alignSelf: "stretch",
//   },
//   clients1: {
//     width: 1110,
//     alignItems: "center",
//   },
//   logoIcon: {
//     height: 48,
//     width: 48,
//     borderRadius: Border.br_5xs,
//   },
//   logoIcon2: {
//     width: 55,
//     height: 48,
//     borderRadius: Border.br_5xs,
//   },
//   logoIcon5: {
//     width: 52,
//     height: 48,
//     borderRadius: Border.br_5xs,
//   },
//   clientsLogos: {
//     height: 98,
//     marginTop: 16,
//     flexDirection: "row",
//     alignSelf: "stretch",
//   },
//   clients: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   sectionTitle1: {
//     width: 542,
//     textAlign: "center",
//     color: Color.neutralDGrey,
//   },
//   community1: {
//     width: 1440,
//     alignItems: "center",
//   },
//   iconChild: {
//     top: 56,
//     left: 65,
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: Border.br_8xs,
//     borderBottomRightRadius: 10,
//     borderBottomLeftRadius: Border.br_8xs,
//     backgroundColor: "#e8f5e9",
//     width: 50,
//     height: 49,
//     transform: [
//       {
//         rotate: "-180deg",
//       },
//     ],
//     position: "absolute",
//   },
//   icon1: {
//     height: 48,
//     width: 48,
//   },
//   icon: {
//     width: 65,
//     height: 56,
//   },
//   membershipOrganisations: {
//     textAlign: "center",
//     marginTop: 16,
//     alignSelf: "stretch",
//   },
//   member: {
//     width: 267,
//     alignItems: "center",
//   },
//   ourMembershipManagement: {
//     width: 251,
//     textAlign: "center",
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   ourMembershipManagementSoftWrapper: {
//     marginTop: 8,
//     flexDirection: "row",
//   },
//   nationalShadowBox: {
//     paddingVertical: Padding.p_5xl,
//     width: 299,
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowColor: "rgba(171, 190, 209, 0.2)",
//     borderRadius: Border.br_5xs,
//     paddingHorizontal: Padding.p_13xl,
//     alignItems: "center",
//     backgroundColor: Color.defaultWhite,
//   },
//   ourMembershipManagement1: {
//     width: 240,
//     textAlign: "center",
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   clubsAndGroups: {
//     width: 231,
//     textAlign: "center",
//     marginTop: 16,
//   },
//   membershipOrganizatiosParent: {
//     paddingVertical: 0,
//     width: 1440,
//     paddingHorizontal: Padding.p_125xl,
//     marginTop: 16,
//     flexDirection: "row",
//   },
//   community: {
//     marginTop: 40,
//   },
//   home: {
//     top: 84,
//   },
//   unlockChild: {
//     width: 442,
//     height: 433,
//   },
//   theUnseenOf: {
//     color: Color.neutralDGrey,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   whenJoiningThe: {
//     marginTop: 16,
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   theUnseenOfSpendingThreeYParent: {
//     width: 601,
//   },
//   frameParent: {
//     width: 661,
//   },
//   unlock1: {
//     paddingVertical: 0,
//     width: 1440,
//     paddingHorizontal: Padding.p_125xl,
//     flexDirection: "row",
//   },
//   unlock: {
//     flexDirection: "row",
//   },
//   sectionTitle2: {
//     width: 408,
//     textAlign: "left",
//   },
//   sectionHeading1: {
//     overflow: "hidden",
//   },
//   description2: {
//     marginTop: 8,
//     fontFamily: FontFamily.bodyRegularBody2,
//     alignSelf: "stretch",
//   },
//   sectionHeading: {
//     width: 540,
//     overflow: "hidden",
//   },
//   icon4: {
//     height: 48,
//     width: 48,
//     overflow: "hidden",
//   },
//   number: {
//     fontFamily: FontFamily.headingHeadline3,
//     fontWeight: "700",
//     lineHeight: 36,
//     fontSize: FontSize.headingHeadline3_size,
//     color: Color.neutralDGrey,
//   },
//   label2: {
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//     lineHeight: 24,
//     fontSize: FontSize.bodyRegularBody2_size,
//   },
//   details: {
//     marginLeft: 16,
//     overflow: "hidden",
//   },
//   view: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   icon5: {
//     height: 48,
//     width: 48,
//   },
//   view1: {
//     marginLeft: 30,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   row1: {
//     alignItems: "center",
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   row2: {
//     marginTop: 40,
//     alignItems: "center",
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   counts: {
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   achievements: {
//     marginTop: 48,
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: 1440,
//     paddingHorizontal: Padding.p_125xl,
//     backgroundColor: Color.neutralSilver,
//   },
//   backgroundCompleteIcon: {
//     height: "87.81%",
//     right: "-32.61%",
//     bottom: "12.19%",
//     left: "32.61%",
//     top: "0%",
//     opacity: 0,
//     width: "100%",
//   },
//   backgroundSimpleIcon: {
//     height: "68.86%",
//     width: "72.54%",
//     top: "20.23%",
//     right: "-16.05%",
//     bottom: "10.91%",
//     left: "43.51%",
//   },
//   floorIcon: {
//     height: "0.12%",
//     width: "72.6%",
//     top: "99.88%",
//     right: "14.76%",
//     left: "12.64%",
//     bottom: "0%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   plantIcon: {
//     height: "34.1%",
//     width: "19.45%",
//     top: "45.34%",
//     right: "15.46%",
//     bottom: "20.56%",
//     left: "65.1%",
//   },
//   padlockIcon: {
//     height: "23.76%",
//     width: "19.5%",
//     top: "1.11%",
//     right: "16.54%",
//     bottom: "75.13%",
//     left: "63.96%",
//   },
//   vectorIcon: {
//     height: "88.21%",
//     width: "95.52%",
//     right: "4.48%",
//     bottom: "11.79%",
//     left: "0%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     top: "0%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIcon1: {
//     height: "82.49%",
//     width: "86.72%",
//     top: "2.62%",
//     right: "8.89%",
//     bottom: "14.9%",
//     left: "4.4%",
//   },
//   vectorIcon2: {
//     height: "7.02%",
//     width: "50.91%",
//     top: "68.31%",
//     right: "26.78%",
//     bottom: "24.67%",
//     left: "22.31%",
//   },
//   singUp: {
//     height: "29.97%",
//     width: "63.48%",
//     top: "70.03%",
//     left: "36.52%",
//     fontSize: 8,
//     fontFamily: FontFamily.montserratRegular,
//     color: "#e8e8e3",
//     textAlign: "left",
//     position: "absolute",
//   },
//   vectorIcon4: {
//     opacity: 0.1,
//   },
//   vectorIcon5: {
//     height: "5.28%",
//     top: "27.65%",
//     right: "15.97%",
//     bottom: "67.07%",
//     left: "15.76%",
//   },
//   vectorIcon7: {
//     opacity: 0.2,
//   },
//   vectorIcon9: {
//     opacity: 0.1,
//   },
//   vectorIcon10: {
//     height: "5.27%",
//     width: "68.28%",
//     top: "40.59%",
//     right: "16.11%",
//     bottom: "54.15%",
//     left: "15.61%",
//   },
//   vectorIcon12: {
//     opacity: 0.1,
//   },
//   vectorIcon13: {
//     height: "5.29%",
//     top: "54.01%",
//     right: "16.19%",
//     bottom: "40.7%",
//     left: "15.53%",
//   },
//   vectorIcon15: {
//     opacity: 0.2,
//   },
//   vectorIcon16: {
//     right: "76.75%",
//     bottom: "42.58%",
//     width: "2.72%",
//     height: "1.23%",
//     maxHeight: "100%",
//     maxWidth: "100%",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   vectorIcon17: {
//     right: "72.54%",
//     bottom: "42.48%",
//     left: "24.74%",
//     height: "1.32%",
//   },
//   vectorIcon18: {
//     right: "68.32%",
//     bottom: "42.56%",
//     left: "28.96%",
//     height: "1.23%",
//   },
//   vectorIcon19: {
//     top: "56.21%",
//     right: "64.11%",
//     left: "33.17%",
//   },
//   vectorIcon20: {
//     top: "56.22%",
//     right: "59.9%",
//     left: "37.38%",
//   },
//   vectorIcon21: {
//     top: "56.23%",
//     right: "55.68%",
//     bottom: "42.54%",
//     left: "41.6%",
//     width: "2.72%",
//     height: "1.23%",
//   },
//   vectorIcon22: {
//     top: "56.24%",
//     right: "51.46%",
//     left: "45.81%",
//     bottom: "42.44%",
//     width: "2.72%",
//     height: "1.32%",
//   },
//   vectorIcon23: {
//     top: "56.25%",
//     right: "47.26%",
//     bottom: "42.52%",
//     left: "50.02%",
//     width: "2.72%",
//     height: "1.23%",
//   },
//   vectorIcon24: {
//     top: "56.26%",
//     bottom: "42.51%",
//     left: "54.23%",
//     width: "2.72%",
//     height: "1.23%",
//   },
//   groupIcon: {
//     height: "1.37%",
//     width: "36.43%",
//     bottom: "42.44%",
//     left: "20.53%",
//     top: "56.18%",
//     opacity: 0.2,
//   },
//   vectorIcon26: {
//     opacity: 0.1,
//   },
//   vectorIcon28: {
//     opacity: 0.2,
//   },
//   device: {
//     height: "79.58%",
//     width: "35.4%",
//     top: "11.66%",
//     right: "27.69%",
//     bottom: "8.76%",
//     left: "36.91%",
//     position: "absolute",
//   },
//   speechBubbleIcon: {
//     height: "13.96%",
//     width: "12.07%",
//     top: "32.11%",
//     right: "74.57%",
//     bottom: "53.93%",
//     left: "13.36%",
//   },
//   characterIcon: {
//     height: "66.39%",
//     width: "33.52%",
//     top: "33.52%",
//     right: "47.1%",
//     bottom: "0.09%",
//     left: "19.38%",
//   },
//   calender: {
//     marginTop: 48,
//     flexDirection: "row",
//   },
//   image9Icon: {
//     width: 358,
//     height: 358,
//     borderRadius: Border.br_5xs,
//   },
//   weHaveEnjoyed: {
//     color: Color.neutralGrey,
//     lineHeight: 24,
//     fontSize: FontSize.bodyRegularBody2_size,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   timSmith: {
//     color: Color.brandPrimary,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   britishDragonBoat: {
//     color: Color.neutralLGrey,
//     marginTop: 8,
//     fontFamily: FontFamily.bodyRegularBody2,
//     textAlign: "left",
//     alignSelf: "stretch",
//   },
//   timSmithParent: {
//     marginTop: 16,
//     alignSelf: "stretch",
//   },
//   logoIcon8: {
//     width: 48,
//   },
//   logoIcon9: {
//     width: 55,
//   },
//   logoIcon12: {
//     width: 52,
//   },
//   meetAllCustomers: {
//     display: "flex",
//     width: 188,
//     color: Color.brandPrimary,
//     textAlign: "left",
//     alignItems: "center",
//   },
//   arrowsDirectionsright: {
//     width: 24,
//     marginLeft: 8,
//     height: 24,
//   },
//   meetAllCustomersParent: {
//     marginLeft: 32,
//     flex: 1,
//   },
//   frameContainer: {
//     alignSelf: "stretch",
//   },
//   contentParent: {
//     marginLeft: 78,
//     flex: 1,
//   },
//   customers: {
//     marginTop: 48,
//     paddingHorizontal: Padding.p_125xl,
//     flexDirection: "row",
//   },
//   description3: {
//     width: 628,
//     marginTop: 8,
//     textAlign: "center",
//     color: Color.neutralGrey,
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   image18Icon: {
//     width: 368,
//     height: 286,
//     borderRadius: Border.br_5xs,
//   },
//   creatingStreamlinedSafeguard: {
//     width: 285,
//     textAlign: "center",
//     color: Color.neutralGrey,
//   },
//   readmore: {
//     color: Color.brandPrimary,
//     textAlign: "left",
//   },
//   readmoreParent: {
//     justifyContent: "center",
//     marginTop: 16,
//     alignSelf: "stretch",
//   },
//   contentShadowBox: {
//     marginTop: -96,
//     padding: Padding.p_base,
//     elevation: 16,
//     shadowRadius: 16,
//     shadowColor: "rgba(171, 190, 209, 0.4)",
//     shadowOpacity: 1,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     borderRadius: Border.br_5xs,
//     alignItems: "center",
//     backgroundColor: Color.neutralSilver,
//   },
//   view4: {
//     alignItems: "center",
//   },
//   communityUpdates: {
//     marginTop: 48,
//     alignItems: "center",
//   },
//   body: {
//     top: 1411,
//     left: 1,
//     justifyContent: "center",
//     position: "absolute",
//   },
//   dotItem: {
//     opacity: 0.3,
//     marginLeft: 8,
//   },
//   dot: {
//     marginLeft: -23,
//     top: 657,
//     left: "50%",
//     flexDirection: "row",
//     position: "absolute",
//   },
//   letNextcentDo: {
//     color: Color.neutralBlack,
//     width: 887,
//     textAlign: "center",
//   },
//   arrowsDirectionsright4: {
//     width: 16,
//     height: 16,
//     marginLeft: 8,
//   },
//   letNextcentDoTheWorkSoYoParent: {
//     paddingHorizontal: 0,
//   },
//   icon8: {
//     width: 43,
//     height: 30,
//   },
//   nexcentIcon: {
//     width: 138,
//     height: 26,
//     marginLeft: 9.89,
//   },
//   allRightsReserved: {
//     marginTop: 8,
//   },
//   copyright: {
//     marginTop: 40,
//     alignItems: "center",
//     overflow: "hidden",
//   },
//   socialIcons1: {
//     marginLeft: 16,
//   },
//   socialLinks: {
//     marginTop: 40,
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   company: {
//     lineHeight: 28,
//     fontSize: FontSize.headingHeadline4_size,
//     fontFamily: FontFamily.headingHeadline4,
//     fontWeight: "600",
//     color: Color.defaultWhite,
//   },
//   aboutUs: {
//     color: Color.neutralSilver,
//     width: 160,
//     lineHeight: 20,
//     fontSize: FontSize.labelMediumLabel_size,
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   blog: {
//     marginTop: 12,
//     color: Color.neutralSilver,
//     width: 160,
//     lineHeight: 20,
//     fontSize: FontSize.labelMediumLabel_size,
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   listItems: {
//     marginTop: 24,
//     overflow: "hidden",
//   },
//   col2: {
//     marginLeft: 30,
//     overflow: "hidden",
//   },
//   inputFieldBg: {
//     opacity: 0.2,
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.defaultWhite,
//     height: "100%",
//   },
//   essentialIconsSend: {
//     height: "45%",
//     width: "7.06%",
//     top: "27.5%",
//     right: "4.71%",
//     bottom: "27.5%",
//     left: "88.24%",
//   },
//   yourEmailAddress: {
//     top: "22.5%",
//     left: "4.71%",
//     color: Color.textGray300,
//     fontFamily: FontFamily.bodyRegularBody2,
//     textAlign: "left",
//     position: "absolute",
//   },
//   emailInputField: {
//     width: 255,
//     height: 40,
//     marginTop: 24,
//   },
//   links: {
//     marginLeft: 125,
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   footerBig4: {
//     backgroundColor: Color.neutralBlack,
//     paddingHorizontal: 165,
//   },
//   footer: {
//     top: 3748,
//   },
//   label8: {
//     fontFamily: FontFamily.labelMediumLabel,
//     fontWeight: "500",
//   },
//   label9: {
//     fontFamily: FontFamily.bodyRegularBody2,
//   },
//   menuItemDefault: {
//     marginLeft: 50,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   headingName: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   headingNameWrapper: {
//     width: "40.83%",
//     right: "29.62%",
//     left: "29.55%",
//   },
//   icon9: {
//     width: 35,
//     height: 24,
//   },
//   nexcentIcon1: {
//     width: 111,
//     height: 21,
//     marginLeft: 8,
//   },
//   logo1: {
//     width: "10.73%",
//     right: "81.98%",
//     left: "7.29%",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   login1: {
//     textAlign: "center",
//     fontFamily: FontFamily.labelMediumLabel,
//     fontWeight: "500",
//     color: Color.brandPrimary,
//   },
//   button4: {
//     backgroundColor: Color.neutralSilver,
//   },
//   signUp: {
//     textAlign: "center",
//     color: Color.defaultWhite,
//     fontFamily: FontFamily.labelMediumLabel,
//     fontWeight: "500",
//   },
//   button5: {
//     marginLeft: 14,
//     backgroundColor: Color.brandPrimary,
//     paddingVertical: Padding.p_3xs,
//     paddingHorizontal: Padding.p_xl,
//     borderRadius: Border.br_7xs,
//   },
//   login: {
//     height: "47.62%",
//     width: "12.64%",
//     top: "26.19%",
//     right: "8.33%",
//     bottom: "26.19%",
//     left: "79.03%",
//     flexDirection: "row",
//     position: "absolute",
//     overflow: "hidden",
//   },
//   groupParent: {
//     height: 84,
//     width: 1440,
//     backgroundColor: Color.neutralSilver,
//     overflow: "hidden",
//   },
//   landingPage: {
//     height: 4376,
//     overflow: "hidden",
//     width: "100%",
//     flex: 1,
//     backgroundColor: Color.defaultWhite,
//   },
// });

// export default LandingPage;
