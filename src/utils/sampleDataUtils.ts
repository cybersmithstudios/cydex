
import { supabase } from '@/integrations/supabase/client';

export const createSampleUsers = async () => {
  try {
    const sampleUsers = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Customer',
        email: 'john.customer@example.com',
        role: 'customer',
        verified: true,
        status: 'active',
        carbon_credits: 150
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Jane Vendor',
        email: 'jane.vendor@example.com',
        role: 'vendor',
        verified: true,
        status: 'active',
        carbon_credits: 200
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Mike Rider',
        email: 'mike.rider@example.com',
        role: 'rider',
        verified: true,
        status: 'active',
        carbon_credits: 100
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Sarah Admin',
        email: 'sarah.admin@example.com',
        role: 'admin',
        verified: true,
        status: 'active',
        carbon_credits: 500
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Bob Customer',
        email: 'bob.customer@example.com',
        role: 'customer',
        verified: false,
        status: 'pending',
        carbon_credits: 50
      }
    ];

    const { data, error } = await supabase
      .from('profiles')
      .upsert(sampleUsers, { onConflict: 'id' });

    if (error) {
      console.error('Error creating sample users:', error);
      return false;
    }

    console.log('Sample users created successfully:', data);
    return true;
  } catch (error) {
    console.error('Error in createSampleUsers:', error);
    return false;
  }
};

export const createSampleOrders = async () => {
  try {
    // First ensure we have users to reference
    const { data: users } = await supabase
      .from('profiles')
      .select('id, role')
      .in('role', ['customer', 'vendor', 'rider']);

    if (!users || users.length === 0) {
      console.log('No users found, creating sample users first...');
      await createSampleUsers();
      
      // Re-fetch users
      const { data: newUsers } = await supabase
        .from('profiles')
        .select('id, role')
        .in('role', ['customer', 'vendor', 'rider']);
      
      if (!newUsers || newUsers.length === 0) {
        console.error('Still no users found after creating sample users');
        return false;
      }
    }

    const customers = users?.filter(u => u.role === 'customer') || [];
    const vendors = users?.filter(u => u.role === 'vendor') || [];
    const riders = users?.filter(u => u.role === 'rider') || [];

    if (customers.length === 0 || vendors.length === 0 || riders.length === 0) {
      console.error('Missing required user types');
      return false;
    }

    const sampleOrders = [
      {
        customer_id: customers[0].id,
        vendor_id: vendors[0]?.id || null,
        rider_id: riders[0]?.id || null,
        order_number: `ORD-${Date.now()}-001`,
        status: 'pending',
        payment_status: 'pending',
        delivery_type: 'standard',
        delivery_address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          postal_code: '10001'
        },
        subtotal: 45.99,
        delivery_fee: 5.99,
        total_amount: 51.98,
        carbon_credits_earned: 5,
        payment_method: 'credit_card',
        special_instructions: 'Leave at front door'
      },
      {
        customer_id: customers[0].id,
        vendor_id: vendors[0]?.id || null,
        rider_id: riders[0]?.id || null,
        order_number: `ORD-${Date.now()}-002`,
        status: 'delivered',
        payment_status: 'paid',
        delivery_type: 'express',
        delivery_address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          postal_code: '90210'
        },
        subtotal: 78.50,
        delivery_fee: 9.99,
        total_amount: 88.49,
        carbon_credits_earned: 8,
        payment_method: 'paypal',
        delivered_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        special_instructions: 'Ring doorbell'
      },
      {
        customer_id: customers[1]?.id || customers[0].id,
        vendor_id: vendors[0]?.id || null,
        rider_id: riders[0]?.id || null,
        order_number: `ORD-${Date.now()}-003`,
        status: 'processing',
        payment_status: 'paid',
        delivery_type: 'standard',
        delivery_address: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          country: 'USA',
          postal_code: '60601'
        },
        subtotal: 32.25,
        delivery_fee: 4.99,
        total_amount: 37.24,
        carbon_credits_earned: 3,
        payment_method: 'credit_card'
      }
    ];

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .insert(sampleOrders)
      .select();

    if (ordersError) {
      console.error('Error creating sample orders:', ordersError);
      return false;
    }

    // Create sample order items for each order
    if (orders && orders.length > 0) {
      const orderItems = [];
      
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        orderItems.push(
          {
            order_id: order.id,
            product_name: `Organic Product ${i + 1}`,
            product_description: `Eco-friendly product description ${i + 1}`,
            product_category: 'organic',
            quantity: Math.floor(Math.random() * 3) + 1,
            unit_price: 15.99 + (i * 5),
            total_price: (15.99 + (i * 5)) * (Math.floor(Math.random() * 3) + 1),
            is_eco_friendly: true,
            carbon_impact: 2.5
          },
          {
            order_id: order.id,
            product_name: `Green Item ${i + 1}`,
            product_description: `Sustainable product ${i + 1}`,
            product_category: 'sustainable',
            quantity: 2,
            unit_price: 12.50,
            total_price: 25.00,
            is_eco_friendly: true,
            carbon_impact: 1.8
          }
        );
      }

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating sample order items:', itemsError);
        return false;
      }
    }

    console.log('Sample orders created successfully:', orders);
    return true;
  } catch (error) {
    console.error('Error in createSampleOrders:', error);
    return false;
  }
};

export const createAllSampleData = async () => {
  try {
    console.log('Creating all sample data...');
    
    const usersCreated = await createSampleUsers();
    if (!usersCreated) {
      console.error('Failed to create sample users');
      return false;
    }

    const ordersCreated = await createSampleOrders();
    if (!ordersCreated) {
      console.error('Failed to create sample orders');
      return false;
    }

    console.log('All sample data created successfully!');
    return true;
  } catch (error) {
    console.error('Error in createAllSampleData:', error);
    return false;
  }
};
