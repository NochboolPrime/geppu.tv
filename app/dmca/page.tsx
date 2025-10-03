import { FileText, Mail, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DMCAPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">DMCA Policy</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Политика в отношении авторских прав и процедура подачи жалоб
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 flex gap-4">
            <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-destructive">Важное уведомление</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                GEPPU.TV не хранит видеофайлы на своих серверах. Все материалы размещаются пользователями и находятся на
                сторонних видеохостингах.
              </p>
            </div>
          </div>

          {/* Copyright Policy */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Политика авторских прав</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                GEPPU.TV уважает права интеллектуальной собственности и ожидает того же от своих пользователей. Мы
                реагируем на уведомления о предполагаемых нарушениях авторских прав в соответствии с применимым
                законодательством.
              </p>
              <p>
                Если вы являетесь правообладателем и считаете, что ваши авторские права были нарушены, пожалуйста,
                свяжитесь с нами, используя контактную информацию ниже.
              </p>
            </div>
          </section>

          {/* Filing a Complaint */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Подача жалобы</h2>
            <p className="text-muted-foreground leading-relaxed">
              Для подачи жалобы о нарушении авторских прав, пожалуйста, предоставьте следующую информацию:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Описание защищенного авторским правом произведения</li>
              <li>URL-адрес страницы с предполагаемым нарушением</li>
              <li>Ваши контактные данные (имя, адрес, телефон, email)</li>
              <li>Заявление о добросовестности использования</li>
              <li>Электронная или физическая подпись правообладателя</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Контактная информация</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Для вопросов, связанных с авторскими правами, пожалуйста, свяжитесь с нами:
            </p>
            <a href="mailto:dmca@geppu.tv" className="inline-flex items-center gap-2 text-primary hover:underline">
              <Mail className="h-4 w-4" />
              dmca@geppu.tv
            </a>
          </section>

          {/* Response Time */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Время ответа</h2>
            <p className="text-muted-foreground leading-relaxed">
              Мы стремимся рассмотреть все жалобы в течение 48 часов с момента получения. После проверки предоставленной
              информации мы примем соответствующие меры, включая удаление контента, нарушающего авторские права.
            </p>
          </section>

          {/* Counter-Notice */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-bold">Встречное уведомление</h2>
            <p className="text-muted-foreground leading-relaxed">
              Если вы считаете, что ваш контент был удален по ошибке, вы можете подать встречное уведомление. Встречное
              уведомление должно содержать аналогичную информацию и обоснование того, почему контент не нарушает
              авторские права.
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
