type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}: Props) => {
  const baseStyles =
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer duration-200';
  const variantStyles = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary text-white hover:opacity-90',
  };
  const disabledStyles = 'bg-gray-300 text-gray-500 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${
        disabled ? disabledStyles : variantStyles[variant]
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
