type Props = {
  type: 'text' | 'email';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  type,
  placeholder = '',
  value,
  onChange,
  className = '',
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-primary outline-primary w-full rounded-lg border p-2 text-sm ${className}`}
    />
  );
};

export default Input;
