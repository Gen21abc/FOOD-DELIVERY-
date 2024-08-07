import React, { useContext,  useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
      const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

      const [data,setData] = useState({
         firstName: "",
         lastName: "",
         email: "",
         street: "",
         city: "",
         state: "",
         zip: "",
         country: "",
         phone: ""
      })

      const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
      }

      const placeOrder = async (event) => {
         event.preventDefault();
         let orderItems = [];
         food_list.map((item)=>{
          if (cartItems[item._id]>0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo);
          }
         })
         let orderData = {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount()+2,
         }
         let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
         if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url);
         } else {
            alert("Error");
         }
      }

  return (
    <form onSubmit={placeOrder} className='place-order'>
    <div className="place-order-left">
    <p className="title">Delivery Information</p>
    <div className="multi-fields">
      <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
      <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
    </div>
    <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
    <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
    <div className="multi-fields">
      <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
      <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
    </div>
    <div className="multi-fields">
      <input required name="zip" onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code' />
      <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
    </div>
    <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
    </div>
    <div className="place-order-right">
    <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
               <p>Delivery Fee</p>
               <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit"  >PROCEED TO PAYMENT</button>
        </div>
    </div>
    </div>
    </form>
  )
}

export default PlaceOrder

/*import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      let response = await axios.post(url+"/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: Unable to place order.");
      }
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name="zip" onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'PROCEED TO PAYMENT'}</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;*/
/*import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ orderData, setLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { data: clientSecret } = await axios.post('/api/payment_intent', orderData);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: orderData.address.firstName + ' ' + orderData.address.lastName,
          email: orderData.address.email,
          address: {
            line1: orderData.address.street,
            city: orderData.address.city,
            state: orderData.address.state,
            postal_code: orderData.address.zip,
            country: orderData.address.country,
          },
        },
      },
    });

    if (result.error) {
      alert(`Payment failed: ${result.error.message}`);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        window.location.replace('/order-confirmation');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    setOrderData(orderData);
  };

  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name="zip" onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code' />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'PROCEED TO PAYMENT'}</button>
            </div>
          </div>
        </div>
      </form>
      {orderData && <CheckoutForm orderData={orderData} setLoading={setLoading} />}
    </Elements>
  );
};

export default PlaceOrder;*/

