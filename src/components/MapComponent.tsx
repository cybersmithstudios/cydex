
import React from "react";
import { MapPin } from "lucide-react";

const MapComponent = () => {
  // In a real implementation, we would integrate with a map service like Mapbox
  // For now, we'll create a placeholder that hints at functionality
  return (
    <div className="h-full bg-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+7fb800(3.379,6.5244)/3.379,6.5244,12,0/800x400?access_token=pk.placeholder')] bg-cover bg-center opacity-50"></div>
      
      <div className="relative z-10 text-center p-6 glass">
        <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
        <h3 className="text-lg font-semibold mb-2">Our Location</h3>
        <p className="text-sm">
          To view our interactive map, please connect your Supabase project and add a Mapbox API key
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
