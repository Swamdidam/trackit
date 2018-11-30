import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class ViewAllGoods extends Component {

    
    constructor(){
        super();
            this.state = {
                data: [],
                isLoading: true,
            }
    }
     
    componentDidMount(){
        // console.log(`this ${this.state.data}`)
        let url = 'https://teamegress.herokuapp.com/viewAllPackages';
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
                        <p className = "comm">Loading Your processed goods....</p>
                    </div>
                )}
                {this.state.isLoading === false && (
                         
                <div className = "tabular">
                <Table className = "table" >
                    <Table.Header>
                        <Table.Row className = "TableHead">
                            <Table.HeaderCell>ORDER CODE</Table.HeaderCell>
                            <Table.HeaderCell>ITEM TYPE</Table.HeaderCell>
                            <Table.HeaderCell>ITEM NAME</Table.HeaderCell>
                            <Table.HeaderCell>DRIVER'S CODE</Table.HeaderCell>
                            <Table.HeaderCell>QUANTITY</Table.HeaderCell>
                            <Table.HeaderCell>SOURCE OFFICE</Table.HeaderCell>
                            <Table.HeaderCell>DESTINATION</Table.HeaderCell>
                            <Table.HeaderCell>STATUS</Table.HeaderCell>
                            
                            
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            data.map((packages) => (
                                // const { email, password } = user;
                                <Table.Row className ="tr" key ={packages._id}>
                                    <Table.Cell>{packages.orderCode}</Table.Cell>
                                    <Table.Cell>{packages.packageType}</Table.Cell>
                                    <Table.Cell>{packages.packageName}</Table.Cell>
                                    <Table.Cell>{packages.qty}</Table.Cell>
                                    <Table.Cell>{packages.driverId}</Table.Cell>
                                    <Table.Cell>{packages.source}</Table.Cell>
                                    <Table.Cell>{packages.destination}</Table.Cell>
                                    <Table.Cell>{packages.status}</Table.Cell>
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

