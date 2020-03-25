import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Moment from 'moment';
Moment.locale('en');
import NavTriangle from './NavTriangle.jsx';
import OptionSwitch from './OptionSwitch.jsx';

const headerPrimary = '#B80612';
const headerSecondary = '#D82835';
const background = '#FFC7C8';
const listingGrey = '#DBE6EC';

const FeaturedTournaments = styled.div`  
    display: flex;
    flex-direction: column;
    justify-self: center;
    margin-bottom: 20px;
    width: 460px;
    margin: 0 auto;
    
    h2 {                    
        position: relative;
        background-color: ${() => headerPrimary};
        clip-path: polygon(0% 0%, 3% 100%, 97% 100%, 100% 0%);
        color: ${props => props.theme.white};      
        text-align: center;
        margin-bottom: 8px;
        width: 460px;

        &:before{
            display: block;
            position: absolute;
            content:'';
            background-color: ${() => headerSecondary};
            width: 24px;
            height: 100%;
            left: 2px;
            transform: skew(30deg);
        }

        &:after{
            display: block;
            position: absolute;
            content:'';
            background-color: ${() => headerSecondary};
            width: 24px;
            height: 100%;
            top: 0;
            right: 2px;
            transform: skew(-30deg);
        }
    }

    &>div{
        display: grid;
        justify-items: center;
        position: relative;                   
        grid-template-columns: 1fr;      
        padding: 12px 12px;  
        font-weight: 550;                
        align-self: center;
        border: solid 2px ${() => headerSecondary};
        background-color: ${() => background};
        height: 240px;


        &>div{
            display: flex;            
            margin-bottom: 16px;

            img{
                width: 176px;
                height: 88px;
            }

            &>div{
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: ${(props) => props.theme.black};                
                
                &>div{     
                    display: flex;
                    flex-direction: column;                         
                    align-items: center;   
                    justify-items: flex-end;    
                    font-size: 16px;                                       
                    margin-left: 8px;  
                    width: 200px;                    

                    & > div {//hmmmm?
                        display: flex;
                        height: 33%;
                    }                    
                }
            }  
        }                                                 
    }

    /* @media screen and (max-width: 480px) {    
        width: 320px;
        margin-left: auto;
        margin-right: auto;
        
        .header{
            width: 320px;            
        }

        .table{
            width: 300px;
            padding: 12px 0;       
                 

            .transition-group .row .details{
                font-size: 14px;
                margin-left: 4px;
                width: 160px;            
            }

            .side-triangle-icon{
                right: -12px;
                &.left{
                   left: -12px;
                }                
           }
        }
    }  */
`;

const Controls = styled.div`
    display: flex;

    &>div{
        flex-direction: row !important;
        width: 336px;
    }

    &>button{
        position: relative;
        top: 2;

        &:first-child{
            left: -4px;            
        }
    }
`;

const HomeFeaturedTournaments = (props) => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {//this can be down using 2 loops instead of using an image indexer
        let imports = [];
        props.tournaments.forEach(t => {
            imports.push(import(/* webpackMode: "eager" */ `../../public/tournament_banners/${t.banner}`));
        });
        Promise.all(imports).then(images => {                     
            let banners = images.map(banner => {
                return banner.default;
            });
            setBanners(banners);
        })             
      });
    return(
    <FeaturedTournaments>
        <h2>Tournaments</h2>
            <div>                                            
                {
                    props.tournaments
                    .map((t,i) => {
                        return (
                            <div key = {t.name}>
                                <img src = {banners[i]}/>
                                <div>
                                    <div>
                                        <span><span>{t.name}</span></span>
                                    </div>
                                    <div>
                                        <span><span>{Moment(new Date(t.date)).format('MMM D, YYYY')}</span></span>
                                    </div>
                                    <div>
                                        <span><span>{t.venue}</span></span>
                                    </div>
                                </div>
                            </div>                            
                        )
                    })
                }                
                <Controls>
                    <NavTriangle left={true}/>
                        <OptionSwitch selected = {props.past} left = 'Upcoming' right = 'Recent'/>                        
                    <NavTriangle left={false}/>           
                </Controls>
            </div> 
    </FeaturedTournaments>
    )
};

export default HomeFeaturedTournaments;