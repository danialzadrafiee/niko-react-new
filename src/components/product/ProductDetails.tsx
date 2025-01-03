import { Product } from "@/types/product"

interface ProductDetailsProps {
  product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-2 [@media(max-width:400px)]:grid-cols-1 [@media(max-width:400px)]:gap-6 gap-20 justify-between items-center">
      <div className="grid">
        <div className="text-xl font-semibold">{product.title}</div>
        <div className="truncate [@media(max-width:400px)]:w-[300px] w-[400px]">{product.describe}</div>
        <div className="flex items-center text-sm mt-1 gap-1">
          <img src="/img/masjed.png" className="size-[18px] rounded-full" alt="Masjed" />
          <div>توسط</div>
          <strong>نیکوگر</strong>
        </div>
      </div>
      <div className="grid py-8 px-4 bg-[#f9f9f9] rounded-xl place-items-center" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div>
          <div className="text-lg font-semibold">{product.location}</div>
          <div>موقعیت</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{product.balance} عدد</div>
          <div>بخشیده شده</div>
        </div>
        <div>
          <div className="text-lg font-semibold">{product.category?.name}</div>
          <div>دسته</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails