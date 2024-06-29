import { FC, useEffect, useState } from "react";
import Button from "./form/form-button/FormButton";

type PopupProps = {
  message: string | null;
  onClose: () => void;
  label1?: string;
  link1?: string;
  label2?: string;
  link2?: string;
};

const Popup: FC<PopupProps> = ({
  message,
  onClose,
  label1,
  link1,
  label2,
  link2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let showButton = false;
  if (message === "You haven't answered the questions.") showButton = true;

  useEffect(() => {
    // Trigger the visibility state after the component has mounted
    setTimeout(() => setIsVisible(true), 10); // Small delay to ensure mounting transition
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Delay to match the transition duration
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-brand-purple-dark rounded-xl shadow-lg p-4 w-2/3 lg:w-[4/5] h-1/3 lg:h-[90%] max-w-xl max-h-80 overflow-auto flex flex-col transform transition-all duration-300 ${
          isVisible
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-90 -translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-white bg-transparent hover:bg-gray-500 rounded transition w-5"
          >
            &#10005;
          </button>
        </div>
        <div className="h-full flex flex-col justify-evenly">
          <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white font-robotoRegular text-center">
            {message}
          </h2>
          {showButton && label1 && (
            <div className="w-2/3 flex flex-col self-center gap-y-2 lg:gap-y-0">
              <Button type="button" label={label1} link={link1} />
              {label2 && <Button type="button" label={label2} link={link2} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
