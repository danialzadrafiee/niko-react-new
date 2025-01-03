import React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface FilterOption {
  key: string
  type: "text" | "number" | "select"
  placeholder: string
  options?: { value: string; label: string }[]
}

interface FilterOptionsProps {
  filters: Record<string, string>
  filterOptions: FilterOption[]
  onFilterChange: (key: string, value: string) => void
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ filters, filterOptions, onFilterChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      {filterOptions.map((option) => (
        <div key={option.key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{option.placeholder}</label>
          {option.type === "select" ? (
            <Select value={filters[option.key]} onValueChange={(value) => onFilterChange(option.key, value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={option.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {option.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={option.type}
              placeholder={option.placeholder}
              value={filters[option.key]}
              onChange={(e) => onFilterChange(option.key, e.target.value)}
              className="w-full"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default FilterOptions