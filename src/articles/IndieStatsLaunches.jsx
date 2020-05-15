import React from 'react';
import styled from 'styled-components';
import thumbnail from '../../public/article_images/indie-stats-launches.jpg';
import brackets from '../../public/article_images/brackets-supported.png';

const Container = styled.div``;

const ArticleImages = styled.img`
    max-width: ${props => props.width};
`; 

const Timestamp = styled.span`
    display: block;
    width: 200px;
    margin-left: auto;
    color: ${props => props.theme.grey};
`;

const Abstract = styled.p`
    font-weight: 500;
    text-align: center;
`;

export const abstract = 'Indie Stats, the first application to make stats and analytics publically available for all players competing in the SoCal region!';
export const tags = ['indie', 'stats', 'indiestats', 'launch', 'challonge', 'smash.gg'];

const IndieStatsLaunches = () =>{
    return <Container>
        <h2>SoCal Esports is Taking Off</h2>
        <ArticleImages src = {thumbnail} width = {'600px'}/>
        <Timestamp>May 9th, 2020</Timestamp>
        <Abstract>{abstract}</Abstract>
        <p>
            With the conclusion of the Spring 2020 season indiestats.gg has launched its new web application that helps
            everyday players track their progress as they attend sanctioned tournament series in the SoCal region.
            This has been a project 4 years in the making that started when one guy got tired of scouring through piles of 
            challonge and smash.gg brackets just to stay current on up-and-coming talent.
        </p>
        <ArticleImages src = {brackets} width = {'500px'}/>
        <p>
            This application works by pulling data from bracket hosts and centralizing that data in another database. That database
            is then used to run analytics for this application's contents. Currently there are data integrations for both <a href='https://smash.gg/'>smash.gg</a> and <a href='https://challonge.com/'>challonge</a>.
        </p>
        <p>
            Data related to top players has always been available, but that was hardly ever the case for the remaining
            players who make up the majority of the community. It is indiestats.gg's goal to bridge that gap as a more
            informed community is a thriving community.
        </p>
    </Container>
}

export default IndieStatsLaunches;