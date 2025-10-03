import { Shield, AlertTriangle, Ban, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Правила использования</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Пожалуйста, ознакомьтесь с правилами использования сервиса GEPPU.TV
            </p>
          </div>

          {/* General Rules */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Общие правила</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Используйте сервис только в личных некоммерческих целях</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Уважайте других пользователей и соблюдайте правила общения</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Не пытайтесь обойти технические ограничения сервиса</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Сообщайте о найденных ошибках и проблемах в службу поддержки</span>
              </li>
            </ul>
          </section>

          {/* Prohibited Actions */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Ban className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl font-bold">Запрещено</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">Загружать, распространять или публиковать незаконный контент</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Использовать автоматизированные средства для доступа к сервису (боты, парсеры)
                </span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Пытаться получить несанкционированный доступ к системе или данным других пользователей
                </span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">Создавать несколько аккаунтов для обхода ограничений</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <span className="leading-relaxed">Размещать спам, рекламу или вредоносные ссылки</span>
              </li>
            </ul>
          </section>

          {/* Account Rules */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Правила использования аккаунта</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Вы несете ответственность за безопасность своего аккаунта. Не передавайте свои данные для входа третьим
                лицам.
              </p>
              <p>
                Администрация оставляет за собой право заблокировать аккаунт при нарушении правил использования сервиса.
              </p>
              <p>
                При обнаружении подозрительной активности на вашем аккаунте немедленно свяжитесь со службой поддержки.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Изменения правил</h2>
            <p className="text-muted-foreground leading-relaxed">
              Администрация GEPPU.TV оставляет за собой право изменять данные правила в любое время. Продолжая
              использовать сервис после внесения изменений, вы соглашаетесь с новыми правилами.
            </p>
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
