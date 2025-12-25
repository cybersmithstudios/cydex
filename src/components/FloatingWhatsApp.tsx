import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  accountName: string;
  avatar: string;
  statusMessage: string;
  chatMessage: string;
  placeholder: string;
  allowClickAway?: boolean;
  allowEsc?: boolean;
  notification?: boolean;
  notificationLoop?: number;
  notificationDelay?: number;
  notificationSound?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  chatboxStyle?: React.CSSProperties;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber,
  accountName,
  avatar,
  statusMessage,
  chatMessage,
  placeholder,
  allowClickAway = false,
  allowEsc = false,
  notification = false,
  notificationLoop = 0,
  notificationDelay = 60,
  notificationSound = false,
  style,
  buttonStyle,
  chatboxStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [loop, setLoop] = useState(0);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const notificationTimeout = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (notification && !isOpen) {
      startNotification();
    }

    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, [isOpen, notification]);

  useEffect(() => {
    if (allowEsc) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [allowEsc]);

  useEffect(() => {
    if (allowClickAway) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          whatsappRef.current &&
          !whatsappRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [allowClickAway, isOpen]);

  const startNotification = () => {
    if (loop < notificationLoop || notificationLoop === 0) {
      setShowNotification(true);
      if (notificationSound) {
        soundRef.current?.play().catch(e => console.error('Could not play notification sound:', e));
      }

      notificationTimeout.current = setTimeout(() => {
        setShowNotification(false);
        setLoop(prevLoop => prevLoop + 1);

        notificationTimeout.current = setTimeout(() => {
          if (!isOpen) {
            startNotification();
          }
        }, 2000);
      }, notificationDelay * 1000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowNotification(false);
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      ref={whatsappRef}
      className="fixed bottom-4 right-4 z-[999] flex flex-col items-end"
      style={style}
    >
      {isOpen && (
        <div
          className="mb-4 w-72 overflow-hidden rounded-lg shadow-lg bg-card text-card-foreground"
          style={chatboxStyle}
        >
          <div className="bg-[#21CA1B] px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                  <img src={avatar} alt={accountName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-medium">{accountName}</div>
                  <div className="text-xs">{statusMessage}</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-80">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-muted">
            <div
              className="mb-2 max-w-[80%] rounded-lg p-3 bg-background shadow"
            >
              {chatMessage}
            </div>
          </div>
          <div className="flex border-t border-border p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="flex-1 rounded px-3 py-2 focus:outline-none bg-muted text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              className="ml-2 rounded bg-[#21CA1B] p-2 text-white hover:bg-[#1cb318]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleOpen}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#21CA1B] text-white shadow-lg hover:bg-[#1cb318]"
        style={buttonStyle}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-current"
          style={{ marginTop: -2 }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.504 7.504A11.875 11.875 0 0016.05 4C9.465 4 4.1 9.36 4.1 15.945a11.882 11.882 0 001.594 5.973L4 28.109l6.336-1.664a11.958 11.958 0 005.71 1.457h.004c6.585 0 11.946-5.359 11.949-11.949 0-3.191-1.242-6.195-3.496-8.449zm-8.453 18.381h-.004a9.94 9.94 0 01-5.066-1.387l-.363-.215-3.762.988.996-3.649-.238-.379a9.904 9.904 0 01-1.516-5.297c0-5.476 4.458-9.93 9.942-9.93 2.652 0 5.145 1.035 7.02 2.914a9.875 9.875 0 012.91 7.016c-.004 5.476-4.461 9.938-9.918 9.938zm5.442-7.442c-.297-.148-1.766-.87-2.039-.97-.273-.098-.473-.148-.672.148-.2.297-.77.97-.945 1.168-.172.199-.348.223-.645.074-.297-.148-1.254-.461-2.39-1.472-.883-.785-1.48-1.758-1.652-2.055-.172-.297-.02-.457.13-.605.133-.133.297-.347.445-.52.149-.174.2-.298.297-.496.098-.199.05-.371-.024-.52-.074-.148-.672-1.62-.922-2.215-.242-.582-.488-.504-.672-.504-.172 0-.371-.023-.57-.023-.2 0-.523.074-.797.371-.273.297-1.043 1.02-1.043 2.488 0 1.469 1.07 2.89 1.219 3.086.148.199 2.094 3.196 5.074 4.481.71.305 1.262.489 1.695.629.711.226 1.36.195 1.871.118.57-.086 1.766-.722 2.016-1.422.246-.695.246-1.293.172-1.418-.074-.125-.273-.2-.57-.348z"
          />
        </svg>

        {showNotification && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            1
          </span>
        )}
      </button>

      {notificationSound && (
        <audio ref={soundRef} className="hidden">
          <source src="/notification.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
