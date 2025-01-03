import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { searchService } from "@/features/search/services/searchService"
import { Fundraise } from "@/types/fundraise"
import { Product } from "@/types/product"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { getImageUrl } from "../../utils/env"

interface SearchResults {
  fundraises: Fundraise[]
  products: Product[]
}


const SearchBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResults>({ fundraises: [], products: [] })
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { register, watch } = useForm()

  const searchQuery = watch("search")

  useEffect(() => {
    const performSearch = async (query: string) => {
      if (query.length >= 2) {
        setIsSearching(true)
        try {
          const response: any = await searchService.search(query)
          if (response.status === "success") {
            setSearchResults(response.payload)
          } else {
            console.error("Search failed:", response.message)
            setSearchResults({ fundraises: [], products: [] })
          }
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults({ fundraises: [], products: [] })
        } finally {
          setIsSearching(false)
          setShowResults(true)
        }
      } else {
        setSearchResults({ fundraises: [], products: [] })
        setShowResults(false)
      }
    }

    if (searchQuery) {
      performSearch(searchQuery)
    } else {
      setSearchResults({ fundraises: [], products: [] })
      setShowResults(false)
    }
  }, [searchQuery])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR", { style: "currency", currency: "IRR" }).format(amount)
  }

  const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, index) => (part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part))
  }

  const closeSearch = () => {
    setShowResults(false)
  }

  const hasResults = searchResults.fundraises.length > 0 || searchResults.products.length > 0

  return (
    <div className="relative w-full max-w-md">
      <Input {...register("search")} className="h-10 input input-bordered rounded-full w-full pr-10" placeholder="جستجو.." />
      <div className="absolute inset-y-0 right-3 flex items-center">
        <Search size={18} className="text-gray-400" />
      </div>
      {showResults && (
        <Card className="absolute top-full left-0 w-full mt-2 z-50">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="text-center">در حال جستجو...</div>
            ) : hasResults ? (
              <>
                {searchResults.fundraises.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-2 text-[#5432a1]">مشارکتی</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {searchResults.fundraises.map((fundraise) => (
                        <Link key={fundraise.id} to={`/fundraises/${fundraise.id}`} className="block" onClick={closeSearch}>
                          <div className="border flex gap-2 border-gray-200 rounded p-2 hover:bg-gray-50 ">
                            <img src={getImageUrl(fundraise.picture)} alt={fundraise.title} className="size-12 rounded" />
                            <div>
                              <h4 className="text-sm font-medium">{highlightText(fundraise.title, searchQuery)}</h4>
                              <Progress value={fundraise.completion_percentage} className="my-1" />
                              <p className="text-xs">{`${Math.floor(fundraise.completion_percentage)}% تکمیل`}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
                {searchResults.fundraises.length > 0 && searchResults.products.length > 0 && <Separator className="my-4" />}
                {searchResults.products.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-2 text-[#5432a1]">کامل</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {searchResults.products.map((product) => (
                        <Link key={product.id} to={`/products/${product.id}`} className="block" onClick={closeSearch}>
                          <div className="border flex gap-2 border-gray-200 rounded p-2 hover:bg-gray-50 ">
                            <img src={getImageUrl(product.picture)} alt={product.title} className="size-12 rounded" />
                            <div>
                              <h4 className="text-sm font-medium">{highlightText(product.title, searchQuery)}</h4>
                              <p className="text-sm">{formatCurrency(product.price)}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-center">آیتمی با این مشخصات وجود ندارد</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SearchBar