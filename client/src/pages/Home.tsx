import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Cpu, Network, Zap, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">تقييم المحفظة الرقمية</h1>
          </div>
          <Badge variant="outline" className="text-sm">
            تقرير فني شامل
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Introduction Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
              تقييم فني وأمني شامل
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              تحليل متعمق لمواصفات محفظة عملات رقمية هجينة تجمع بين أعلى معايير الأمان وميزات التداول المتقدمة
            </p>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="container py-12">
          <h3 className="text-3xl font-bold mb-8 text-center">النموذج الهجين (Hybrid Architecture)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Lock className="w-10 h-10 text-primary mb-2" />
                <CardTitle>طبقة التخزين البارد</CardTitle>
                <CardDescription>Vault Layer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>المفتاح الخاص لا يغادر الجهاز المعزز (HSM أو Secure Element)</p>
                <p>توقيع المعاملات داخل بيئة آمنة ومعزولة</p>
                <p>عرض العناوين فقط دون كشف المفاتيح</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-primary mb-2" />
                <CardTitle>نواة التداول</CardTitle>
                <CardDescription>Trading Core</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>واجهة API موحدة للاتصال بـ 100+ بورصة</p>
                <p>محرك توجيه ذكي للأوامر (Smart Order Router)</p>
                <p>&gt;90% في التخزين البارد، &lt;10% في المحافظ الساخنة</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Network className="w-10 h-10 text-primary mb-2" />
                <CardTitle>محرك السلاسل المتقاطعة</CardTitle>
                <CardDescription>Cross-Chain Engine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>تحويل الأصول بين الشبكات دون خروج المفتاح</p>
                <p>إدارة العمولات والقفل الزمني (time-lock)</p>
                <p>حماية من اعوجاج الأسعار</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Features */}
        <section className="container py-12 bg-card/30 rounded-lg">
          <h3 className="text-3xl font-bold mb-8 text-center">هندسة الأمان المتقدمة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <feature.icon className="w-8 h-8 text-primary" />
                    <Badge variant={feature.rating === "ممتازة" ? "default" : "secondary"}>
                      {feature.rating}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{feature.title}</CardTitle>
                  <CardDescription className="text-xs">{feature.tech}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Unique Features */}
        <section className="container py-12">
          <h3 className="text-3xl font-bold mb-8 text-center">الميزات الفريدة والمبتكرة</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {uniqueFeatures.map((feature, index) => (
              <Card key={index} className="border-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-xs">{feature.evaluation}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="container py-12 bg-gradient-to-b from-primary/5 to-transparent rounded-lg">
          <h3 className="text-3xl font-bold mb-8 text-center">الميزات التنافسية</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{advantage.title}</h4>
                    <p className="text-sm text-muted-foreground">{advantage.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="container py-12">
          <h3 className="text-3xl font-bold mb-8 text-center">التوصيات</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="container py-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-accent/5 to-background border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-center">الخلاصة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-lg leading-relaxed">
                تمثل المواصفات المقترحة <strong>تصميمًا قويًا وشاملاً</strong> لمحفظة عملات رقمية هجينة. يجمع التصميم بين أحدث التقنيات الأمنية وميزات تداول متقدمة، مع التركيز على حماية المستخدم واستقلاليته.
              </p>
              <p className="text-muted-foreground">
                إذا تم تنفيذ هذه المواصفات بشكل صحيح، فإن المنتج الناتج لديه القدرة على أن يكون <strong className="text-primary">أحد أكثر المحافظ أمانًا ووظيفية في السوق</strong>.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>تقرير تقييم فني وأمني • تم الإعداد بواسطة Manus AI</p>
        </div>
      </footer>
    </div>
  );
}

// Data
const securityFeatures = [
  {
    icon: Cpu,
    title: "الحوسبة متعددة الأطراف",
    tech: "Multi-Party Computation (MPC)",
    rating: "ممتازة",
    description: "تقسيم المفتاح الخاص إلى أجزاء موزعة على 3 خوادم مستقلة. تمنع وجود نقطة فشل واحدة وتتطلب موافقة متعددة."
  },
  {
    icon: Shield,
    title: "وحدة أمان الأجهزة",
    tech: "HSM - FIPS 140-3 Level 4",
    rating: "ممتازة",
    description: "معيار أمان عالي جداً. يوفر مقاومة ضد التلاعب الجسدي والتحليل الكهربائي."
  },
  {
    icon: Lock,
    title: "مصادقة ثنائية متقدمة",
    tech: "Biometric + Smart-Card 2FA",
    rating: "قوية",
    description: "بصمة/وجه + بطاقة NFC ذكية (YubiKey/Ledger) + PIN. توفر حماية قوية ضد الوصول غير المصرح به."
  },
  {
    icon: Shield,
    title: "جهاز تخزين معزول",
    tech: "Air-Gapped Vault Device",
    rating: "ممتازة",
    description: "جهاز بدون واي-فاي/بلوتوث. توفر عزلاً كاملاً عن الشبكات الخارجية، مما يمنع الهجمات عن بعد."
  },
  {
    icon: Cpu,
    title: "تأخير زمني وتحديد جغرافي",
    tech: "Time-Delay & Geo-Fencing",
    rating: "فعالة",
    description: "قفل زمني للسحوبات الكبيرة وحظر التوقيع عند تغير الموقع. تضيف طبقة حماية إضافية."
  },
  {
    icon: Shield,
    title: "وضع الخداع والطوارئ",
    tech: "Decoy & Duress Mode",
    rating: "مبتكرة",
    description: "رمز مرور وهمي ورمز طوارئ لإبطال المفاتيح. توفر خيارات للمستخدم في حالات الإكراه."
  }
];

const uniqueFeatures = [
  {
    title: "الحماية من التوقيع الأعمى",
    description: "عرض تفاصيل المعاملة على الجهاز قبل التوقيع. تمنع هجمات تبديل الحافظة وتضمن التوقيع الصحيح.",
    evaluation: "ضرورية"
  },
  {
    title: "القائمة البيضاء الديناميكية",
    description: "السماح بالسحب فقط إلى عناوين معتمدة مسبقاً. تقلل من مخاطر إرسال الأموال إلى عناوين خاطئة.",
    evaluation: "فعالة"
  },
  {
    title: "كشف الشذوذ بالذكاء الاصطناعي",
    description: "نموذج تعلم آلي يكتشف الأنشطة المشبوهة. فعالة في اكتشاف الهجمات غير التقليدية.",
    evaluation: "مبتكرة"
  },
  {
    title: "النسخ الاحتياطي بعد الكم",
    description: "تشفير نسخة احتياطية بخوارزمية CRYSTALS-KYBER. حماية طويلة الأمد ضد التهديدات المستقبلية.",
    evaluation: "استشرافية"
  },
  {
    title: "الاسترداد الاجتماعي متعدد التوقيع",
    description: "استعادة المحفظة بمساعدة 3 من 5 أصدقاء/أفراد عائلة. آلية آمنة لاستعادة الوصول.",
    evaluation: "ممتازة"
  },
  {
    title: "تجزئة الأوامر الذكية",
    description: "تقسيم الأوامر الكبيرة وتوزيعها على 20 بورصة لتقليل الانزلاق السعري.",
    evaluation: "قوية"
  }
];

const competitiveAdvantages = [
  {
    title: "مفتاحك = مفتاحك فعلاً",
    description: "لا يغادر جهازك المُعزَّز ولا يُجمَع في خادم واحد"
  },
  {
    title: "تداول فوري مع أعلى سيولة عالمية",
    description: "دون التخلي عن الأمان (MPC + Time-Lock)"
  },
  {
    title: "حماية طبقية متعددة المستويات",
    description: "Hardware + Biometric + Geo + AI تجعل الاختراق اقتصادياً مستحيلاً"
  },
  {
    title: "استرداد متقدم ومستقبلي",
    description: "استرداد اجتماعي متعدد التواقيع + دعم ما بعد الكمّي"
  },
  {
    title: "امتثال قانوني فوري",
    description: "تقارير ضريبية آلية وامتثال قانوني مدمج"
  }
];

const recommendations = [
  {
    title: "التركيز على تجربة المستخدم",
    description: "مع كل هذه الميزات الأمنية المتقدمة، من الضروري أن تكون واجهة المستخدم سهلة وبديهية لتجنب إرباك المستخدمين غير التقنيين."
  },
  {
    title: "التدقيق الأمني المستقل",
    description: "بالإضافة إلى التحقق الرسمي، يجب إجراء عمليات تدقيق أمني منتظمة من قبل شركات خارجية مرموقة لزيادة الثقة."
  },
  {
    title: "اختبار نموذج الذكاء الاصطناعي",
    description: "يجب اختبار نموذج كشف الشذوذ على نطاق واسع لضمان دقته وتقليل الإنذارات الكاذبة."
  },
  {
    title: "الشفافية في الرسوم",
    description: "يجب أن تكون هيكلة الرسوم لعمليات التداول عبر السلاسل والوصول إلى البورصات واضحة وشفافة."
  }
];

