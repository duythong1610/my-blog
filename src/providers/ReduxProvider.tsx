"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, persistor } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import locale tiếng Việt

dayjs.extend(relativeTime);
dayjs.locale("vi"); // Th

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
