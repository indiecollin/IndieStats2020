import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Article = styled.div`

    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
    background-color: ${props => props.theme.white};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 32px;
    max-width: 960px;

    h2{
        text-align: center;   
        padding: 12px 0;
        margin-bottom: 20px;
        background-color: ${props => props.theme.newsColor};
        color: ${props => props.theme.stripeBlack};
    }

    img{
        display: block;
        margin:  0 auto 40px;

        //med
        min-width: 300px;
        max-width: 600px;
        width: 100%;        
    }

    p{
        margin-top: 32px;
        padding: 8px 48px;
    }    

    @media screen and (max-width: 960px) {     
        max-width: 760px;
    }
    @media screen and (max-width: 480px) {              
        width: 300px;

        h2{
            font-size: 18px;
        }

        img{//med
            padding: 0 8px;
            width: 300px;
        }
        p{
            width: 300px;
            padding: 8px;
            margin: 0 auto;
        }
    } 
`;

const NewsArticle = (props) =>{
    const [article, setArticle] = useState();

    useEffect(() => {
        import(/* webpackMode: "eager" */ `../articles/${props.articleTitle.replace('\'','')}.jsx`)
        .then(article => setArticle(React.createElement(article.default)));
    }, [props.articleTitle]);
    
    return <Article>
        {article}
    </Article>
}

export default NewsArticle;
