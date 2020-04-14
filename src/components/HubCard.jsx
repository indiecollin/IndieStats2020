import React, {Component} from 'react';
import styled from 'styled-components';

const playerCardGrey = '#BECFE3';
const gamerTag =  'rgba(255, 127, 127, 0.8)';//get hex
const hubColors = {
    player:['#AD1C5F', '#CD5173', '#D3838E', '#CD7B6D', '#A30401', '#FE0000', '#BE2321', '#B20606', 'none', 'none', 'none', 'none'],
    stats:['#2D5AD9', '#4588DF', '#58A6E4', '#36A1CF', '#0140A7', '#0068EB', '#1F52D2', '#063BC9', '#C5DDFF', '#576C99', '#BAD6FF', '#192F6B'],
    tournaments:['#CAB799', '#D0B78E', '#D8C07A', '#CEB815', '#916600', '#F5AA00', '#B57F1F', '#AA7B07', '#FFD42F', '#9C7A20', '#FFD42D', '#573601'],
    rivals:['#29AC9E', '#35C1A7', '#51C6AB', '#33BD5D', '#03691D', '#009D1C', '#1F862A', '#007C15', '#DADADA', '#5D5D5D', '#FFFFFF', '#292929']
};

const HubWrapper = styled.div`
    grid-column: ${props => props.gridColumn};
    position: relative;    
    width: 300px;
    height: 268px;    
    &::before{
        content: '';
        width: 100%;
        height: 100%;
        clip-path: polygon(0% 15%, 0 100%, 100% 100%, 100% 0%, 15% 0%);
        background-color: ${props=> props.theme.black};
        position: absolute;
        display: block;
        right: 0;
        bottom: 0;
        border-left: 2.5px solid ${props=> props.theme.black};
        border-top: 6px solid ${props=> props.theme.black};
        box-sizing: content-box; 
    }

    @media screen and (max-width: 1320px) {        
        grid-column: 2 / -1;
        margin-top: 20px;
    }
`;

const Hub =  styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    height: 268px;
    max-width: 320px;
    max-height: 268px;
    background:
        linear-gradient(to top, ${props => hubColors[props.type][3]} 5%, transparent 5%),            
        linear-gradient(-135deg, ${() => playerCardGrey} 42%, transparent 42%),
        linear-gradient(-148deg, ${props => hubColors[props.type][0]} 72.5%, transparent 70%), 
        linear-gradient(-162deg, ${props => hubColors[props.type][1]} 80.5%, transparent 80.5%), 
        linear-gradient(-180deg, ${props => hubColors[props.type][2]} 95%, transparent 95%);            
    background-repeat: no-repeat; 
    clip-path: polygon(0% 18%, 0 100%, 100% 100%, 100% 0%, 18% 0%);
    position: relative;
    z-index: 1;    
    
    &::after{
        background-color: ${props => hubColors[props.type][4]};
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 13px;//don't like it but it works
        width: 20px;
        //z-index: -1;
    }

    *:first-child{
        margin-top: auto;        
    }    

    img{
        z-index: 0;
        position: absolute;
        top: 0;
    }

    &>span{
        font-size: 28px; 
        font-weight: 700;
        color: ${props => props.theme.white};        
        margin-left: auto;
        z-index: 20;
        margin-right: 16px;
        text-transform: capitalize;  
        text-shadow: ${props => '1px -2px 0 ' + props.theme.black + 
                             ', -2px -2px 0 ' + props.theme.black + 
                             ' , -2px 2px 0 ' + props.theme.black + 
                             ' , 2px 2px 0 ' + props.theme.black};
    }
`;

const HubPreview = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: ${props => hubColors[props.type][8]};
    color: ${props => hubColors[props.type][9]};
    font-weight: 550;
    text-align: center;
    padding: 8px 0;
    width: 224px;//temp?
    border: 2px solid ${props => props.theme.black};        

    &:hover{
        border-color: ${props => props.theme.hoverRed};
        background-color: ${props => hubColors[props.type][10]};
        color: ${props => hubColors[props.type][11]};
    }
`;

const HubFooter = styled.div`
    width: 87.5%;
        position: relative;
        z-index: 20;

        &::before{
            content: '';
            width: 101.5%;
            height: 102.5%;
            clip-path: polygon(0% 33%, 0 100%, 100% 100%, 100% 33%, 95% 0%, 5% 0%);
            background-color: ${props => props.theme.black};
            position: absolute;
            display: block;
            bottom: 0px;
            right: -2.25px;  
        }

        div{                
            height: 40px;
            background-color: ${props => hubColors[props.type][5]};          
            z-index: 20;
            clip-path: polygon(0% 33%, 0 100%, 100% 100%, 100% 33%, 95% 0%, 5% 0%);
            
            div{                    
                clip-path: polygon(0% 0%, 0 100%, 82% 100%, 100% 0%);
                background: repeating-linear-gradient(115deg, 
                    ${props => hubColors[props.type][6]} 0 2px, 
                    ${props => hubColors[props.type][7]} 2px 4px);
                height: 100%;
                width: 100px;
            }
        }
`;

const GamerTag = styled.div`
    width: 72.5%;
    height: 28px;
    background-color: ${() => gamerTag};
    border: solid 2px ${props => props.theme.black};        
    z-index: 20;
    margin-bottom: 4px;
    text-align: center;
    font-size: 20px;
    font-weight: 550;
`;

class HubCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            charImage: ''
        };
    }

    componentDidMount(){
        if(this.props.type === 'player'){
            import(/* webpackMode: "eager" */ `../../public/main_portraits/${this.props.player.main}.png`).then(portrait => {
                this.setState({charImage: portrait.default});
            });
        }
    }

    render(){
        return(
            <HubWrapper type = {this.props.type} gridColumn = {this.props.gridColumn}>
                <Hub type = {this.props.type}>
                    {this.props.preview ? this.props.preview.map(content => <HubPreview type = {this.props.type}>{content}</HubPreview>) : null}
                    <span>{this.props.type !== 'player' ? this.props.type : this.props.player.main.slice(0,-1) }</span>
                    {this.props.type === 'player' ? <GamerTag>{this.props.player.gamerTag}</GamerTag> : null}
                    <HubFooter type = {this.props.type}><div><div></div></div></HubFooter>
                    {this.props.type === 'player' ? <img src={this.state.charImage}></img> : null}
                </Hub>        
            </HubWrapper>
        );
    };
};

export default HubCard;