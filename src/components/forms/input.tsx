interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-foreground mb-3 block text-base font-medium tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`bg-grey focus:ring-muted-dark/20 focus-visible:border-grey! w-full rounded-xl border-none px-4 py-3 transition-all focus:border-transparent focus:ring-2 ${className}`}
        {...props}
      />
    </div>
  );
}
