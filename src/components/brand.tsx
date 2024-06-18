import clsx from 'clsx'

import icon from 'data-url:@/icon.png'

export type BrandProps = {
  width?: string
  height?: string
}

export default function Brand({
  width = 'w-auto',
  height = 'h-6',
}: BrandProps) {
  return (
    <a className="flex flex-row gap-2 items-center text-primary" href="/">
      <img
        className={clsx('block dark:hidden', {
          [width]: width,
          [height]: height,
        })}
        src={icon}
        alt="light-brand"
      />
      <img
        className={clsx('hidden dark:block', {
          [width]: width,
          [height]: height,
        })}
        src={icon}
        alt="dark-brand"
      />
    </a>
  )
}

export type SmallBrandProps = {
  width?: string
  height?: string
}

export function SmallBrand({
  width = 'w-auto',
  height = 'h-4',
}: SmallBrandProps) {
  return (
    <a className="flex flex-row gap-2 items-center text-primary" href="/">
      <img
        className={clsx('block dark:hidden', {
          [width]: width,
          [height]: height,
        })}
        src={icon}
        alt="logo"
      />
      <img
        className={clsx('hidden dark:block', {
          [width]: width,
          [height]: height,
        })}
        src={icon}
        alt="logo"
      />
    </a>
  )
}
