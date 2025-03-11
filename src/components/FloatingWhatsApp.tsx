
import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  accountName: string;
  avatar: string;
  statusMessage: string;
  chatMessage: string;
  placeholder: string;
  darkMode?: boolean;
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
  darkMode = false,
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
          className={`mb-4 w-72 overflow-hidden rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
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
          <div className={`h-64 overflow-y-auto p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div
              className={`mb-2 max-w-[80%] rounded-lg p-3 ${
                darkMode ? 'bg-gray-600' : 'bg-white'
              } shadow`}
            >
              {chatMessage}
            </div>
          </div>
          <div className="flex border-t p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className={`flex-1 rounded px-3 py-2 focus:outline-none ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
              }`}
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
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
          <path
            d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-.143-.175-.143-.1 0-.22.03-.3.096-.630.645-1.176 1.792-1.176 3.158 0 .517.1 1.003.288 1.45.344.9.947 1.597 1.667 2.203 1.176.987 2.438 1.59 3.9 1.59.358 0 .73-.046 1.088-.12.716-.174 1.313-.646 1.608-1.202.13-.256.22-.503.22-.76 0-.33-.99-.989-.99-1.447 0-.143-.73-.143-.175-.143zm0-4.86c-.13-.286-.13-.573-.13-.859 0-2.06 1.832-3.866 3.898-3.866.358 0 .716.045 1.031.12 1.203.29 2.12 1.2 2.535 2.432.13.345.192.703.192 1.06 0 2.061-1.83 3.866-3.898 3.866-.286 0-.587-.046-.873-.12-.16-.04-.33-.1-.474-.175-.2-.114-.33-.244-.504-.387 0 .143-.43.273-.186.315l-2.52.658c-.058 0-.88.143-.088.286 0 .086.088.173.19.23l.36.215c.16.114.316.215.503.33 2.408 1.578 5.7 1.146 7.757-.86.888-.86 1.577-1.976 1.835-3.184.043-.23.085-.459.085-.689 0-1.776-1.033-3.525-2.593-4.36-.47-.244-1.02-.474-1.547-.56-.3-.044-.602-.074-.917-.074-3.156 0-5.705 2.663-5.705 5.825 0 .76.128 1.547.388 2.264l.1.215c.06.157.146.286.2.458l.17.015c.24.245.12.03.03.075.03.072.063.145.063.26-.013.08-.11.114-.11.144 0 .075-.017.145-.012.22l-.07.23-2.535.66c-.07 0-.132.15-.147.044-.03.03-.06.06-.06.1 0 .058.06.116.13.175l.32.186c.14.086.29.156.445.26a10.5 10.5 0 0 0 5.663 1.606c3.956 0 7.5-2.491 8.781-6.23.144-.402.23-.847.287-1.276.03-.2.043-.415.043-.63 0-2.778-1.575-5.354-4.069-6.644-.402-.216-.874-.402-1.318-.488-.13-.028-.274-.044-.416-.06a8.158 8.158 0 0 0-.974-.043c-4.386 0-7.987 3.693-7.987 8.193 0 .888.146 1.776.46 2.608.1.287.26.602.375.888"
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
