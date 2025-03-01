
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

const MapComponent = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showMapPrompt, setShowMapPrompt] = useState(true);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      setShowMapPrompt(false);
      toast.success("Map token set! In a production app, this would be stored securely.");
      // In a real app, we'd initialize the map here after the token is set
    }
  };

  if (showMapPrompt) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg">
          <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-center mb-4">Interactive Map</h3>
          <p className="text-gray-600 mb-6 text-center">
            To enable the interactive map, you'll need to connect to Supabase and store your Mapbox access token securely.
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter Mapbox public token temporarily"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Set Token Temporarily
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            For a production app, you should store your token securely in your Supabase project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/50 pointer-events-none z-10"></div>
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <iframe 
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=false&access_token=${mapboxToken}&zoomwheel=false#9/6.4698/3.3812`} 
          title="Lagos Map"
          className="w-full h-full border-none"
        ></iframe>
      </div>
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md z-20">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Lagos, Nigeria</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
