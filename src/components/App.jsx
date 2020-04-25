import React, { Component } from 'react';
import {Switch, Route} from 'react-router';
import { connect } from 'react-redux';
import {ThemeProvider} from 'styled-components';

import * as actionTypes from '../actions';
import theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';

import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import Backdrop from './Backdrop.jsx';
import ContactUs from './ContactUs.jsx';
import Home from '../containers/Home.jsx';
import Players from '../containers/Players.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import News from '../containers/News.jsx';
import AboutModal from './/AboutModal.jsx';

class App extends Component { 
    
    constructor(props, context){
        super(props, context);
        this.state = {
            showBackdrop: false
        }
        this.toggleBackdrop = this.toggleBackdrop.bind(this);
    }

    componentDidMount(){
        document.getElementsByTagName('body')[0].classList.remove('preload');
    }

    toggleBackdrop(content){
        this.setState({showBackdrop: content});
    }

    render() {
        return (     
            <ThemeProvider theme = {theme}>
                <React.Fragment>
                    <GlobalStyles/>
                    <NavBar about = {this.toggleBackdrop}/>
                    <Backdrop show = {this.state.showBackdrop} onClick = {this.toggleBackdrop}>
                        {this.state.showBackdrop === 'about' ? <AboutModal closeModal = {this.toggleBackdrop}/> : <ContactUs close = {this.toggleBackdrop}/> }
                    </Backdrop>                                
                    <Switch>                        
                        <Route path='/' exact><Home/></Route>
                        <Route path='/players' exact><Players/></Route>
                        <Route path='/tournaments' exact><Tournaments/></Route>
                        <Route path='/news' exact><News/></Route>
                    </Switch>
                    <Footer contactUs = {this.toggleBackdrop}/>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        actionRan: state.actionRan
    };
}
const mapDispatchToProps = dispatch => {
    return{
        onDoSomething: () => dispatch({type: actionTypes.DO_SOMETHING})
    };
}

export default App;
//export default connect(mapStateToProps, mapDispatchToProps) (withRouter(App));