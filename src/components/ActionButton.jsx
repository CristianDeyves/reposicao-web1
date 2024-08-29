import PropTypes from "prop-types";

function ActionButton({ label, onClick, color }) {
  const baseClasses = "text-white px-4 py-2 rounded hover:bg-opacity-75 mr-2";
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses[color]}`}>
      {label}
    </button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["red", "yellow"]),
};

export default ActionButton;
