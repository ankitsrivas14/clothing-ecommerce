//REACT
import { useState } from 'react';

//REDUX
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

//STRIPE
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

//COMPONENTS
import { BUTTON_TYPES_CLASSES } from '../button/Button';

//CSS
import { PaymentFormContainer, FormContainer, PaymentButton } from './PaymentForm.styles'

function PaymentForm() {

    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async(e) => {
        e.preventDefault();
        if(!stripe || !elements) return

        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount*100,
            })
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                    address: 'Test Address',
                }
            },
        })
        setIsProcessingPayment(false);
        if(paymentResult.error){
            console.log(paymentResult.error);
            alert('Failed')
        }
        else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful')
            }
        }

    }
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton buttonType={BUTTON_TYPES_CLASSES.inverted} isLoading={isProcessingPayment}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm