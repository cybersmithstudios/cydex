# Paystack Integration Guide for Cydex

This document outlines the Paystack payment integration implemented in the Cydex eco-friendly delivery platform.

## Overview

Cydex integrates with Paystack to process secure payments for delivery orders. The integration supports both test and production environments with comprehensive error handling and logging.

## Configuration

### Test Credentials (Currently Active)
- **Public Key**: `pk_test_b11301f99f310c1a5002e66379e5eaa5906b7e63`
- **Secret Key**: `sk_test_e2c8097133b859e014e2dff1c15c5c6fb82e6ef8`

### Production Setup (For Future Use)
When ready for production:
1. Replace test keys with live keys from Paystack dashboard
2. Update `IS_PRODUCTION` flag in configuration
3. Configure webhook endpoints for payment verification

## Implementation Details

### Frontend Integration

#### PaymentModal Component
Located at: `src/components/customer/PaymentModal.tsx`

The main payment component that:
- Initializes Paystack payment popup
- Handles payment success/failure callbacks
- Logs payment events for debugging
- Displays payment details to customers

Key features:
- Amount conversion to kobo (Paystack's smallest unit)
- Custom metadata for order tracking
- Test mode indicators
- Secure payment processing

#### Usage Example
```tsx
<PaymentModal
  isOpen={isPaymentModalOpen}
  onClose={() => setIsPaymentModalOpen(false)}
  amount={orderTotal}
  orderNumber={order.orderNumber}
  onSuccess={handlePaymentSuccess}
  onError={handlePaymentError}
/>
```

### Payment Flow

1. **Order Creation**: Customer creates order with items
2. **Payment Initiation**: PaymentModal opens with order details
3. **Paystack Processing**: User enters payment details in Paystack popup
4. **Payment Verification**: Transaction is verified (client-side for now)
5. **Order Update**: Order status updated based on payment result

### Test Cards

For testing payments in development:

#### Successful Payment
- **Card Number**: 4084 0840 8408 4081
- **Expiry**: 12/25
- **CVV**: 408

#### Failed Payment
- **Card Number**: 4084 0840 8408 4099
- **Expiry**: 12/25
- **CVV**: 408

## Features Implemented

### ✅ Current Features
- [x] Secure payment processing with Paystack
- [x] Test mode integration
- [x] Payment success/failure handling
- [x] Order metadata tracking
- [x] Client-side payment logging
- [x] Mobile-responsive payment modal
- [x] Currency formatting for Nigerian Naira
- [x] Payment amount validation

### 🚧 Planned Features
- [ ] Webhook verification for backend payment confirmation
- [ ] Payment retry mechanism
- [ ] Refund processing
- [ ] Payment method saving
- [ ] Subscription payments for premium features
- [ ] Multi-currency support
- [ ] Payment analytics dashboard

## Security Considerations

### Current Implementation
- Public key used for frontend payments
- Client-side payment verification
- HTTPS required for all payment transactions
- Payment data logging for debugging

### Production Recommendations
- Implement server-side webhook verification
- Use environment variables for sensitive keys
- Add payment fraud detection
- Implement proper error handling and retry logic
- Set up monitoring for failed payments

## Configuration Files

### Main Configuration
- `src/components/customer/PaymentModal.tsx` - Primary payment component
- Payment service files (to be created for advanced features)

### Environment Variables (Recommended)
```env
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key
PAYSTACK_SECRET_KEY=sk_live_your_live_secret_key (backend only)
VITE_PAYSTACK_WEBHOOK_SECRET=your_webhook_secret
```

## Testing

### Manual Testing
1. Navigate to order checkout
2. Click "Pay Now" button
3. Use test card details provided above
4. Verify payment success/failure handling

### Test Scenarios
- ✅ Successful payment with valid test card
- ✅ Failed payment with invalid test card
- ✅ Payment cancellation by user
- ✅ Network failure during payment
- ✅ Invalid payment amounts

## Troubleshooting

### Common Issues

#### Payment Modal Not Opening
- Check if user is authenticated
- Verify order amount is valid (> 0)
- Check console for JavaScript errors

#### Payment Fails Immediately
- Verify public key is correct
- Check network connectivity
- Ensure amount is in valid range

#### Order Status Not Updating
- Check payment success callback
- Verify database connection
- Check order update logic

### Debug Information
Payment events are logged to browser console with:
- Payment reference
- Amount and currency
- Customer email
- Order number
- Timestamp

## Support and Documentation

### Paystack Resources
- [Paystack Documentation](https://paystack.com/docs/)
- [React Paystack Library](https://github.com/iamraphson/react-paystack)
- [Paystack Test Cards](https://paystack.com/docs/payments/test-payments/)

### Cydex Contact
For integration issues specific to Cydex:
- Check application logs
- Review payment modal implementation
- Verify order creation flow

## Migration to Production

When ready for live payments:

1. **Obtain Live Keys**
   - Log into Paystack dashboard
   - Navigate to Settings > API Keys
   - Copy live public and secret keys

2. **Update Configuration**
   - Replace test keys with live keys
   - Set `IS_PRODUCTION = true`
   - Configure production webhook URL

3. **Security Review**
   - Move secret key to backend
   - Implement webhook verification
   - Add payment monitoring

4. **Testing**
   - Test with small live amounts
   - Verify webhook functionality
   - Check order fulfillment process

## Changelog

### v1.0.0 (Current)
- Initial Paystack integration
- Test mode implementation
- Basic payment flow
- Payment modal UI
- Order integration

### Future Versions
- v1.1.0: Webhook implementation
- v1.2.0: Advanced payment features
- v1.3.0: Payment analytics
- v2.0.0: Multi-payment gateway support 