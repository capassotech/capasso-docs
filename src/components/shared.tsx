export function SubsectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-[13px] font-bold text-(--gray-700) mt-6 mb-3 pb-2 border-b border-(--gray-200) uppercase tracking-[0.04em] first:mt-0">
      {title}
    </h3>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-[13px] text-(--gray-500) p-4 bg-(--gray-50) border border-dashed border-(--gray-300) rounded-[10px]">
      {message}
    </p>
  )
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <p className="text-[17px] font-bold text-(--gray-900) mb-[18px] tracking-[-0.01em]">
      {title}
    </p>
  )
}
