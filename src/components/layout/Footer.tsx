export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={className}>
      <main>
        <div className="flex justify-between [@media(max-width:400px)]:flex-col">
          <div className="bg-[#f8f9fb] [@media(max-width:400px)]:basis-full basis-7/12 py-[36px] [@media(max-width:400px)]:rounded-none [@media(max-width:400px)]:px-[16px] px-[36px] rounded-3xl items-center flex">
            <div className="grid gap-4 [@media(max-width:400px)]:gap-2 [@media(max-width:400px)]:text-center">
              <div className="text-2xl [@media(max-width:400px)]:text-xl font-bold">خیریه نیکوگر</div>
              <div>
                "نیکوگر"، پلتفرم آنلاین خیریه برای گسترش فرهنگ نیکوکاری و کمک به نیازمندان است. افراد و سازمان‌ها می‌توانند با ثبت صندوق‌ها و سفارشات خیرخواهانه، کمک‌های مالی و خدمتیی جمع‌آوری کنند. پس از دریافت کمک‌ها، "نیکوگر" آن‌ها را
                خریداری و توزیع بین نیازمندان انجام می‌دهد. پیوستن به این پلتفرم به شما امکان مشارکت در گسترش فرهنگ نیکوکاری و کمک به هم‌نوعان را می‌دهد.
              </div>
              <div className="rounded-full shadow-xl w-max px-4 py-3 [@media(max-width:400px)]:mx-auto">تمام حقوق این وبسایت محفوظ است</div>
            </div>
          </div>
          <div className="grid basis-4/12 [@media(max-width:400px)]:basis-full [@media(max-width:400px)]:px-[16px] h-full pt-6 gap-4 grid-cols-2">
            <div className="grid items-start h-max">
              <div className="text-2xl [@media(max-width:400px)]:text-xl font-bold gap-2 items-center flex">
                <div className="bg-primary h-1.5 w-5"></div>
                <div>تماس باما</div>
              </div>
              <div className="grid [@media(max-width:400px)]:text-sm h-full mt-2">
                <div>تهران, پاسداران, گلستان چهارم و ساختما ندا, طبقه پنجم, واحد هشت</div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:info@nikoogar.com" className="bg-primary/30 text-sm cursor-pointer w-max rounded-full py-2 [@media(max-width:400px)]:py-1 [@media(max-width:400px)]:text-xs [@media(max-width:400px)]:px-2.5 px-5 text-primary">
                    info@nikoogar.com
                  </a>
                </div>
                <div className="grid gap-2 [@media(max-width:400px)]:gap-0 [@media(max-width:400px)]:mt-0 mt-2">
                  <div className="mt-2">
                    <div className="flex items-end gap-2">
                      <a href="tel:02122344548" className="leading-none text-2xl [@media(max-width:400px)]:text-xl font-black text-primary">
                        22344548
                      </a>
                      <a href="tel:02122344548" className="leading-none pb-1 [@media(max-width:400px)]:text-sm">
                        021
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-end gap-2">
                      <a href="tel:02122844553" className="leading-none text-2xl [@media(max-width:400px)]:text-xl font-black text-primary">
                        22844553
                      </a>
                      <a href="tel:02122844553" className="leading-none pb-1 [@media(max-width:400px)]:text-sm">
                        021
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid h-min items-start [@media(max-width:400px)]:text-sm">
              <div className="text-2xl [@media(max-width:400px)]:text-xl font-bold gap-2 items-center flex">
                <div className="bg-primary h-1.5 w-5"></div>
                <div>لینک ها</div>
              </div>
              <div className="flex flex-col gap-2 pr-8 [@media(max-width:400px)]:gap-3 mt-2">
                <a href="/">صفحه اصلی</a>
                <a href="http://127.0.0.1:8001/contact">تماس با ما</a>
                <div className="cursor-pointer">قوانین و مقررات</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </footer>
  )
}
