import express, { Router, Request, Response } from 'express'
import { buffer } from 'micro'
import bodyParser from 'body-parser'
const stripe = require('stripe')(process.env.STRIPE_SK)

const router = Router()

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_184996b15dcee447f3b9290557ab7e3c8b34f89a3f2c74cab09fd19689c8d37d'

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
      // Convert req.body to Buffer explicitly

      event = stripe.webhooks.constructEvent(
        await buffer(req),
        sig,
        endpointSecret
      )
      console.log('Received webhook payload:', req)
      res.json()
    } catch (err: any) {
      res.status(400).json({ error: `Webhook Error: ${err.message}` })
      return
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log(paymentIntentSucceeded)
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true })
  }
)

export default router
