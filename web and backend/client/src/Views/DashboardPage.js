

import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Welcome from './Welcome';
import CreatePackage from './CreatePackage';
// import ViewVehicle from './ViewVehicle';
import CheckDelivery from './CheckDelivery';
import ViewAllGoods from './ViewAllGoods';
import TrackingDisease from './TrackingDisease';

class DashboardPage extends Component {

    constructor(){
        super();

        this.state = { 
            sidebarOpen: "" ,
            openedView:"welcome"
        };
    }    
    //COLLECTS FORM FIELD VALUES ON CHANGE AND SETS STATE
    handleViewChange = (e) => {
        console.log(e.target.name)
        this.setState({
            openedView: e.target.name
        })
    }

    // TOGGLE SIDEBAR
    toggleSideBar = () => {
        if(this.state.sidebarOpen === ""){
            this.setState({
                sidebarOpen: 'active'
            });
            return;
        }
        if(this.state.sidebarOpen === "active"){
            this.setState({
                sidebarOpen: ''
            });
            return;
        }
    }
    componentDidMount(){
        this.setState({
            email: this.props.match.params.email
        })
    }

    render() {
        let sidebarContent = <b>Sidebar content</b>;
        return (
            // BEGIN SIDEBAR COMPONENT
            <div className = "wrapper">
                <nav id = "sidebar" className = {this.state.sidebarOpen}>            
                    <div className = "sidebar-header" >
                    <a href = "#" name = "welcome" onClick = {this.handleViewChange} id = "headTitle">TrackIT</a>
                        <strong>KD</strong>
                        <p>{this.state.email}</p>
                    </div>

                    <ul className = "list-unstyled components">
                        <li className = "active">
                            <a className = "menuBtn" href = "#homeSubmenu" data-toggle = "collapse" aria-expanded = "false">
                                <i className = "glyphicon glyphicon-home"></i>
                                Hospitals
                            </a>
                            <ul className = "collapse list-unstyled" id = "homeSubmenu">
                                <li><a href = "#" className = "menuBtn" name = "viewvehicle" >View All</a></li>
                                <li><a href = "#" className = "menuBtn" name = "createPackage" onClick = {this.handleViewChange}>Create Package</a></li>
                            </ul>
                        </li>
                        <li>
                            <a className = "menuBtn" href = "#repairSubmenu" data-toggle = "collapse" aria-expanded = "false">
                                <i className = "glyphicon glyphicon-duplicate"></i>
                                Drugs &amp; Equipments
                            </a>
                            <ul className = "collapse list-unstyled" id = "repairSubmenu">
                                <li><a href = "#" className = "menuBtn" name = "viewallgoods" onClick = {this.handleViewChange}>View All Goods</a></li>
                                <li><a href = "#" className = "menuBtn" name = "checkdelivery" onClick = {this.handleViewChange}>Check Delivery Status</a></li>

                            </ul>
                        </li>
                        <li>
                            <a className = "menuBtn" href = "#safetySubmenu" data-toggle = "collapse" aria-expanded = "false">
                                <i className = "glyphicon glyphicon-duplicate"></i>
                                Outbreak Monitoring
                            </a>
                            <ul className = "collapse list-unstyled" id = "safetySubmenu">
                                <li><a href = "#" className = "menuBtn">Tracking Vaccines</a></li>
                                <li><a href = "#" className = "menuBtn" name = "trackingdisease" onClick = {this.handleViewChange}>Tracking Diseases</a></li>
                            </ul>
                        </li>
                        <li>
                            <a className = "menuBtn" href = "#performanceSubmenu" data-toggle = "collapse" aria-expanded = "false">
                                <i className = "glyphicon glyphicon-duplicate"></i>
                                Performance &amp; Upgrade
                            </a>
                            <ul className = "collapse list-unstyled" id = "performanceSubmenu">
                                <li><a href = "#" className = "menuBtn">Health Vehicles Status</a></li>
                                <li><a href = "#" className = "menuBtn">Lab Equipment Status</a></li>
                                <li><a href = "#" className = "menuBtn">Staff Performance</a></li>
                            </ul>
                        </li>
                        <li>
                            <a className = "menuBtn" href = "#">
                                <i className = "glyphicon glyphicon-send"></i>
                                User Profile
                            </a>
                        </li>
                    </ul>
                </nav>

            {/* CONTENT AREA */}
            <div id = "content">

                <nav className = "navbar navbar-default">
                    <div className = "container-fluid">

                        <div className = "navbar-header">
                            <button type="button" id = "sidebarCollapse" className = "btn btn-info navbar-btn" onClick = {this.toggleSideBar}>
                                <i className = "glyphicon glyphicon-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>
                        </div>

                        <div className = "collapse navbar-collapse" id = "bs-example-navbar-collapse-1">
                            <ul className = "nav navbar-nav navbar-right">
                                <li><Link to="/">Log Out</Link></li>

                            </ul>
                            <ul className = "nav navbar-nav navbar-left">
                                <li><Link to="/" name = "panicbutton" onClick = {this.handleViewChange}> PANIC BUTTON </Link></li>

                            </ul>
                        </div>
                    </div>
                </nav>
                {this.state.openedView === "welcome" && (
                    <Welcome/>
                )}
                {this.state.openedView === "createpackage" && (
                    <CreatePackage />
                )}
                {/* {this.state.openedView === "viewvehicle" && (
                    <ViewVehicle />
                )} */}
                {this.state.openedView === "checkdelivery" && (
                    <CheckDelivery />
                )}
                {this.state.openedView === "viewallgoods" && (
                    <ViewAllGoods />
                )}
                {this.state.openedView === "trackingdisease" && (
                    <TrackingDisease />
                )}
               
                
            </div>
        </div>

        );
    }
}

export default DashboardPage;