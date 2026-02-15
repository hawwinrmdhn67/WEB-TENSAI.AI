import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"

export default function Sidebar({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <>
      <SidebarDesktop expanded={expanded} onToggle={onToggle} />
      <SidebarMobile open={expanded} onClose={onToggle} />
    </>
  )
}
