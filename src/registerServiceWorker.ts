import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload to update?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {},
  onRegistered(registration) {
    console.log("Service Worker registered:", registration);
  },
  onRegisterError(error) {
    console.error("Service Worker registration failed:", error);
  },
  immediate: true, // Register immediately
});

export default updateSW;
