import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class TrackingDisease extends Component {

// 
    
    constructor(){
        super();
            this.state = {
                data: [],
                isLoading: true,
            }
    }
     
    componentDidMount(){
        // console.log(`this ${this.state.data}`)
        let url = 'https://teamegress.herokuapp.com/viewAlldiseases';
        // let url = 'localhost/3001';
        axios.get(url,{ 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers':'Content-Type, Accept, Access-Control-Allow-Origin'
            }
        })
        .then((response) =>{
            // console.log(response.data.doc)
            this.setState({data: response.data.doc, isLoading: false,})
            // console.log(this.state.data)
            
        })
        .catch(err =>{
            console.log(err)
        })
   
    }
    render(){
        const { data } = this.state;
            return(
                <div>
                {this.state.isLoading === true && (
                    <div>
                        <div className="loaderTable"></div> 
                        <p className = "comm">Loading reported disease cases....</p>
                    </div>
                )}
                {this.state.isLoading === false && (
                         
                <div className = "tabular">
                <Table className = "table" >
                    <Table.Header>
                        <Table.Row className = "TableHead">
                            <Table.HeaderCell>DISEASE TYPE</Table.HeaderCell>
                            <Table.HeaderCell>REPORT LGA</Table.HeaderCell>
                            <Table.HeaderCell>REPORT WARD</Table.HeaderCell>
                            <Table.HeaderCell>CAMPAIN STATUS</Table.HeaderCell>
                            
                            
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            data.map((diseases) => (
                                // const { email, password } = user;
                                <Table.Row className ="tr" key ={diseases._id}>
                                    <Table.Cell>{diseases.disease}</Table.Cell>
                                    <Table.Cell>{diseases.lga}</Table.Cell>
                                    <Table.Cell>{diseases.ward}</Table.Cell>
                                    <Table.Cell>{diseases.campain}</Table.Cell>
                                  
                                </Table.Row>
                            ))
                        }

                    </Table.Body>
            </Table>
            </div>          )}
        </div>
            
        )
    }
}   
