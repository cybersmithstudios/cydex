
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
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
          <path fill="#fff"
            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
          <path fill="#fff"
            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path>
          <path fill="#cfd8dc"
            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path>
          <path fill="#40c351"
            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
          <path fill="#fff" fill-rule="evenodd"
            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
            clip-rule="evenodd"></path>
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
