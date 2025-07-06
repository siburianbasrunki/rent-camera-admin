import { useState, createContext, useContext, type ReactNode } from "react";

type ConfirmationContextType = {
  showConfirmation: (message: string, onConfirm: () => void) => void;
};

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(
    () => {}
  );

  const showConfirmation = (msg: string, onConfirm: () => void) => {
    setMessage(msg);
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirmCallback();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center p-4 z-99999">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">{message}</h3>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Batalkan
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
};