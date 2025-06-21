
## 🧪 Testing Stripe Orders and Webhooks in Development

During local development, Stripe **cannot directly reach `localhost`** to send webhook events (e.g., `checkout.session.completed`). To simulate real webhook calls, use the Stripe CLI to tunnel events to your local server.

### ✅ 1. Prerequisites

- Node.js + Express server running locally on `http://localhost:5050`
- Stripe CLI installed: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
- `.env` file includes:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...    # Filled in during step 3
CLIENT_URL=http://localhost:5173   # Or your frontend dev URL
```

---

### ▶️ 2. Start the Backend Server

From the `server/` folder:

```bash
npm run dev
```

Ensure your webhook route is mounted **before `express.json()`**:
```js
app.use('/webhook', express.raw({ type: 'application/json' }), webhookRoutes);
```

---

### ⚡ 3. Open a New Terminal and Start Stripe CLI Listener

```bash
stripe listen --forward-to localhost:5050/webhook
```

- You'll see output like:
  ```
  Ready! Your webhook signing secret is: whsec_xxxxxxxx
  ```

- Copy this value into your `.env` as:
  ```env
  STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxx
  ```

- Restart the backend server after updating `.env`.

---

### 🧪 4. Test the Full Checkout Flow

1. Start the frontend (`npm run dev` from `/client`)
2. Add products to your cart
3. Proceed to checkout
4. Enter a test email and name
5. Choose a pickup time and location
6. Click **“Pay Now”** – this redirects to Stripe Checkout

Use any of [Stripe's test card numbers](https://stripe.com/docs/testing#international-cards), such as:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: 123
ZIP: 12345
```

---

### 🧾 5. What Happens Next

- Stripe completes the payment
- Sends `checkout.session.completed` to the webhook via the CLI tunnel
- Your server:
  - Creates and saves the order in MongoDB
  - Sends email confirmations to customer and admin
  - Redirects the frontend to `/confirmation?session_id=...`
  - Clears the cart context in the frontend

You should see log output like:

```
⚡ Webhook received
✅ Payment succeeded: cs_test_...
🧾 Parsed cartItems from metadata: [...]
📝 Order saved to MongoDB: 665f7c3d...
📧 Confirmation email sent to customer
📧 Admin notification sent
```

---

### 🧼 6. Troubleshooting

| Problem | Fix |
|--------|------|
| Stripe webhook not received | Ensure `stripe listen` is running |
| Webhook returns 400 | Check `.env` for correct `STRIPE_WEBHOOK_SECRET` |
| Order not found on confirmation page | Confirm webhook saved the order and `/api/orders/session/:id` is routed properly |
| Emails not sent | Verify `sendOrderConfirmationEmail()` is triggered and no SMTP or Resend errors are logged |

---

### 🌐 7. When Moving to Production

In production:
- **Do NOT use `stripe listen`** – Stripe can reach your public webhook URL
- **Register your live webhook** in the Stripe Dashboard:
  1. Go to **Developers → Webhooks**
  2. Add endpoint: `https://yourdomain.com/webhook`
  3. Select event: `checkout.session.completed`
  4. Copy the signing secret (`whsec_...`) into `.env`
