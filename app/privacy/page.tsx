import { Shield, Eye, Lock, Database, Cookie } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Политика конфиденциальности</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Как мы собираем, используем и защищаем вашу личную информацию
            </p>
            <p className="text-sm text-muted-foreground">Последнее обновление: 3 января 2025</p>
          </div>

          {/* Introduction */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Введение</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              GEPPU.TV серьезно относится к защите вашей конфиденциальности. Эта политика описывает, какую информацию мы
              собираем, как мы ее используем и какие права у вас есть в отношении ваших данных.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Какие данные мы собираем</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Информация аккаунта</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  При регистрации мы собираем ваш email-адрес и имя пользователя. Пароли хранятся в зашифрованном виде.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Данные о просмотре</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Мы сохраняем информацию о том, какие аниме вы смотрите, чтобы предоставить функцию "Продолжить
                  просмотр" и персональные рекомендации.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Технические данные</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  IP-адрес, тип браузера, операционная система и другая техническая информация для обеспечения
                  безопасности и улучшения сервиса.
                </p>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Как мы используем данные</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Предоставление и улучшение наших услуг</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Персонализация вашего опыта использования</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Обеспечение безопасности и предотвращение мошенничества</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Связь с вами по важным вопросам сервиса</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Анализ использования для улучшения функциональности</span>
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Cookies и технологии отслеживания</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Мы используем cookies для сохранения вашей сессии, запоминания предпочтений и анализа использования сайта.
              Вы можете управлять cookies через настройки вашего браузера, но это может ограничить функциональность
              сервиса.
            </p>
          </section>

          {/* Data Security */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Безопасность данных</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Мы применяем современные меры безопасности для защиты ваших данных, включая шифрование, безопасное
              хранение паролей и регулярные проверки безопасности. Однако ни один метод передачи данных через интернет
              не является абсолютно безопасным.
            </p>
          </section>

          {/* User Rights */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Ваши права</h2>
            <p className="text-muted-foreground leading-relaxed">Вы имеете право:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Получить доступ к своим персональным данным</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Исправить неточные данные</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Удалить свой аккаунт и данные</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Возразить против обработки ваших данных</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="leading-relaxed">Экспортировать свои данные</span>
              </li>
            </ul>
          </section>

          {/* Third Parties */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Третьи стороны</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы не продаем ваши персональные данные третьим лицам. Мы можем делиться данными с сервис-провайдерами,
              которые помогают нам предоставлять услуги (хостинг, аналитика), но только в объеме, необходимом для
              выполнения их функций.
            </p>
          </section>

          {/* Changes */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Изменения политики</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы можем обновлять эту политику конфиденциальности время от времени. Мы уведомим вас о существенных
              изменениях через email или уведомление на сайте. Дата последнего обновления указана в начале документа.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Связаться с нами</h2>
            <p className="text-muted-foreground leading-relaxed">
              Если у вас есть вопросы о нашей политике конфиденциальности, свяжитесь с нами:
            </p>
            <a href="mailto:privacy@geppu.tv" className="inline-flex items-center gap-2 text-primary hover:underline">
              privacy@geppu.tv
            </a>
          </section>

          {/* Back to home */}
          <div className="pt-4">
            <Link href="/" className="text-primary hover:underline">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
