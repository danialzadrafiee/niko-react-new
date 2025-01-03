export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center">صفحه موردنظر پیدا نشد.</h1>
      <p className="text-xl mb-8 text-gray-600 text-center">متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
      <a href="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
        بازگشت به صفحه اصلی
      </a>
    </div>
  )
}
