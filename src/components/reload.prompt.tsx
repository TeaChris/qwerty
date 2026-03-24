import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';

export const ReloadPrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: unknown) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <AnimatePresence>
      {(offlineReady || needRefresh) && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-4 rounded-xl border border-orange-500/20 bg-black/80 p-4 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <RefreshCw className={`size-5 ${needRefresh ? 'animate-spin' : ''}`} />
          </div>

          <div className="flex-1 text-sm">
            <p className="font-semibold text-white">
              {offlineReady ? 'App Ready Offline' : 'Update Available'}
            </p>
            <p className="text-zinc-400">
              {offlineReady
                ? 'The app is ready to work offline.'
                : 'A new version is available. Click to update.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {needRefresh && (
              <button
                onClick={() => updateServiceWorker(true)}
                className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold whitespace-nowrap text-black transition-transform hover:scale-105 active:scale-95"
              >
                UPDATE
              </button>
            )}
            <button
              onClick={close}
              className="flex size-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
