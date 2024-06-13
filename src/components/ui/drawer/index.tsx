import DefaultDrawer, {
  type DrawerProps as DefaultDrawerProps,
} from 'rc-drawer'

import './index.scss'

export type DrawerProps = DefaultDrawerProps

export default function Drawer(
  props: Omit<DrawerProps, 'maskMotion' | 'motion'>,
) {
  return (
    <DefaultDrawer
      {...props}
      maskMotion={{ motionAppear: true, motionName: 'mask-motion' }}
      motion={(placement) => ({
        motionAppear: true,
        motionName: `panel-motion-${placement}`,
      })}
    />
  )
}
