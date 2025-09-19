interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
