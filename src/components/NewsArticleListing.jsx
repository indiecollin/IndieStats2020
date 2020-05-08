import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from './svgs/SearchIcon.jsx';

const ArticleListing = styled.div`    
    display: flex;
    flex-direction: column;
    max-width: 256px;
    max-height: 100%;
    height: max-content;//crossbroswer logic safe
    margin: 0 auto 24px;
    overflow-y: auto;    
    overflow-x: hidden;
    align-items: center;
    background-color: ${props => props.theme.lightGrey};

    h2{
        position: relative;
        padding: 12px 148px 12px 20px;
        background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ', ' + props.theme.stripeGrey + ' 2px, ' + props.theme.stripeBlack + ' 2px, ' + props.theme.stripeGrey + ' 4px'}); 
        color: ${props => props.theme.white};
        text-align: center;        

        &:before{
            content: '';
            position: absolute;
            background-color: ${props => props.theme.newsColor};
            width: 4px;
            height: 40px;
            top: 6px;
            left: 12px;
        }     
    }    

    a{
        text-decoration: none;
        color: inherit;
        margin: 0 auto;
    }

    @media screen and (max-width: 960px){
        width: 100%;
        max-width: 620px;
        flex-direction: row;
        flex-wrap: wrap;

        h2{
            width: 100%;
            text-align: left;
        }                
    }

    @media screen and (max-width: 480px){
        width: 300px;        
    }
`;

const Search = styled.div`
    margin: 12px auto;
    display: flex;         
    position: relative;    

    button{
        width: 20px;
        height: 20px;
        cursor: pointer;
        //default border styles
        background-color: #F0F0F0;
        border: 2px outset #F0F0F0;        
    }

    @media screen and (max-width: 960px){
        flex-basis: 100%;
        margin: 12px 0;
        input{
            margin-left: auto;
        }
        button{
            margin-right: auto;
        }        
    }           
`;

const Thumbnail = styled.div`  
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 256px;
    margin-bottom: 20px;        
    cursor: pointer;    

    img{
        width: 192px;
        margin: 8px auto;        
        box-sizing: border-box;
    }    
    
    &:hover{
        background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ', ' + props.theme.stripeGrey + ' 2px, ' + props.theme.stripeBlack + ' 2px, ' + props.theme.stripeGrey + ' 4px'}); 

        img{
            outline: 2px solid ${props => props.theme.newsColor};
        }

        span{
            color: ${props => props.theme.white}
        }
    }

    span{
        font-weight: 550;
    }    

    @media screen and (max-width: 960px){        
        min-width: 256px;
        margin: 0 auto;
    }
`;

const NewsArticleListing = (props => {

    const [query, setQuery] = useState('');
    const [input, setInput] = useState('');
    const [articles, setArticles] = useState([]);    
    const [queriedArticles, setQueriedArticles] = useState([]);
    const selectArticle = (article) => {        
        props.setArticleTitle(article); 
    }        
    useEffect(()=>{
        let imports = props.titles.map(aFile => import(/* webpackMode: "eager" */ `../../public/article_images/${aFile.split(/(?=[A-Z])/).join('-').toLowerCase().replace('\'', '')}.jpg`));
        Promise.all(imports).then(images => {
            let imports = props.titles.map(aFile => import(/* webpackMode: "eager" */ `../articles/${aFile.replace('\'', '')}.jsx`));
            let bannersAndTitles = images.map((banner, i) => ({title: props.titles[i], image: banner.default}));            
            Promise.all(imports).then(aComponents =>{
                setArticles(bannersAndTitles.map((article, i) => Object.assign({}, article, {tags: aComponents[i].tags})));
                setQueriedArticles(bannersAndTitles.map((article, i) => Object.assign({}, article, {tags: aComponents[i].tags})));
            });            
        });         
    },[]);

    useEffect(()=>{
        setQueriedArticles(articles.filter(a => !query || a.tags.some(t => query.toLowerCase().split(' ').indexOf(t) >= 0)))
    },[query]);
        
    return <ArticleListing>
        <h2>Articles</h2>
        <Search>
            <input type='text' value={input} onChange={(e => setInput(e.target.value))} onKeyPress = {(e) =>  e.charCode===13 ? setQuery(input) : null} placeholder = 'Search Articles'></input>
            <button onClick = {() => setQuery(input)}><span><SearchIcon/></span></button>
        </Search>
        {
            queriedArticles.length ? queriedArticles            
            .map(t => {
                return <Link to = {`/news/${t.title.replace('\'', '')}`} key = {t.title}>
                    <Thumbnail onClick = {() => selectArticle(t.title)}>
                        <img src={t.image}/>
                        <span>{t.title.split(/(?=[A-Z])/).join(' ')}</span>
                    </Thumbnail>
                </Link>
            }) : null
        }
    </ArticleListing>
    });

export default NewsArticleListing;