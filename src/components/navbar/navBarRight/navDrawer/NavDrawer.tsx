import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";

export interface NavDrawerProps {
  isOpen: boolean, 
  onHandleClose: () => void, 
  children: React.ReactNode,
}

export default function NavDrawer({isOpen, onHandleClose, children}: NavDrawerProps) {
  return (
    <Drawer open={isOpen} onClose={onHandleClose} position="right" data-testid='drawer'>
      <DrawerHeader title="Topics" titleIcon={() => <></>} />
      <DrawerItems>
        {children}
      </DrawerItems>
    </Drawer>
  )
}
