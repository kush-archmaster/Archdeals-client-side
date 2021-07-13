import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';


const PaypalButton = (props) => {

    const onSuccess = (payment) => {
        
                console.log("The payment was succeeded!", payment);
                
                //Processing payment 
                props.paymentSuccess(payment);
    }

    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
       
    }

    const onError = (err) => {
        
        console.log("Error!", err);
       
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'INR'; // or you can set this value from your props or state
    let total = props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
   

    const client = {
        sandbox:    'Abn6MUAE7PYDY_5uQE2n7RJfSv3SExo0QarOHQYNchgluWl3tD8BdSiHPFBRgBn75ItY5DqMIVPFpKBq',
        production: 'EKPBdj_9PtNIJCC6J21neC3nTtajVZCmXrfbqcF_P9_pfrwO9Bv4HdL-NDwWlbdNfQohk29_wHLUpPgM',
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
 
    let style = {
        size: 'small',
        color: 'blue',
        shape: 'rect',
        label: 'checkout',
        tagline: false
    }



        return (
            <PaypalExpressBtn 
            env={env} 
            client={client} 
            currency={currency} 
            total={total} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel}
            style= {style}
            />
            
        );
}

export default PaypalButton;
