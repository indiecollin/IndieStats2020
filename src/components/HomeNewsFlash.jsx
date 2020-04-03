import React, {Component} from 'react';
import styled from 'styled-components';
import NewsIcon from './svgs/NewsIcon.jsx';
import ArrowIcon from './svgs/ArrowIcon.jsx';

const headerColor = '#F3F711';
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
        color: ${() => headerColor};
        border-bottom: solid 4px ${() => headerColor};
    } 

     &>div{
         margin-top: 20px;

         &>div{
            display: flex;
            background-color: ${() => headerBackground};

            img{
                max-width: 256px;
                max-height: 144px;
                margin: 0 auto;

            }
            &>div{
                display: flex;
                flex-direction: column;
                background-color: ${props => props.theme.white};

                p{
                    font-size: 14px;
                    font-weight: 550;
                    padding: 8px 20px;
                }
                &>div{
                    align-self: flex-end;
                    margin-top: auto;  
                    margin-bottom: 12px;
                    margin-right: 12px;
                    padding: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    background-color: ${() => headerColor};
                    border: 1.5px solid ${props => props.theme.stripeBlack};
                    color: ${props => props.theme.stripeBlack};

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
        }         
    }

    /* @media screen and (max-width: 824px) {    
        width: 320px;
        margin: 0 auto;

        .content-container{
            flex-direction: column;            
        }
    }  */
`;

const ArticleHeader = styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    background: linear-gradient(${'110deg, '+ headerColor + ' 87.9%, '+ articleHeaderSecondary + ' 88%, '+ articleHeaderSecondary + ' 97.9%, ' + headerBackground + ' 98%, ' + headerBackground + ' 100%'});
    color: ${props => props.theme.stripeBlack};

    span{
            margin: 0 16px;

            svg{                            
                width: 20px;
                height: 20px;              
                fill: ${props => props.theme.stripeBlack};
            } 
        }  
    
    div{
        margin: 0 16px;                
    } 
`;

class HomeNewsFlash extends Component{
    constructor(props){
        super(props);
        this.state = {
            thumbnails: []
        };
    };

    componentDidMount(){
        let imports = this.props.articles.map(a => import(/* webpackMode: "eager" */ `../../public/article_images/${a.thumbnail}`));
        Promise.all(imports).then(images => this.setState({thumbnails: images.map(banner => banner.default)}));
    };

    render(){    
        return(
            <NewsFlash>
                <h3>News Flash</h3>
                <div className='article'>
                    <ArticleHeader>
                        <span className='news-icon'><NewsIcon/></span><h4>{this.props.articles[0].name}</h4>
                    </ArticleHeader>
                    <div className='content-container'>
                        <img src = {this.state.thumbnails[0]}/>             
                        <div className='content'>   
                            <p>{this.props.articles[0].abstract}</p>
                            <div className='more'>
                                <span>More</span><span className='arrow-icon'><ArrowIcon /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='article'>
                    <ArticleHeader>
                        <span className='news-icon'><NewsIcon/></span><h4>{this.props.articles[1].name}</h4>
                    </ArticleHeader>
                    <div className='content-container'>
                        <img src = {this.state.thumbnails[1]}/>             
                        <div className='content'>   
                            <p>{this.props.articles[1].abstract}</p>
                            <div className='more'>
                                <span>More</span><span className='arrow-icon'><ArrowIcon /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </NewsFlash>
        )
    }
};

export default HomeNewsFlash;