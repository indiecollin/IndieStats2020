import React, {useState} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import titles from '../helpers/articleTitles';
import NewsArticleListing from '../components/NewsArticleListing.jsx';
import NewsArticle from '../components/NewsArticle.jsx';

const NewsContainer = styled.main`
    min-height: 100vh;
    padding-top: 90px;        
    &>div{
        display: grid;
        grid-template-columns: 256px minmax(580px, 1244px);
        grid-column-gap: 36px;        
        margin: 0 40px;                
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

const News = () => {
    let { selected } = useParams();    
    const cleaned = titles.map(t => t.replace('\'', '').toLowerCase());
    const urlArticleIndex = selected ? cleaned.findIndex(t => t === selected.toLowerCase()) : -1;
    const [articleTitle, setArticleTitle] = useState(titles[urlArticleIndex > 0 ? urlArticleIndex : 0]);    
    return (
        <NewsContainer>
            <div>
                <NewsArticleListing setArticleTitle = {setArticleTitle} titles = {titles}></NewsArticleListing>
                <NewsArticle articleTitle = {articleTitle}></NewsArticle>
            </div>
        </NewsContainer>
    );
};

export default News;