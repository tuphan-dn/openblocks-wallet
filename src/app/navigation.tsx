import { Fragment, type ComponentProps, type ElementType } from 'react'
import clsx from 'clsx'

import { Link } from 'react-router-dom'

function Item<T extends ElementType>({
  as: As,
  className,
  active,
  ...props
}: { as: T; active: boolean } & ComponentProps<T>) {
  return (
    <span className="col-span-1 relative group">
      <As
        {...props}
        className={clsx(
          'w-full flex flex-row justify-center font-bold px-2 py-4 transition-all group-hover:text-primary',
          className,
          {
            'text-primary': active,
          },
        )}
      />
      <div
        className={clsx(
          'absolute bottom-0 left-0 h-1 w-full bg-primary rounded-t transition-all group-hover:opacity-100',
          {
            'opacity-100': active,
            'opacity-0': !active,
          },
        )}
      />
    </span>
  )
}

export default function Navigation() {
  return (
    <div className="w-full bg-base-100/50 backdrop-blur px-4 grid grid-cols-4 gap-4">
      <Item as="button">Logo</Item>
      <Item as={Link} to="/token">
        Token
      </Item>
      <Item as={Link} to="/nft">
        NFT
      </Item>
      <Item as={Link} to="/settings">
        Settings
      </Item>
    </div>
  )
}
