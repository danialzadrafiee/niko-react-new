import React from "react"
import { useNavigate } from "react-router-dom"
import useFundraiseStore from "@/features/fundraise/store/fundraiseStore"
import useCategoryStore from "@/features/category/store/categoryStore"
import { Fundraise } from "@/types/fundraise"
import { FilterOption } from "@/components/shared/FilterOptions"
import GenericList from "@/components/shared/GenericList"

const FundraisesList: React.FC = () => {
  const navigate = useNavigate()
  const { fundraises, fetchFundraises, loading } = useFundraiseStore()
  const { fetchCategories, categories } = useCategoryStore()

  const filterOptions: FilterOption[] = [
    { key: "search", type: "text", placeholder: "جستجوی فاندریزها" },
    {
      key: "status",
      type: "select",
      placeholder: "فیلتر بر اساس وضعیت",
      options: [
        { value: "all", label: "همه" },
        { value: "active", label: "فعال" },
        { value: "completed", label: "تکمیل شده" },
        { value: "canceled", label: "لغو شده" },
      ],
    },
    { key: "min_price", type: "number", placeholder: "حداقل قیمت" },
    { key: "max_price", type: "number", placeholder: "حداکثر قیمت" },
  ] as const

  const handleViewDetails = (id: number) => {
    navigate(`/fundraises/${id}`)
  }

  const getCardData = (fundraise: Fundraise) => ({
    id: fundraise.id,
    title: fundraise.title,
    picture: fundraise.picture,
    describe: fundraise.describe,
    price_collected: fundraise.price_collected,
    price_total: fundraise.price_total,
    deadline: fundraise.deadline,
    created_at: fundraise.created_at,
    invests: fundraise.invests || [],
  })

  return (
    <GenericList<Fundraise>
      title="صندوق های مشارکتی"
      items={fundraises}
      categories={categories}
      loading={loading}
      fetchItems={fetchFundraises}
      fetchCategories={fetchCategories}
      handleViewDetails={handleViewDetails}
      getCardData={getCardData}
      isFundraiseMode={true}
      filterOptions={filterOptions}
      baseUrl="/fundraises/list"
    />
  )
}

export default FundraisesList
