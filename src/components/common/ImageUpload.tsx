import React, { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { UseFormReturn } from "react-hook-form"
import { XIcon } from "lucide-react"

interface ImageUploadProps {
  name: string
  form: UseFormReturn<any>
  onChange?: (file: File | null) => void
  label?: string
  accept?: Record<string, string[]>
  existingImageUrl?: string // ویژگی جدید برای URL تصویر موجود
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  form,
  onChange,
  label = "بارگذاری تصویر",
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  },
  existingImageUrl,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(existingImageUrl || null)
  const {
    setValue,
    formState: { errors },
  } = form

  // استفاده از useEffect برای به‌روزرسانی previewImage اگر existingImageUrl تغییر کند
  useEffect(() => {
    setPreviewImage(existingImageUrl || null)
  }, [existingImageUrl])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setValue(name, file)
        setPreviewImage(URL.createObjectURL(file))
        if (onChange) {
          onChange(file)
        }
      }
    },
    [setValue, name, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  })

  const removeImage = () => {
    setPreviewImage(null)
    setValue(name, null)
    if (onChange) {
      onChange(null)
    }
  }

  const errorMessage = errors[name]
  const errorText = errorMessage
    ? typeof errorMessage === "string"
      ? errorMessage
      : typeof errorMessage === "object" && errorMessage !== null && "message" in errorMessage && typeof errorMessage.message === "string"
      ? errorMessage.message
      : "ورودی نامعتبر"
    : ""

  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`relative w-full h-[350px] border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary bg-opacity-10" : "border-gray-300 hover:border-primary"}`}
      >
        <input {...getInputProps()} name={name} id={name} />
        {previewImage ? (
          <img src={previewImage} alt="پیش‌نمایش" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-4">{isDragActive ? "تصویر را اینجا رها کنید ..." : "یک تصویر را اینجا بکشید و رها کنید، یا برای انتخاب فایل کلیک کنید"}</div>
          </div>
        )}
        {previewImage && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeImage()
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      {errorText && <div className="text-sm text-error">{errorText}</div>}
    </div>
  )
}

export default ImageUpload