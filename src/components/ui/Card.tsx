interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  )
}
