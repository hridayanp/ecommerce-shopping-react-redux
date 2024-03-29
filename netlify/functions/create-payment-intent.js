require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "inr",
            // payment_method_types: ["card", "google_pay"],
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    } catch (error) {
        console.log({ error });

        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
}