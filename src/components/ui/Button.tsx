export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700',
  ghost: 'bg-transparent text-neutral-200 hover:bg-neutral-900',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
