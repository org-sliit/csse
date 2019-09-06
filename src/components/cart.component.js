import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from "react-router-dom";

export default class cart extends Component {

    constructor(props) {
        super(props);

        this.delete        =this.delete.bind(this);
        this.view          =this.view.bind(this);
        this.onChangesearch=this.onChangesearch.bind(this);
        this.onsearchsubmit=this.onsearchsubmit.bind(this);
        this.onorder       =this.onorder.bind(this);
        this.addorder=this.addorder.bind(this);
        this.setqty= this.setqty.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


        this.state = {
            isGoing: true,
            business: [],
            search:'',
            aname: [],
            sqty:'',
            items:[]

        };


    }
    componentDidMount(){
        axios.get('http://localhost:4000/business/cart')
            .then(response => {
                this.setState({
                    business: response.data }

                );
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://localhost:4000/business/deleteitems').then(res=>{

            console.log(res.data)
        })

    }


    delete(e){

        {

            const gid=e.target.id;
            axios.get('http://localhost:4000/business/cartdelete/'+gid)
                .then(console.log('Deleted'))
                .catch(err => console.log(err))

            axios.get('http://localhost:4000/business/cart')
                .then(response => {
                    this.setState({
                        business: response.data }

                    );
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }

   view(e){

        this.push.history.props('/view')

    }


    onChangesearch(e){

        console.log(this.state.search)

        this.setState({

            search:e.target.value
        })

    }

    onsearchsubmit(e){


        axios.get('http://localhost:4000/business/cartsearch/'+this.state.search)
            .then(response => {
                this.setState({
                    business: response.data }

                );
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    handleInputChange(event) {


        alert(event.target.id)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


            this.state.aname.concat(event.target.id)
    }


    onorder(){

        axios.get('http://localhost:4000/business/items')
            .then(response => {

                console.log(response.data)
                this.setState({
                    items: response.data

                },()=>{

                    if(this.state.items==''){

                        alert("haven't selected items !")
                    }

                    else{

                        this.props.history.push('/sendtosenior')
                    }
                }

                )
            })
            .catch(function (error) {
                console.log(error);
            })





        //this.props.history.push('/payment')





    }

    addorder(e){

    //alert(e.target.id)

        e.preventDefault()

        axios.get('http://localhost:4000/business/cartsearch_id/'+e.target.id)
            .then(response => {
                console.log(response.data.pid)
                //alert(this.props.match.params.id)

             const obj1= {

                 pid: response.data.pid,
                 pname: response.data.pname,
                 psprice: response.data.psprice,
                 pqty: response.data.pqty,
                 pcategory: response.data.pcategory,
                 description: response.data.description



             }

                axios.post('http://localhost:4000/business/orderingitems',obj1).then(res=>{

                    console.log(res.data);
                }).catch(err=>{

                    console.log(err);
                })

            })
            .catch(function (error) {
                console.log(error);
            })



    }

    setqty(e){

        /*this.setState({

            sqty:
        })*/

        alert("yuyu")
    }


    render() {
        return (
            <div>
                <h3 align="center">My Cart</h3>

                <div className="form-group">
                    <label>Product Name: </label>
                    <input type="text"
                           className="form-control"
                           value={this.state.search}
                           onChange={this.onChangesearch}
                    />
                </div>

                <td> <button onClick={this.onsearchsubmit} className="btn btn-dark">Search</button></td>

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantities</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.business.map((obj, index) => {

                        return (

                            <tr key={obj._id}>

                                <td>{obj.pid}</td>
                                <td>{obj.pname}</td>
                                <td>{obj.psprice}</td>
                                <td>{obj.description}</td>

                                <td>{obj.pqty}</td>

                                <td> <Link to={"/cartedit/"+obj._id} className="btn btn-primary">Edit</Link></td>
                                <td> <Link to  onClick={this.delete} id={obj._id} className="btn btn-danger">Delete</Link></td>
                                <td> <Link to  onClick={this.addorder}
                                           id={obj._id} className="btn btn-dark">+</Link></td>



                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                    <button onClick={this.onorder} className="btn btn-success btn-lg btn-block">Order</button>



            </div>
        );
    }
}