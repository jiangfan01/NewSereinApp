import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Avatar.Image
                        source={require('../../../assets/images/noImage.png')}
                        size={80}
                    />
                    <Title style={styles.name}>Your Name</Title>
                    <Paragraph style={styles.bio}>A passionate developer with a love for mobile app
                        development.</Paragraph>
                </Card.Content>
                <Card.Actions style={styles.socialIcons}>
                    <Icon name="github" size={30} color="#000"/>
                    <Icon name="linkedin" size={30} color="#0077b5"/>
                </Card.Actions>
            </Card>

            <Card style={styles.skillsCard}>
                <Card.Content>
                    <Title style={styles.sectionTitle}>技术栈</Title>
                    <Paragraph style={styles.skills}>
                        - React Native{'\n'}
                        - JavaScript{'\n'}
                        - Vue{'\n'}
                        - Node.js and Express and Sequelize{'\n'}
                        - Git or Git Desktop{'\n'}
                    </Paragraph>
                </Card.Content>
            </Card>

            <Card style={styles.projectsCard}>
                <Card.Content>
                    <Title style={styles.sectionTitle}>Projects</Title>
                    <Paragraph style={styles.projects}>
                        1. My Awesome App - A mobile app that does amazing things.{'\n'}
                        2. Cool Website - A responsive and modern website.{'\n'}
                        3. Project XYZ - An exciting project with innovative features.{'\n'}
                    </Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        padding: 20,
        elevation: 3,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bio: {
        marginTop: 10,
        color: 'gray',
    },
    socialIcons: {
        marginTop: 20,
        justifyContent: 'center',
    },
    skillsCard: {
        width: '100%',
        padding: 20,
        elevation: 3,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    skills: {
        color: 'gray',
    },
    projectsCard: {
        width: '100%',
        padding: 20,
        elevation: 3,
    },
    projects: {
        color: 'gray',
    },
});
export default DetailsScreen;