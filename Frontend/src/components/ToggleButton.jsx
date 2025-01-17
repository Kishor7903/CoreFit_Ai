
const ToggleButton = ({isToggled, setIsToggled}) => {
  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggle}
        className={`relative w-[186px] h-[60px] rounded-lg transition-colors duration-300 bg-blue-900
        }`}
      >
        <span
          className={`absolute top-[6px] left-2 w-[85px] h-12 bg-white rounded shadow-md transform transition-transform duration-300 z-10 ${
            isToggled ? "translate-x-[85px]" : ""
          }`}
        ></span>
        <p className="absolute flex px-6 text-xl bottom-4 justify-between w-48"><span className={`z-20 ${!isToggled ? "text-black font-semibold":""}`}>Menu</span> <span className={`z-20 ${isToggled ? "text-black font-semibold":""}`}>Recipe</span></p>
      </button>
    </div>
  );
};

export default ToggleButton;
