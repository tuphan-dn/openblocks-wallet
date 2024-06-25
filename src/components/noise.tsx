import clsx from 'clsx'

export type NoiseProps = {
  className?: string
}

export default function Noise({ className }: NoiseProps) {
  return (
    <div
      className={clsx(
        'absolute top-0 left-0 w-full h-full bg-noise bg-repeat pointer-events-none animate-noise',
        className,
      )}
    />
  )
}
