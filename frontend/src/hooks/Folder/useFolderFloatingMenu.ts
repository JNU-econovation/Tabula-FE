import { useEffect, useRef, useState } from "react"

export const useFolderFloatingMenu = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const moreButtonRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener("click", handleClickOutSide)
    return () => {
      document.removeEventListener("click", handleClickOutSide)
    }
  }, [])

  return { openMenuId, toggleMenu, menuRef, moreButtonRef }
}