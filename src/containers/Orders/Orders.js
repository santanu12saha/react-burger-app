import React, { Component } from "react";

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render(){

        let orders = null;

        if(this.state.loading){
            orders = <Spinner />;
        }else{
            orders = this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            ));
        }

        return (
            <div>
               {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);