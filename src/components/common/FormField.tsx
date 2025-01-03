import React from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian"
import DateObject, { Calendar } from "react-date-object"

interface FormFieldProps {
  name: string
  label: string
  type?: string
  as?: string
  required?: boolean
  className?: string
  form: any
}
interface CustomCalendar extends Calendar {
  months: any
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = "text", as, required = false, className = "", form }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form
  const inputClassName = `w-full input input-bordered ${className}`
  const textareaClassName = `w-full textarea textarea-bordered ${className}`

  const convertPersianToArabicNumerals = (str: string) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
    return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d).toString())
  }

  const handleDateChange = (date: any) => {
    if (date?.isValid) {
      // Convert Persian date to Gregorian
      const gregorianDate = date.convert(gregorian as CustomCalendar, (gregorian as CustomCalendar).months)
      // Format as YYYY-MM-DD with Persian numerals
      let formattedDate = new DateObject(gregorianDate).format("YYYY-MM-DD")
      // Convert Persian numerals to Arabic numerals
      formattedDate = convertPersianToArabicNumerals(formattedDate)
      setValue(name, formattedDate)
    } else {
      setValue(name, "")
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      {as === "textarea" ? (
        <textarea id={name} {...register(name, { required: required ? `${label} is required` : false })} className={textareaClassName} />
      ) : type === "date" ? (
        <DatePicker id={name} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" {...register(name, { required: required ? `${label} is required` : false })} onChange={handleDateChange} inputClass={inputClassName} />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, {
            required: required ? `${label} is required` : false,
            valueAsNumber: type === "number",
          })}
          className={inputClassName}
        />
      )}
      {errors[name] && <div className="mt-1 text-sm text-error">{errors[name]?.message}</div>}
    </div>
  )
}

export default FormField
