"use client";

import { useEffect, useRef } from 'react';

interface OpenTableWidgetProps {
  restaurantId?: string;
  theme?: 'standard' | 'minimal';
  color?: '1' | '2' | '3';
  dark?: boolean;
  lang?: string;
}

/**
 * OpenTable Reservation Widget Component
 * 
 * Embeds OpenTable's reservation widget on your website.
 * Get your restaurant ID from your OpenTable account.
 * 
 * Usage:
 * <OpenTableWidget restaurantId="12345" />
 */
export default function OpenTableWidget({
  restaurantId,
  theme = 'standard',
  color = '1',
  dark = false,
  lang = 'en',
}: OpenTableWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Use restaurant ID from props or environment variable
    const rid = restaurantId || process.env.NEXT_PUBLIC_OPENTABLE_RESTAURANT_ID;
    
    if (!rid || scriptLoadedRef.current) {
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://www.opentable.com/widget/reservation/loader?rid=${rid}&type=${theme}&theme=${theme}&color=${color}&dark=${dark}&lang=${lang}&overlay=false&domain=com`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
    };

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [restaurantId, theme, color, dark, lang]);

  if (!restaurantId && !process.env.NEXT_PUBLIC_OPENTABLE_RESTAURANT_ID) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          OpenTable widget not configured. Please provide a restaurant ID.
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[400px] flex items-center justify-center"
      id="opentable-widget-container"
    />
  );
}

