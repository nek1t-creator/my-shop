export default function Advertisement({ position }) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  const ads = [
    { text: "Скидка 50%!", color: "bg-red-500" },
    { text: "Новинки!", color: "bg-green-500" },
    { text: "Хит продаж!", color: "bg-purple-500" },
    { text: "Акция!", color: "bg-orange-500" },
  ]

  const ad = ads[Math.floor(Math.random() * ads.length)]

  return (
    <div className={`fixed ${positionClasses[position]} z-30 hidden lg:block`}>
      <div className={`${ad.color} text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold animate-pulse`}>
        {ad.text}
      </div>
    </div>
  )
}
