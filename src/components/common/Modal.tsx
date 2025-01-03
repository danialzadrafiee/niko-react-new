import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  default_buttons?: boolean
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, description, confirmText = "Confirm", cancelText = "Cancel", children, default_buttons = true }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          {default_buttons && (
            <>
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
              <Button onClick={onConfirm}>{confirmText}</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
