import React from "react";
import backend_link from "../links";
import { useEffect } from "react";
import { useState } from "react";

function Payment(){

	const [orderList, setOrderList] = useState([]);

	const orderget = async () => {
		try {
		  const data = await fetch(`${backend_link}/users`, {
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			},
			credentials: "include",
		  });
		  const user = await data.json();
		  console.log(user.orders);
		  setOrderList(user.orders);
		} catch (error) {
		  console.log(error);
		}
	  }
	
	  useEffect(() => {
		orderget();
	  }, []);

    return(<>
	<div className="maindiv" style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',width:'100%',height:'100%',marginTop:'40px'}}>
    <h2 style={{color:'#2a88df',marginBottom:'40px'}}>Please review your order details</h2>
	<form method="POST" name="customerData" action="/ccavRequestHandler" >
		<table style={{border:'2px solid #2a88df',width:'350px',textAlign:"center"}}>
			<tr>
				<td><input type="hidden" name="merchant_id" id="merchant_id" value="2571415" /> </td>
			</tr>
			<tr>
				<td><input type="hidden" name="currency" value="INR" /></td>
			</tr>
			<tr>
				<td>Order Id</td>
				<td><input type="text" name="order_id" value={orderList[6]._id} /></td>
			</tr>
			<tr>
				<td>Name</td>
				<td><input type="text" name="customer_name" value={orderList[6].customerDetails.bookingName} /></td>
			</tr>
			<tr>
				<td>Mobile</td>
				<td><input type="text" name="customer_mobile" value={orderList[6].customerDetails.phoneNumber} /></td>
			</tr>
			<tr>
				<td>Amount</td>
				<td><input type="text" name="amount" value="1.00" /></td>
			</tr>
			<tr>
				<td><input type="hidden" name="redirect_url"
					value="https://dotrestros.com/ccavResponseHandler" />
				</td>
			</tr>
			<tr>
				<td><input type="hidden" name="cancel_url"
					value="https://dotrestros.com/ccavResponseHandler" />
				</td>
			</tr>
			<tr>
				<td><input type="hidden" name="language" id="language" value="EN" /></td>
			</tr>
			<tr>
				<td>Billing Name</td>
				<td><input type="hidden" name="billing_name" value="####" /></td>
			</tr>
			<tr>
				<td>Billing Address:</td>
				<td><input type="hidden" name="billing_address"
					value="####" /></td>
			</tr>
			<tr>
				<td>Billing City:</td>
				<td><input type="hidden" name="billing_city" value="####" /></td>
			</tr>
			<tr>
				<td>Billing State:</td>
				<td><input type="hidden" name="billing_state" value="####" /></td>
			</tr>
			<tr>
				<td>Billing Zip:</td>
				<td><input type="hidden" name="billing_zip" value="####" /></td>
			</tr>
			<tr>
				<td>Billing Country:</td>
				<td><input type="hidden" name="billing_country" value="####" />
				</td>
			</tr>
			<tr>
				<td>Billing Tel:</td>
				<td><input type="hidden" name="billing_tel" value="####" />
				</td>
			</tr>
			<tr>
				<td>Billing Email:</td>
				<td><input type="hidden" name="billing_email"
					value="####" /></td>
			</tr>
			<tr>
				<td>Shipping Name</td>
				<td><input type="hidden" name="delivery_name" value="####" />
				</td>
			</tr>
			<tr>
				<td>Shipping Address:</td>
				<td><input type="hidden" name="delivery_address"
					value="####" /></td>
			</tr>
			<tr>
				<td>Shipping City:</td>
				<td><input type="hidden" name="delivery_city" value="####" />
				</td>
			</tr>
			<tr>
				<td>Shipping State:</td>
				<td><input type="hidden" name="delivery_state" value="####" />
				</td>
			</tr>
			<tr>
				<td>Shipping Zip:</td>
				<td><input type="hidden" name="delivery_zip" value="####" /></td>
			</tr>
			<tr>
				<td>Shipping Country:</td>
				<td><input type="hidden" name="delivery_country" value="####" />
				</td>
			</tr>
			<tr>
				<td>Shipping Tel:</td>
				<td><input type="hidden" name="delivery_tel" value="####" />
				</td>
			</tr>
			<tr>
				<td>Merchant Param1</td>
				<td><input type="hidden" name="merchant_param1"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param2</td>
				<td><input type="hidden" name="merchant_param2"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param3</td>
				<td><input type="hidden" name="merchant_param3"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param4</td>
				<td><input type="hidden" name="merchant_param4"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Merchant Param5</td>
				<td><input type="hidden" name="merchant_param5"
					value="additional Info." /></td>
			</tr>
			<tr>
				<td>Promo Code:</td>
				<td><input type="hidden" name="promo_code" value=""/></td>
			</tr>
			<tr>
				<td>Customer Id:</td>
				<td><input type="hidden" name="customer_identifier" value=""/></td>
			</tr>

			<tr>
				<td></td>
				<td><input type="submit" value="Pay now" /></td>
			</tr>
		</table>
	</form>
	<div className="instructions" style={{marginTop:'40px',fontSize:'17px',textAlign:'left',width:'100%',padding:'0px 15px'}}>
		Note:- By paying you agree that you have read below mentioned points and you will take care of all instructions.<br /> <br />
		1. &nbsp;Orders are not subject to change once prepared. If you want to change your order please contact restaurant timely. <br />
		2. &nbsp;We aim to save your time after sitting at the table. In case of table non-availability restaurant can take time to arrange table. <br />
		3. &nbsp;Please be on time so that we can ensure best services for you. Delays in time of arrival can cause difficutlies in providing best services. <br />
		4. &nbsp;Please keep restaurant updated with your real time of arrival in order to enjoy best services. <br />
		5. &nbsp;Try to avoid food wastage caused by late cancellation of order.
	</div>
	<h3 style={{color:'#2a88df',marginTop:'40px',textAlign:'center'}}>Thank You very much For Ordering!<br />Enjoy Your Dawat!</h3>
	</div>
    </>)
};

export default Payment;