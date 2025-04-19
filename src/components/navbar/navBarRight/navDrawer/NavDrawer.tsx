import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";


export default function NavDrawer({isOpen, onHandleClose, children}: {isOpen: boolean, onHandleClose: () => void, children: React.ReactNode}) {
  return (
    <Drawer open={isOpen} onClose={onHandleClose} position="right">

        <DrawerHeader title="Topics" titleIcon={() => <></>} />

        <DrawerItems>
          {children}
        </DrawerItems>
      </Drawer>
  )
}
