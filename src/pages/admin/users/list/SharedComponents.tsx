import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getImageUrl } from "@/utils/env"
import Lightbox from "yet-another-react-lightbox"

interface InfoItemProps {
  label: string
  value: any
  icon?: React.ReactNode
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value, icon }) => (
  <div className="flex items-center space-x-2 space-x-reverse">
    {icon && icon}
    <div>
      <strong>{label}:</strong> {value || "ندارد"}
    </div>
  </div>
)

interface CharityStatusBadgeProps {
  status: string
}

export const CharityStatusBadge: React.FC<CharityStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    none: { color: "bg-gray-500", label: "هیچکدام" },
    not_requested: { color: "bg-yellow-500", label: "درخواست نشده" },
    requested: { color: "bg-blue-500", label: "درخواست شده" },
    rejected: { color: "bg-red-500", label: "رد شده" },
    actived: { color: "bg-green-500", label: "فعال شده" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.none

  return <Badge className={`${config.color} text-white`}>{config.label}</Badge>
}

interface UserImageProps {
  src: string
  alt: string
}

export const UserImage: React.FC<UserImageProps> = ({ src, alt }) => {
  const [openLightBox, setOpenLightBox] = useState(false)

  if (!src) {
    return (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">تصویر موجود نیست</span>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full h-40 rounded-lg overflow-hidden cursor-pointer" onClick={() => setOpenLightBox(true)}>
        <img src={getImageUrl(src)} alt={alt} className="object-cover w-full h-full" />
      </div>
      <Lightbox open={openLightBox} close={() => setOpenLightBox(false)} slides={[{ src: getImageUrl(src) }]} />
    </>
  )
}