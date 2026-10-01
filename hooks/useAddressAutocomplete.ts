'use client';

import { useEffect, useRef, useState } from 'react';

export interface DireccionData {
  text: string;
  lat?: number;
  lng?: number;
  placeId?: string;
  formatted?: string;
}

declare global {
  interface Window {
    google?: { maps?: { places?: unknown } };
    initLazosMapsAutocomplete?: () => void;
  }
}

const MAPS_API_KEY = 'AIzaSyB1XetSTO0NWa9ZveSHwwr2AaGpbyE4ATs';

function cargarScriptMaps() {
  if (document.querySelector('script[data-maps]')) return;
  const s = document.createElement('script');
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&language=es&region=AR&callback=initLazosMapsAutocomplete`;
  s.async = true;
  s.defer = true;
  s.setAttribute('data-maps', '1');
  document.body.appendChild(s);
}

// Autocompletado de direcciones con Google Places, reutilizable en cualquier
// formulario (registro, checkout, etc). `active` indica si el input al que
// se va a atar ya esta montado en el DOM.
export function useAddressAutocomplete(active: boolean) {
  const [mapsReady, setMapsReady] = useState(false);
  const [direccionData, setDireccionData] = useState<DireccionData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    cargarScriptMaps();
  }, []);

  useEffect(() => {
    const init = () => {
      if (!window.google?.maps) return;
      setMapsReady(true);
      if (!inputRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ac = new (window.google.maps as any).places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'ar' },
        fields: ['formatted_address', 'geometry', 'place_id'],
        types: ['address'],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bounds: new (window.google.maps as any).LatLngBounds(
          { lat: -33.0, lng: -65.5 },
          { lat: -29.5, lng: -62.5 }
        ),
        strictBounds: false,
      });

      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place.geometry) return;
        const data: DireccionData = {
          text: place.formatted_address || inputRef.current?.value || '',
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,
          formatted: place.formatted_address,
        };
        setDireccionData(data);
        if (inputRef.current) inputRef.current.value = data.text;
      });
    };

    if (window.google?.maps) {
      init();
    } else {
      window.initLazosMapsAutocomplete = init;
    }
  }, [active]);

  return { inputRef, mapsReady, direccionData, setDireccionData };
}
