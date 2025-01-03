import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/utils/env"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface UserChangeHistoryRecord {
  id: number
  field_name: string
  old_value: string | null
  created_at: string
}

const UserChangeHistoryTable = ({ userChangeHistory, setIsHistoryDialogOpen }: { 
  userChangeHistory: UserChangeHistoryRecord[]; 
  setIsHistoryDialogOpen: (isOpen: boolean) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  // Filter out records with null or empty old_value
  const filteredHistory = userChangeHistory.filter(record => record.old_value !== null && record.old_value !== "");

  // Get all image URLs
  const imageUrls = filteredHistory
    .filter(record => record.old_value?.startsWith("/storage/"))
    .map(record => getImageUrl(record.old_value!))

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  const renderValue = (value: string, index: number) => {
    if (value.startsWith("/storage/")) {
      const imageUrl = getImageUrl(value)
      return (
        <img 
          src={imageUrl} 
          alt="User uploaded content" 
          className="max-w-[100px] max-h-[100px] cursor-pointer" 
          onClick={() => openLightbox(index)}
        />
      )
    }
    return value;
  }

  const renderRows = () => {
    return filteredHistory.map((record, index) => (
      <tr key={record.id}>
        <td className="border p-2">{record.field_name}</td>
        <td className="border p-2">{renderValue(record.old_value!, index)}</td>
        <td className="border p-2">{new Date(record.created_at).toLocaleString("fa-IR")}</td>
      </tr>
    ))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">تاریخچه تغییرات کاربر</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-right">فیلد</th>
              <th className="border p-2 text-right">مقدار قبلی</th>
              <th className="border p-2 text-right">تاریخ تغییر</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
        <div className="mt-4 text-right">
          <Button onClick={() => setIsHistoryDialogOpen(false)}>بستن</Button>
        </div>
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={imageUrls.map(src => ({ src }))}
        index={photoIndex}
      />
    </div>
  )
}

export default UserChangeHistoryTable