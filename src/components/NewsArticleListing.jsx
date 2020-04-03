import React, {Component} from 'react';
import styled from 'styled-components';
import SearchIcon from './svgs/SearchIcon.jsx';

const headerColor = '#F3F711';

const ArticleListing = styled.div`    
    display: flex;
    flex-direction: column;
    max-width: 256px;
    max-height: 100%;
    height: max-content;
    margin: 0 auto 24px;
    overflow-y: auto;    
    overflow-x: hidden;
    align-items: center;
    background-color: ${props => props.theme.lightGrey};

    h2{
        position: relative;
        padding: 12px 148px 12px 20px;
        background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'}); 
        color: ${props => props.theme.white};
        text-align: center;
        margin: 0;//removes defaults

        &:before{
            content: '';
            position: absolute;
            background-color: ${() => headerColor};
            width: 4px;
            height: 40px;
            top: 6px;
            left: 12px;
        }     
    }    

    /* @media screen and (max-width: 960px){
        max-width: 500px;
        max-height: 392px;
        flex-direction: row;
        flex-wrap: wrap;

        h2{
            width: 100%;
            text-align: left;
        }
        .search{
            flex-basis: 100%;
            margin: 12px 0;
            input{
                margin-left: auto;
            }
            button{
                margin-right: auto;
            }
        }
        .listing{
            min-width: 240px;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 480px){
        width: 300px;        
    } */
`;

const Search = styled.div`
        margin: 12px auto;
        display: flex;     

        input{
            padding: 0;//removes default
        }   

        button{
            width: 20px;
            height: 20px;
            cursor: pointer;
            
            svg{
                position: relative;
                bottom: 1px;
                right: 6px;
            }
        }                
`;

const Thumbnail = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;        
    cursor: pointer;
    width: 100%;

    img{
        width: 192px;
        margin: 8px auto;        
        box-sizing: border-box;
    }    
    
    &:hover{

        background: repeating-linear-gradient(${props => '115deg, ' + props.theme.stripeGrey + ' 0 2px, ' + props.theme.stripeBlack + ' 2px 4px'}); 

        img{
            outline: 2px solid ${() => headerColor};
        }

        span{
            color: ${props => props.theme.white}
        }
    }

    span{
        font-weight: 550;
    }    
`;

class NewsArticleListing extends Component {
    constructor(props){
        super(props);
        this.state = {
            thumbnails: []
        };
    }

    componentDidMount(){            
        let imports = this.props.articles.map(a => import(/* webpackMode: "eager" */ `../../public/article_images/${a.thumbnail}`));
        Promise.all(imports).then(images => this.setState({thumbnails: images.map(banner => banner.default)}));
    }    
    
    render(){    
        return(
            <ArticleListing>
                <h2>Articles</h2>
                <Search>
                    <input  type='text' placeholder = 'Search Articles'></input>
                    <button><span><SearchIcon/></span></button>
                </Search>
                {this.props.articles.map((a,i) => {
                    return <Thumbnail key = {a.name}>
                        <img src={this.state.thumbnails[i]}/>
                        <span>{a.name}</span>
                    </Thumbnail>
                })}
            </ArticleListing>
        );
    };
};

export default NewsArticleListing;
