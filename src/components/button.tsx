interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
    >
      {label}
    </button>
  );
};

export default Button;
