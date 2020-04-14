import React, { Component } from 'react';
// import {Switch, Route, withRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import {ThemeProvider} from 'styled-components';

import * as actionTypes from '../actions';
import theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';

import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
//import Modal from './Modal.jsx';
// import ContactUs from './ContactUs.jsx';
import Home from '../containers/Home.jsx';
import Players from '../containers/Players.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import News from '../containers/News.jsx';

class App extends Component { 
    
    constructor(props, context){
        super(props, context);
    }

    render() {
        return (     
            <ThemeProvider theme = {theme}>
                <React.Fragment>
                    <GlobalStyles/>
                    <NavBar/>
                    {/* <Modal>Testing</Modal> */}
                    {/* <ContactUs/> */}                 
                    <Switch>                        
                        <Route path='/' exact><Home/></Route>
                        <Route path='/players' exact><Players/></Route>
                        <Route path='/tournaments' exact><Tournaments/></Route>
                        <Route path='/news' exact><News/></Route>
                    </Switch>
                    <Footer/>
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