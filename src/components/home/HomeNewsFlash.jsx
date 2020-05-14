import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import titles from '../../helpers/articleTitles';
import NewsIcon from '../svgs/NewsIcon.jsx';
import ArrowIcon from '../svgs/ArrowIcon.jsx';

const headerBackground = '#697279';
const articleHeaderSecondary = '#EEDF0F';

const NewsFlash = styled.div`
    grid-column: 1 / -1;
    margin: 0 80px 20px;

    h3{
        font-size: 20px;
        padding: 4px 8px;
        text-align: center;
        background-color: ${props => props.theme.stripeBlack};
        color: ${props => props.theme.newsColor};
        border-bottom: solid 4px ${props => props.theme.newsColor};
    }

    &>div{/*article*/
        display: grid;
        grid-template-columns: 1fr 3fr;
        margin-top: 20px;
    }

    @media screen and (max-width: 824px) {/*shrinks article for a more vertical view*/ 
        width: 320px;
        margin: 0 auto 20px;

        &>div{
            margin-top: 8px;
        }
    } 
`;

const ArticleHeader = styled.div`
    display: flex;
    grid-column: 1 / -1;
    align-items: center;
    height: 32px;
    background: linear-gradient(${props => '110deg, '+ props.theme.newsColor + ' 87.9%, '+ articleHeaderSecondary + ' 88%, '+ articleHeaderSecondary + ' 97.9%, ' + headerBackground + ' 98%, ' + headerBackground + ' 100%'});
    color: ${props => props.theme.stripeBlack};

    span{/*newspaper icon*/
        margin: 0 16px;
        svg{                            
            width: 20px;
            height: 20px;              
            fill: ${props => props.theme.stripeBlack};
        } 
    }  
`;

const ArticleContent = styled.div`    
    display: flex;
    grid-column: 1 / -1;
    background-color: ${() => headerBackground};

    img{
        max-width: 256px;
        max-height: 144px;
        margin: 0 auto;
    }

    &>div{/*abstract*/
        display: flex;
        flex-direction: column;
        background-color: ${props => props.theme.white};
        min-height: 144px;//temp

        p{
            font-size: 14px;
            font-weight: 550;
            padding: 8px 20px;
        }

        &>a{/*more button*/
            align-self: flex-end;
            margin-top: auto;  
            margin-bottom: 12px;
            margin-right: 12px;
            padding: 4px;
            display: flex;
            align-items: center;
            background-color: ${props => props.theme.newsColor};
            border: 1.5px solid ${props => props.theme.stripeBlack};
            color: ${props => props.theme.stripeBlack};
            text-decoration: none;

            span{                                                
                svg{                                        
                    fill: ${props => props.theme.stripeBlack};                 
                }           
            }

            &:hover {
                span{
                    color: ${props => props.theme.hoverRed};
                }
                    svg{                        
                    fill: ${props => props.theme.hoverRed};
                }
            }

        }                
    }

    @media screen and (max-width: 824px) {/*stacks contents for vertical view*/        
        flex-direction: column;
    }
`;
const articleCount = 2;
const HomeNewsFlash = () =>{    
    const [thumbnails, setThumbnails] = useState([]);
    const [abstracts, setAbstracts] = useState([]);    
    useEffect(()=>{
        let imports = titles.filter((t,i) => i<articleCount).map(aFile => import(/* webpackMode: "eager" */ `../../../public/article_images/${aFile.split(/(?=[A-Z])/).join('-').toLowerCase().replace('\'', '')}.jpg`));
        Promise.all(imports).then(images => setThumbnails(images.map(banner => banner.default)));
        imports = titles.filter((t,i) => i<articleCount).map(aFile => import(/* webpackMode: "eager" */ `../../articles/${aFile.replace('\'', '')}.jsx`));
        Promise.all(imports).then(aComponents =>{
            setAbstracts(aComponents.map(aComp => aComp.abstract));
        });
    },[])
    
    return <NewsFlash>
        <h3>News Flash</h3>
        {
            titles
            .filter((t,i) => i<articleCount)
            .map((title,i) => <div key = {title}>
                <ArticleHeader>
                    <span><NewsIcon/></span><h4>{title.split(/(?=[A-Z])/).join(' ')}</h4>
                </ArticleHeader>
                <ArticleContent>
                    <img src = {thumbnails[i]}/>             
                    <div>   
                        <p>{abstracts[i]}</p>
                        <Link to = {`/news/${title.replace('\'','')}`}>
                            <span>More</span><span><ArrowIcon /></span>
                        </Link>
                    </div>
                </ArticleContent>
            </div>   
        )}        
    </NewsFlash>            
};

export default HomeNewsFlash;