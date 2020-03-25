import React, {Component} from 'react';
import styled from 'styled-components';

const headerColor = '#F3F711';

const Article = styled.div`

    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
    background-color: $white;
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;

    h2{
        text-align: center;   
        padding: 12px 0;
        margin-bottom: 20px;
        background-color: ${() => headerColor};
        color: ${props => props.theme.stripeBlack};
    }

    img{
        display: block;
        margin:  0 auto 40px;

        //med
        min-width: 300px;
        max-width: 600px;
        width: 100%;
        //margin: 0 auto;
    }

    p{
        margin-top: 32px;
        padding: 8px 48px;
    }    

/* @media screen and (max-width: 960px) { 
    .article{
        max-width: 760px;
    }    
}

@media screen and (max-width: 480px) {              
    margin: 0 auto;
        .article {
        //margin: 0;
        width: 300px;
        img.med{
            padding: 0 8px;
            width: 300px;            
        }
        p{
            width: 300px;
            padding: 8px;
            margin: 0 auto;
        }
    }
} */
`;

// const NewsArticle = (props) => {
//     const [selected, setSelected] = useState();
//     useEffect(() => {        
//         import(/* webpackMode: "eager" */ `../articles/${props.article.content}`).then(article => setSelected(article.default));
//       });
//     return(
//         <Article key = {'test'}>
//             {selected}
//         </Article>
//     );
// };

class NewsArticle extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        import(/* webpackMode: "eager" */ `../articles/${this.props.article.content}`)
        .then(article => this.setState({
            selected: React.createElement(article.default)
        }));
    }

    render(){
        return(
            <Article>
                {this.state.selected}
            </Article>
        );
    }
}

export default NewsArticle;
