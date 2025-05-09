# Система управления доставками

Приложение для управления заказами на доставку с возможностью отслеживания статусов и редактирования.

## Функциональность

- Создание, редактирование и удаление заказов
- Два статуса заказов: "В процессе" и "Завершено"
- Три типа заказов: "Договор", "Залог", "Договор + Залог"
- Два типа доставки: "Привезти" и "Забрать"
- Фильтрация заказов по дате и типу
- Оптимистичные обновления UI

## Технологии

- Next.js 14
- TypeScript
- React Query для управления состоянием
- Tailwind CSS для стилей
- MongoDB для хранения данных
- Lucide React для иконок

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:

```bash
npm install
```

3. Создайте файл .env.local с настройками MongoDB
4. Запустите разработческий сервер:

```bash
npm run dev
```

## Структура проекта

- `/src/app` - страницы приложения
- `/src/components` - React компоненты
- `/src/hooks` - кастомные хуки
- `/src/models` - модели данных
- `/src/utils` - утилиты и API функции

## Особенности реализации

- Оптимистичные обновления для быстрого отклика UI
- Кастомные хуки для работы с API
- Адаптивный дизайн
- Валидация форм
- Обработка ошибок
