
import { supabase } from '@/integrations/supabase/client';

export const createSampleUsers = async () => {
  try {
    // Note: These are sample profiles that would be created when users sign up
    // In a real application, users would be created through the authentication flow
    console.log('Sample users should be created through the authentication signup process');
    
    // You can use these as reference for the expected data structure
    const sampleProfiles = [
      {
        name: 'John Customer',
        email: 'customer@example.com',
        role: 'customer',
        status: 'active',
        verified: true,
        carbon_credits: 150
      },
      {
        name: 'Jane Vendor',
        email: 'vendor@example.com', 
        role: 'vendor',
        status: 'active',
        verified: true,
        carbon_credits: 200
      },
      {
        name: 'Mike Rider',
        email: 'rider@example.com',
        role: 'rider', 
        status: 'active',
        verified: true,
        carbon_credits: 120
      },
      {
        name: 'Sarah Admin',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active', 
        verified: true,
        carbon_credits: 300
      }
    ];

    return sampleProfiles;
  } catch (error) {
    console.error('Error in createSampleUsers:', error);
    return [];
  }
};

export const createSampleOrders = async () => {
  try {
    // Get existing users to create orders for them
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, role')
      .limit(10);

    if (!profiles || profiles.length === 0) {
      console.log('No users found. Please create users first through authentication.');
      return [];
    }

    const customers = profiles.filter(p => p.role === 'customer');
    const vendors = profiles.filter(p => p.role === 'vendor');
    const riders = profiles.filter(p => p.role === 'rider');

    if (customers.length === 0) {
      console.log('No customers found. Please create customer users first.');
      return [];
    }

    // Sample orders data
    const sampleOrders = [
      {
        customer_id: customers[0]?.id,
        vendor_id: vendors[0]?.id || null,
        rider_id: riders[0]?.id || null,
        status: 'pending',
        payment_status: 'pending',
        delivery_type: 'standard',
        delivery_address: {
          street: '123 Main St',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          postal_code: '100001'
        },
        subtotal: 2500,
        delivery_fee: 500,
        total_amount: 3000,
        carbon_credits_earned: 15,
        special_instructions: 'Please ring the doorbell twice'
      },
      {
        customer_id: customers[0]?.id,
        vendor_id: vendors[0]?.id || null,
        rider_id: riders[0]?.id || null,
        status: 'delivered',
        payment_status: 'paid',
        delivery_type: 'express',
        delivery_address: {
          street: '456 Oak Ave',
          city: 'Abuja',
          state: 'FCT',
          country: 'Nigeria',
          postal_code: '900001'
        },
        subtotal: 4500,
        delivery_fee: 800,
        total_amount: 5300,
        carbon_credits_earned: 25,
        delivered_at: new Date().toISOString()
      }
    ];

    const { data: orders, error } = await supabase
      .from('orders')
      .insert(sampleOrders)
      .select();

    if (error) {
      console.error('Error creating sample orders:', error);
      return [];
    }

    // Create order items for the orders
    if (orders && orders.length > 0) {
      const sampleOrderItems = [];
      
      for (const order of orders) {
        sampleOrderItems.push(
          {
            order_id: order.id,
            product_name: 'Organic Vegetables Box',
            product_description: 'Fresh organic vegetables from local farms',
            product_category: 'Food',
            quantity: 2,
            unit_price: 1250,
            total_price: 2500,
            is_eco_friendly: true,
            carbon_impact: 5
          },
          {
            order_id: order.id,
            product_name: 'Eco-friendly Cleaning Kit',
            product_description: 'Biodegradable cleaning supplies',
            product_category: 'Household',
            quantity: 1,
            unit_price: 800,
            total_price: 800,
            is_eco_friendly: true,
            carbon_impact: 3
          }
        );
      }

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(sampleOrderItems);

      if (itemsError) {
        console.error('Error creating sample order items:', itemsError);
      }
    }

    return orders || [];
  } catch (error) {
    console.error('Error in createSampleOrders:', error);
    return [];
  }
};
