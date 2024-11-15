import React from 'react';
import styled from 'styled-components';

// Styled components for CSS
const AboutContainer = styled.div`
    font-family: 'Arial', sans-serif;
    margin: 20px;
    padding: 20px;
    background-color: #f4f6f9;
    border-radius: 8px;
    max-width: 900px;
    margin: 40px auto;
`;

const Title = styled.h1`
    text-align: center;
    color: #2c3e50;
    font-size: 32px;
`;

const IntroText = styled.p`
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
    color: #7f8c8d;
`;

const Section = styled.section`
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    color: #3498db;
    font-size: 24px;
    margin-bottom: 10px;
`;

const SectionText = styled.p`
    font-size: 16px;
    line-height: 1.6;
    color: #2c3e50;
`;

const FeatureList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FeatureItem = styled.li`
    font-size: 16px;
    margin: 10px 0;
`;

const FeatureStrong = styled.strong`
    color: #2980b9;
`;

const ContactText = styled.p`
    font-size: 16px;
    color: #2c3e50;
`;

const ContactStrong = styled.strong`
    color: #e74c3c;
`;

// React Component
function About() {
    return (
        <AboutContainer>
            <Title>About Us</Title>
            <IntroText>
                Welcome to our Attendance Management System! Our platform is designed to streamline
                attendance tracking, offering an easy-to-use interface for administrators, teachers, and students.
            </IntroText>
            
            <Section>
                <SectionTitle>Our Mission</SectionTitle>
                <SectionText>
                    Our mission is to provide educational institutions with a simple and efficient way to
                    manage student attendance. We aim to improve the accuracy of attendance records, ensure
                    timely reporting, and make attendance management hassle-free for everyone involved.
                </SectionText>
            </Section>
            
            <Section>
                <SectionTitle>Key Features</SectionTitle>
                <FeatureList>
                    <FeatureItem><FeatureStrong>Real-time Attendance Tracking:</FeatureStrong> Administrators and teachers can track attendance in real-time.</FeatureItem>
                    <FeatureItem><FeatureStrong>Student Login:</FeatureStrong> Students can view their attendance records and request changes if necessary.</FeatureItem>
                    <FeatureItem><FeatureStrong>Automatic Reports:</FeatureStrong> Generate attendance reports at the click of a button.</FeatureItem>
                    <FeatureItem><FeatureStrong>Notifications:</FeatureStrong> Teachers and students receive reminders for pending attendance updates.</FeatureItem>
                </FeatureList>
            </Section>

            <Section>
                <SectionTitle>Our Team</SectionTitle>
                <SectionText>
                    Our team consists of experienced developers, educators, and tech experts who are committed to
                    improving the educational experience through technology.
                </SectionText>
            </Section>

            <Section>
                <SectionTitle>Contact Us</SectionTitle>
                <ContactText>If you have any questions or feedback, feel free to reach out to us!</ContactText>
                <ContactText><ContactStrong>Email:</ContactStrong> support@attendancesystem.com</ContactText>
                <ContactText><ContactStrong>Phone:</ContactStrong> +123-456-7890</ContactText>
            </Section>
        </AboutContainer>
    );
}

export default About;
