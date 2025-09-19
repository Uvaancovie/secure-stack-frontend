interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export default function Input({ label, className = '', ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-neutral-400">{label}</label>}
      <input
        className={`w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
        {...rest}
      />
    </div>
  )
}
