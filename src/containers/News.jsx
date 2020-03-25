import React from 'react';
import styled from 'styled-components';
import NewsArticleListing from '../components/NewsArticleListing.jsx';
import NewsArticle from '../components/NewsArticle.jsx';


const articles = [
    {
        "thumbnail": "genesis5.jpg",
        "name": "A New God Is Born",
        "abstract": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.",
        "content": "ANewGodIsBorn.jsx"
    },
    {
      "thumbnail": "newloc.jpg",
      "name": "Mega Smash Monday's Big Move",
      "abstract": "Sem nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.",
      "content": "MegaSmashMondaysBigMove.jsx"
    }
  ];

const NewsContainer = styled.div`

`;

const News = (props) => {
    return (
        <NewsContainer>
            {/* <NewsArticleListing articles = {articles}></NewsArticleListing> */}
            <NewsArticle article = {articles[0]}></NewsArticle>
        </NewsContainer>
    )
};

export default News;