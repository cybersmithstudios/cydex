
import React from 'react';

interface TrackingStep {
  id: number;
  title: string;
  completed: boolean;
  time: string | null;
}

interface OrderTrackingTimelineProps {
  steps: TrackingStep[];
  eta?: string;
  status: string;
}

const OrderTrackingTimeline = ({ steps, eta, status }: OrderTrackingTimelineProps) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium mb-4">Order Tracking</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
        {steps.map((step, index) => (
          <div key={step.id} className="flex mb-6 relative">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 ${
              step.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}>
              {step.completed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="ml-4">
              <p className="font-medium">{step.title}</p>
              {step.time && <p className="text-sm text-gray-500">{step.time}</p>}
            </div>
          </div>
        ))}
      </div>
      
      {status === 'in-transit' && eta && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Estimated Time of Arrival</p>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span className="font-medium">{eta}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingTimeline;
