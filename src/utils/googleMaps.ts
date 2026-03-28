declare global {
  interface Window {
    google?: any;
  }
}

let googleMapsPromise: Promise<void> | null = null;

export function loadGoogleMaps(apiKey: string) {
  if (window.google?.maps?.places) return Promise.resolve();

  if (!googleMapsPromise) {
    googleMapsPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-google-maps="true"]'
      );

      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("Falha ao carregar Google Maps"))
        );
        return;
      }

      const script = document.createElement("script");
      script.dataset.googleMaps = "true";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=pt-BR`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Falha ao carregar Google Maps"));
      document.head.appendChild(script);
    });
  }

  return googleMapsPromise;
}
