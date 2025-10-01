import Link from "next/link"
import Image from "next/image"
import { Mail, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="GEPPU" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-bold text-primary">GEPPU.TV</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Смотрите аниме онлайн в высоком качестве с русской озвучкой. Новые серии каждый день!
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors">
                  Расписание
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Профиль
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-muted-foreground hover:text-primary transition-colors">
                  Правила
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-muted-foreground hover:text-primary transition-colors">
                  DMCA
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Конфиденциальность
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Связь</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:support@geppu.tv"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@geppu.tv
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/gepputv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 GEPPU.TV. Все права защищены.</p>
            <p className="text-center md:text-right">
              Сайт не хранит видеофайлы. Все материалы размещены пользователями.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
