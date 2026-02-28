"use client";
import { useEffect } from "react";

export default function TelegramContactPrompt({
  onContactReceived,
}: {
  onContactReceived: (phone: string) => void;
}) {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tg) return;

    tg.MainButton.setText("Share Contact");
    tg.MainButton.show();

    const handler = () => {
      const phone = tg.initDataUnsafe?.user?.phone_number;
      if (phone) {
        onContactReceived(phone);
        tg.MainButton.hide();
      } else {
        alert("Please allow sharing your phone number");
      }
    };

    tg.MainButton.onClick(handler);

    return () => tg.MainButton.offClick(handler);
  }, [onContactReceived]);

  return null; // Telegram MainButton renders natively
}
