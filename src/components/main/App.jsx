import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import Loadable from 'react-loadable';
import {ThemeProvider} from 'styled-components';

import theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';
import fontImports from '../../styles/fontimports.css';

import NavBar from './NavBar.jsx';
//import AboutModal from './AboutModal.jsx';
import Footer from './Footer.jsx';
import Backdrop from '../Backdrop.jsx';
//import ContactUs from './ContactUs.jsx';
import Home from '../../containers/Home.jsx';
import Players from '../../containers/Players.jsx';
import Tournaments from '../../containers/Tournaments.jsx';
import News from '../../containers/News.jsx';
import BrowserNotSupported from '../../containers/BrowserNotSupported.jsx';
import Http404 from '../../containers/404.jsx';

const AboutModalAsync = Loadable({
  loader: () => import(/* webpackChunkName: "about-modal" */'./AboutModal.jsx'),
  loading() {return;}
});

class App extends Component { 
    
    constructor(props, context){
        super(props, context);
        this.state = {
            showBackdrop: false,
            browserSupported: false
        }
        this.toggleBackdrop = this.toggleBackdrop.bind(this);
    }

    componentDidMount(){
        //class used to help with cloaking html on initial page load
        document.getElementsByTagName('body')[0].classList.remove('preload');
        //handle broswer support logic here
        const isIE = /*@cc_on!@*/false || !!document.documentMode;
        if(!isIE){//
            this.setState({browserSupported: true})
        }
    }

    toggleBackdrop(content){
        this.setState({showBackdrop: content});
    }

    render() {
        return( 
            this.state.browserSupported ? <ThemeProvider theme = {theme}>
                <React.Fragment>
                    <GlobalStyles/>
                    <NavBar about = {this.toggleBackdrop}/>
                    <Backdrop show = {this.state.showBackdrop} onClick = {this.toggleBackdrop}>
                        {this.state.showBackdrop === 'about' ? <AboutModalAsync closeModal = {this.toggleBackdrop}/> : null }
                    </Backdrop>                                
                    <Switch>                        
                        <Route path='/' exact><Home/></Route>
                        <Route path='/players/:selected?' exact><Players/></Route>
                        <Route path='/tournaments/:selected?' exact><Tournaments/></Route>
                        <Route path='/news/:selected?' exact><News/></Route>
                        <Route><Http404/></Route>
                    </Switch>
                    <Footer contactUs = {this.toggleBackdrop}/>
                </React.Fragment>
            </ThemeProvider> : <BrowserNotSupported/>
        )
        
    }
}

export default App;