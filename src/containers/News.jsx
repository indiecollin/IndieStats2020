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
    &>div{
        display: grid;
        grid-template-columns: minmax(256px, 1fr) 4fr;
        grid-column-gap: 36px;
        //grid-gap: 20px;
        margin: 0 40px;        
        padding-top: 90px;        
    }

    @media screen and (max-width: 960px){
        &>div{            
            display: flex;
            flex-direction: column;
        }
    }

    @media screen and (max-width: 480px){
        &>div{            
            margin: 0 auto;
        }
    }
`;

const News = (props) => {
    return (
        <NewsContainer>
            <div>
                <NewsArticleListing articles = {articles}></NewsArticleListing>
                <NewsArticle article = {articles[0]}></NewsArticle>
            </div>
        </NewsContainer>
    );
};

export default News;