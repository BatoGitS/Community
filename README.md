# Портал для профессионального комьюнити (UI)

## Общее описание проекта

Разработать портал для профессионального комьюнити. 
Пользователь, зарегистрировавшись на портале, может выбрать технологии, которыми владеет сам и оценивать знания других пользователей. Должен быть реализован MVP (обязательно) и фичи по желанию. Условно MVP - Junior, фичи без звездочки - Middle, со звездочкой – Senior.

### MVP

- [x] Реализовать возможность регистрации нового пользователя (ФИО, дата рождения, город).
- [x] Реализовать возможность авторизации пользователя.
- [x] Реализовать возможность просмотра всех профилей пользователей.
- [x] Реализовать поиск профилей по ФИО или технологии.
- [x] Реализовать возможность просмотра профиля пользователя с полной информацией.
- [x] Реализовать возможность редактирования профиля: ФИО, дата рождения, город, о себе, список
технологий (только авторизованные пользователи!)
- [x] Реализовать возможность установки оценки для указанных в профиле технологий от 1 до 5
(только авторизованные пользователи!)

### Features

- [x] Реализовать адаптивную верстку.
- [x] Реализовать возможность добавления технологий (название, описание).
- [x] Реализовать валидацию на стороне FrontEnd.
- [x] Реализовать валидацию на стороне Backend.
- [ ] Реализовать поддержку Dependency injection (Autofac).
- [ ] Реализовать логгирование времени выполнения методов API.
- [ ] Реализовать общий обработчик ошибок для контроллеров API.
- [x] Реализовать работу с Angular Reactive Forms.
- [x] Реализовать запуск Web-приложения в режиме AOT.
- [x] Реализовать Lazy-loading модулей Web-приложения.
- [ ] *Реализовать State Management в Web-приложении.
- [x] *Реализовать авторизацию на основе JWT-токенов.
- [ ] *Реализовать поддержку СhangeDetectionStrategy: OnPush в компонентах Web-приложения.
- [ ] *Реализовать запуск Web-приложения в ServiceWorker.
- [x] *Реализовать оповещение авторизованного пользователя о добавлении оценки по технологии
(SignalR)
- [x] *Реализовать поддержку запуска backend-приложения в Docker-контейнере