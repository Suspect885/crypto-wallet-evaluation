import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Shield, MessageSquare, Star } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Interact() {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState<string>();
  
  const [ratingFeatureType, setRatingFeatureType] = useState("");
  const [ratingFeatureName, setRatingFeatureName] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [ratingComment, setRatingComment] = useState("");

  const createCommentMutation = trpc.comments.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة التعليق بنجاح");
      setCommentContent("");
      setCommentRating(undefined);
      utils.comments.list.invalidate();
    },
    onError: (error) => {
      toast.error("فشل إضافة التعليق: " + error.message);
    },
  });

  const createRatingMutation = trpc.ratings.create.useMutation({
    onSuccess: () => {
      toast.success("تم إضافة التقييم بنجاح");
      setRatingFeatureType("");
      setRatingFeatureName("");
      setRatingValue("");
      setRatingComment("");
      utils.ratings.list.invalidate();
    },
    onError: (error) => {
      toast.error("فشل إضافة التقييم: " + error.message);
    },
  });

  const handleSubmitComment = () => {
    if (!commentContent.trim()) {
      toast.error("يرجى كتابة تعليق");
      return;
    }
    createCommentMutation.mutate({
      content: commentContent,
      rating: commentRating,
    });
  };

  const handleSubmitRating = () => {
    if (!ratingFeatureType || !ratingFeatureName || !ratingValue) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    createRatingMutation.mutate({
      featureType: ratingFeatureType,
      featureName: ratingFeatureName,
      rating: ratingValue,
      comment: ratingComment || undefined,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            <CardDescription>يجب تسجيل الدخول للتفاعل مع المحتوى</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => window.location.href = getLoginUrl()}>
              تسجيل الدخول
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">العودة للصفحة الرئيسية</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">التفاعل مع المحتوى</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{user?.name || "مستخدم"}</Badge>
            <Link href="/">
              <Button variant="ghost" size="sm">الصفحة الرئيسية</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">لوحة التحكم</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Add Comment Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <CardTitle>إضافة تعليق</CardTitle>
              </div>
              <CardDescription>شارك رأيك حول تقييم المحفظة الرقمية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment">التعليق</Label>
                <Textarea
                  id="comment"
                  placeholder="اكتب تعليقك هنا..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment-rating">التقييم العام (اختياري)</Label>
                <Select value={commentRating} onValueChange={setCommentRating}>
                  <SelectTrigger id="comment-rating">
                    <SelectValue placeholder="اختر التقييم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ممتازة">ممتازة</SelectItem>
                    <SelectItem value="قوية">قوية</SelectItem>
                    <SelectItem value="جيدة">جيدة</SelectItem>
                    <SelectItem value="متوسطة">متوسطة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSubmitComment}
                disabled={createCommentMutation.isPending}
                className="w-full"
              >
                {createCommentMutation.isPending ? "جاري الإضافة..." : "إضافة التعليق"}
              </Button>
            </CardContent>
          </Card>

          {/* Add Rating Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                <CardTitle>تقييم ميزة محددة</CardTitle>
              </div>
              <CardDescription>قيّم ميزة معينة من ميزات المحفظة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feature-type">نوع الميزة</Label>
                <Select value={ratingFeatureType} onValueChange={setRatingFeatureType}>
                  <SelectTrigger id="feature-type">
                    <SelectValue placeholder="اختر نوع الميزة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="security">الأمان</SelectItem>
                    <SelectItem value="architecture">البنية المعمارية</SelectItem>
                    <SelectItem value="features">الميزات</SelectItem>
                    <SelectItem value="trading">التداول</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feature-name">اسم الميزة</Label>
                <Select value={ratingFeatureName} onValueChange={setRatingFeatureName}>
                  <SelectTrigger id="feature-name">
                    <SelectValue placeholder="اختر الميزة" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratingFeatureType === "security" && (
                      <>
                        <SelectItem value="MPC">الحوسبة متعددة الأطراف (MPC)</SelectItem>
                        <SelectItem value="HSM">وحدة أمان الأجهزة (HSM)</SelectItem>
                        <SelectItem value="2FA">المصادقة الثنائية</SelectItem>
                        <SelectItem value="Air-Gapped">التخزين المعزول</SelectItem>
                      </>
                    )}
                    {ratingFeatureType === "architecture" && (
                      <>
                        <SelectItem value="Vault Layer">طبقة التخزين البارد</SelectItem>
                        <SelectItem value="Trading Core">نواة التداول</SelectItem>
                        <SelectItem value="Cross-Chain">محرك السلاسل المتقاطعة</SelectItem>
                      </>
                    )}
                    {ratingFeatureType === "features" && (
                      <>
                        <SelectItem value="Blind Signing">الحماية من التوقيع الأعمى</SelectItem>
                        <SelectItem value="Dynamic Whitelist">القائمة البيضاء الديناميكية</SelectItem>
                        <SelectItem value="AI Detection">كشف الشذوذ بالذكاء الاصطناعي</SelectItem>
                        <SelectItem value="Post-Quantum">النسخ الاحتياطي بعد الكم</SelectItem>
                      </>
                    )}
                    {ratingFeatureType === "trading" && (
                      <>
                        <SelectItem value="Smart Order">تجزئة الأوامر الذكية</SelectItem>
                        <SelectItem value="Flash Protection">الحماية من الانهيار السريع</SelectItem>
                        <SelectItem value="DeFi Integration">تكامل DeFi</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating-value">التقييم</Label>
                <Select value={ratingValue} onValueChange={setRatingValue}>
                  <SelectTrigger id="rating-value">
                    <SelectValue placeholder="اختر التقييم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ممتازة">ممتازة</SelectItem>
                    <SelectItem value="قوية">قوية</SelectItem>
                    <SelectItem value="جيدة">جيدة</SelectItem>
                    <SelectItem value="متوسطة">متوسطة</SelectItem>
                    <SelectItem value="ضعيفة">ضعيفة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating-comment">ملاحظات (اختياري)</Label>
                <Textarea
                  id="rating-comment"
                  placeholder="أضف ملاحظاتك..."
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleSubmitRating}
                disabled={createRatingMutation.isPending}
                className="w-full"
              >
                {createRatingMutation.isPending ? "جاري الإضافة..." : "إضافة التقييم"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

