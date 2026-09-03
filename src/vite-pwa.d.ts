declare module 'virtual:pwa-register/react' {
  export function useRegisterSW(options?: {
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
  }): {
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
