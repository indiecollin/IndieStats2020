import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import {ThemeProvider} from 'styled-components';

import * as actionTypes from '../actions';
import theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';

import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
//import Modal from './Modal.jsx';
import ContactUs from './ContactUs.jsx';
import Home from '../containers/Home.jsx';
import Players from '../containers/Players.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import News from '../containers/News.jsx';
// import Test1 from './Test1.jsx';
// import Test2 from './Test2.jsx';
// contact route component
// const LoadingComponent = () => <h3>please wait...</h3>;
// const Test1Promise = () => {
//     return import(/* webpackChunkName: "test1" */'./Test1.jsx');
// }
// const Test2Promise = () => {
//     return import(/* webpackChunkName: "test2" */'./Test2.jsx');
// }
// const AsyncTest1Component = loadable( {
//     loader: Test1Promise,
//     loading: LoadingComponent
// } ); 
// const AsyncTest2Component = loadable( {
//     loader: Test2Promise,
//     loading: LoadingComponent
// } ); 
// //import ImageTest from './ImageTest.jsx';

// const componentRoutes = {
//     component: Test1,
//     path: '/',
//     indexRoute: {component: Test2},
//     childRoutes: [
//         {path: '', getComponent(location, cb){import('./Test2.jsx').then(module => cb(null, module.default))}},
//         {path: '', getComponent(location, cb){import('./Test3.jsx').then(module => cb(null, module.default))}},
//         {path: '', getComponent(location, cb){import('./Test4.jsx').then(module => cb(null, module.default))}}
//     ]
// };

class App extends Component { 
    
    constructor(props, context){
        super(props, context);
    }

    //<button onClick = {() => import( /* webpackChunkName: "imageTest" */ './ImageTest.jsx').then(module => {}) }>Run Action</button>
    render() {
        return (     
            <ThemeProvider theme = {theme}>
                <React.Fragment>
                    <GlobalStyles/>
                    {/* <NavBar/> */}
                    {/* <Modal>Testing</Modal> */}
                    {/* <ContactUs/> */}
                    {/* <button onClick = {() => this.props.history.push('/redirect')}>Go To 2</button> */}
                    {/* <button onClick = {() => this.props.onDoSomething() }>Run Action</button> */}                
                    {/* <div>{this.props.actionRan ? <ImageTest/> : null}</div> */}                    
                    <Switch>
                        <Route path='/' exact><Home/></Route>
                        {/* <Route path='/players' exact><Players/></Route> */}
                        {/* <Route path='/' exact><Tournaments/></Route> */}
                        {/* <Route path='/' exact><News/></Route> */}
                    </Switch>
                    {/* <Footer/> */}
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(App));