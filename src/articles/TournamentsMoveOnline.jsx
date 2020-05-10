import React from 'react';
import styled from 'styled-components';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import thumbnail from '../../public/article_images/tournaments-move-online.jpg';

const Container = styled.div`
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p{
        margin-bottom: 20px;
    }
`;

const Timestamp = styled.span`
    display: block;
    width: 200px;
    margin-left: auto;
    color: ${props => props.theme.grey};
`;

const ArticleImages = styled.img`
    max-width: ${props => props.width};
`; 

const Abstract = styled.p`
    font-weight: 500;
    text-align: center;
`;

export const abstract = 'With everything shutting down amidst the quarantine TOs are moving tournaments online. Mega Smash Mondays will be allowing players to "Jack In" for their next tournament experience!';
export const tags = ['mega', 'msm', 'online', 'covid', 'coronavirus', 'corona', 'virus'];

const TournamentsMoveOnline = () => {
    return <Container>
        <h2>COVID-19 Sends Competition Online</h2>
        <ArticleImages src = {thumbnail} width = {'600px'}/>
        <Timestamp>April 16th, 2020</Timestamp>
        <Abstract>{abstract}</Abstract>
        <TwitterTweetEmbed tweetId={'1250885304770125824'}/>
        <p>
            Mega Smash Mondays will be hosting tournaments via Smash.gg on Mondays as resources are available.
            If you want to get in on the smashing be sure to check out 2GG's <a href = 'https://twitter.com/2GGaming'>Twitter</a> for news and updates.
        </p>
        <p>
            Unfortunately this is not the case for all the tournament series in SoCal. 
            Many of which have announced a hiatus until things get back to normal.
            Smash.gg has even began planning a fundraiser to help support these tournament
            organizers who've already invested in tournament that won't be happening.
        </p>
        <TwitterTweetEmbed tweetId={'1238621005687296000'}/>
        <TwitterTweetEmbed tweetId={'1238641491339141121'}/>    
        <p>
            We're living in a new reality in which the future of competitive Smash and other fighting game communities are uncertain.
            Here's to hoping that everyone remains healthy and safe and when in-person tournaments start again I hope everyone took advantage of this time to get in the lab 💪.  
        </p>    
    </Container>
}

export default TournamentsMoveOnline;