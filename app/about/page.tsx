import { Mail, MessageCircle, Users, Target, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">О проекте GEPPU.TV</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы создаем лучший сервис для просмотра аниме онлайн с русской озвучкой
            </p>
          </div>

          {/* Mission */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Наша миссия</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              GEPPU.TV — это платформа для всех любителей аниме, где вы можете смотреть новые серии в высоком качестве с
              профессиональной русской озвучкой. Мы стремимся предоставить удобный и современный сервис для просмотра
              аниме онлайн.
            </p>
          </section>

          {/* Features */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Что мы предлагаем</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Большая коллекция</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Тысячи аниме-сериалов и фильмов с русской озвучкой от лучших студий
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Удобный интерфейс</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Современный дизайн, удобная навигация и персональные списки просмотра
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Активное сообщество</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Общайтесь с другими фанатами аниме в нашем Telegram-канале
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Поддержка 24/7</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Наша команда всегда готова помочь вам с любыми вопросами
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Связаться с нами</h2>
            <p className="text-muted-foreground leading-relaxed">
              Если у вас есть вопросы, предложения или вы хотите сообщить о проблеме, свяжитесь с нами:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:support@geppu.tv" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" />
                support@geppu.tv
              </a>
              <a
                href="https://t.me/gepputv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </a>
            </div>
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
