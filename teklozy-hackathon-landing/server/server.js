import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'node:crypto';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: process.env.APP_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

const required = ['RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET'];
const configured = required.every(k => process.env[k]);
const razorpay = configured ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}) : null;

app.get('/api/health', (_req,res) => res.json({ ok:true, paymentsConfigured:Boolean(razorpay) }));

app.post('/api/create-order', async (req,res) => {
  try {
    if (!razorpay) return res.status(503).json({ error:'Razorpay is not configured on the server.' });
    const amount = Number(process.env.REGISTRATION_FEE_PAISE || 0);
    if (!Number.isInteger(amount) || amount <= 0) return res.status(400).json({ error:'A valid registration fee is not configured.' });
    const order = await razorpay.orders.create({
      amount, currency:'INR',
      receipt: String(req.body.receipt || `teklozy_${Date.now()}`).slice(0,40),
      notes: { product:'Teklozy Hackathon 2026' }
    });
    res.json({ id:order.id, amount:order.amount, currency:order.currency });
  } catch (err) {
    res.status(500).json({ error:'Unable to create payment order.' });
  }
});

app.post('/api/verify-payment', async (req,res) => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) return res.status(503).json({ error:'Payment verification is not configured.' });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return res.status(400).json({ error:'Missing payment verification fields.' });
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a,b)) return res.status(400).json({ error:'Invalid payment signature.' });

    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id)
    ]);
    const configuredAmount = Number(process.env.REGISTRATION_FEE_PAISE || 0);
    if (!Number.isInteger(configuredAmount) || configuredAmount <= 0 ||
        Number(order.amount) !== configuredAmount ||
        payment.order_id !== order.id ||
        !['captured','authorized'].includes(payment.status)) {
      return res.status(400).json({ error:'Payment details do not match the configured registration fee.' });
    }

    // TODO: Persist the verified registration, order and payment in Supabase before production.
    res.json({ verified:true, payment_id:razorpay_payment_id, order_id:razorpay_order_id });
  } catch {
    res.status(500).json({ error:'Payment verification failed.' });
  }
});

const port = Number(process.env.API_PORT || 4242);
app.listen(port, () => console.log(`Teklozy payment API listening on http://localhost:${port}`));
