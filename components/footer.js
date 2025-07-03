export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Shop</h3>
            <p className="text-gray-400">Лучший интернет-магазин с широким ассортиментом товаров</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Категории</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Электроника</li>
              <li>Одежда</li>
              <li>Книги</li>
              <li>Дом и сад</li>
              <li>Спорт</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li>О нас</li>
              <li>Доставка</li>
              <li>Возврат</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="text-gray-400 space-y-2">
              <p>📞 +998 (90) 123-45-67</p>
              <p>📧 ya@gmail.com</p>
              <p>не знаю</p>
            </div>
          </div>
        </div>


      </div>
    </footer>
  )
}
