import express, { Router } from 'express'
import { buffer } from 'micro'
import Stripe from 'stripe'

console.log('start')
export const config = {
  api: {
    bodyParser: false,
  },
}
const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
  apiVersion: '2023-10-16',
})
const router = Router()

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_184996b15dcee447f3b9290557ab7e3c8b34f89a3f2c74cab09fd19689c8d37d'

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const rawBody = await buffer(req)

    const sig: any = req.headers['stripe-signature']

    let event
    if (endpointSecret) {
      try {
        // Convert req.body to Buffer explicitly

        event = stripe.webhooks.constructEvent(
          rawBody.toString(),
          sig,
          endpointSecret
        )
        console.log('Received webhook payload:', req)
        res.status(200).end()
      } catch (err: any) {
        console.log(`Webhook Error: ${err.message}`)
        res.status(400).json({ error: `Webhook Error: ${err.message}` })
        return
      }
    }
    if (event) {
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
    }

    // Return a 200 response to acknowledge receipt of the event
    // Return a 200 response to acknowledge receipt of the event
    res.end()
  }
)

export default router
