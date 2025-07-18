# Paystack Integration Guide

This document provides a comprehensive guide to the Paystack payment integration in the Cydex application.

## Table of Contents
- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

## Overview
The Paystack integration allows Cydex to process payments securely through Paystack's payment gateway. The implementation supports both test and production environments with proper error handling and logging.

## Setup Instructions

### Prerequisites
- A Paystack account (sign up at [paystack.com](https://paystack.com))
- Node.js and npm installed
- Cydex application set up

### Environment Variables
Create a `.env.local` file in your project root and add the following variables:

```env
# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=your_public_key_here
VITE_PAYSTACK_SECRET_KEY=your_secret_key_here
VITE_PAYSTACK_WEBHOOK_SECRET=your_webhook_secret_here
VITE_PAYSTACK_API_URL=https://api.paystack.co

# Environment
VITE_NODE_ENV=development # or 'production' for live environment
```

## Configuration

### Test Mode
In development/test environment, the application uses Paystack's test mode. You can use the following test card details:

- **Card Number**: 4084 0840 8408 4081
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: 123456 (when prompted)

### Production Mode
When deploying to production:
1. Replace test keys with live keys from Paystack dashboard
2. Set `VITE_NODE_ENV=production`
3. Configure webhook endpoints (see Webhook Setup below)

## Usage

### Payment Flow
1. User selects items and proceeds to checkout
2. System creates an order with status 'pending'
3. Payment modal opens with order details
4. User completes payment via Paystack
5. System verifies payment and updates order status

### Code Example
```typescript
// Example of using the PaymentModal component
<PaymentModal
  isOpen={isPaymentModalOpen}
  onClose={() => setIsPaymentModalOpen(false)}
  amount={orderTotal}
  onSuccess={(reference) => handlePaymentSuccess(reference)}
  onError={(error) => handlePaymentError(error)}
  orderNumber={orderNumber}
  customerEmail={userEmail}
  customerId={userId}
  metadata={{
    order_id: orderId,
    // Additional metadata as needed
  }}
/>
```

## Webhook Setup
For production, set up webhook endpoints to receive payment notifications:

1. Go to Paystack Dashboard > Settings > API Keys & Webhooks
2. Add your webhook URL (e.g., `https://yourdomain.com/api/webhooks/paystack`)
3. Set up the webhook handler in your backend to process events

## Testing

### Test Cards
- **Successful Payment**: 4084 0840 8408 4081
- **Failed Payment**: 4084 0840 8408 4099
- **3DS Authentication**: 4084 0840 8408 4081 (will prompt for OTP)

### Test Webhooks
Use Paystack's test webhook tool to simulate events:
1. Go to Paystack Dashboard > Settings > Webhooks
2. Click "Send Test Webhook"
3. Select an event type and send

## Troubleshooting

### Common Issues

#### Payment Fails Immediately
- Check browser console for errors
- Verify API keys are correct
- Ensure amount is in kobo (smallest currency unit)

#### Webhook Not Received
- Check server logs for incoming requests
- Verify webhook URL is accessible from the internet
- Ensure webhook secret matches

#### Payment Verification Fails
- Check network connectivity
- Verify payment reference exists in Paystack
- Ensure server time is synchronized

## Security Considerations

### API Keys
- Never commit secret keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly

### Webhook Security
- Verify webhook signatures
- Validate all incoming data
- Implement idempotency checks

### PCI Compliance
- Never store full card details
- Use Paystack's tokenization for card storage
- Follow OWASP security guidelines

## Support
For additional help, contact:
- Paystack Support: support@paystack.com
- Cydex Development Team: dev@cydex.com
