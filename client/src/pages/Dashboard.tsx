import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Shield, MessageSquare, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: comments, isLoading: commentsLoading } = trpc.comments.list.useQuery();
  const { data: ratings, isLoading: ratingsLoading } = trpc.ratings.list.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            <CardDescription>يجب تسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">العودة للصفحة الرئيسية</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "إجمالي التعليقات",
      value: comments?.length || 0,
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      title: "إجمالي التقييمات",
      value: ratings?.length || 0,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "المستخدمون النشطون",
      value: new Set([...(comments?.map(c => c.userId) || []), ...(ratings?.map(r => r.userId) || [])]).size,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "متوسط التقييم",
      value: ratings && ratings.length > 0 
        ? (ratings.reduce((acc, r) => acc + (r.rating === "ممتازة" ? 5 : r.rating === "قوية" ? 4 : 3), 0) / ratings.length).toFixed(1)
        : "0",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{user?.name || "مستخدم"}</Badge>
            <Link href="/">
              <Button variant="ghost" size="sm">الصفحة الرئيسية</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="comments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="comments">التعليقات</TabsTrigger>
            <TabsTrigger value="ratings">التقييمات</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>جميع التعليقات</CardTitle>
                <CardDescription>تعليقات المستخدمين على المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                {commentsLoading ? (
                  <p className="text-muted-foreground">جاري التحميل...</p>
                ) : comments && comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <Card key={comment.id} className="bg-card/50">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{comment.userName}</Badge>
                              {comment.rating && (
                                <Badge variant="outline">{comment.rating}</Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('ar-SA') : ''}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">لا توجد تعليقات بعد</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>جميع التقييمات</CardTitle>
                <CardDescription>تقييمات المستخدمين للميزات المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                {ratingsLoading ? (
                  <p className="text-muted-foreground">جاري التحميل...</p>
                ) : ratings && ratings.length > 0 ? (
                  <div className="space-y-4">
                    {ratings.map((rating) => (
                      <Card key={rating.id} className="bg-card/50">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="default" className="mb-2">{rating.featureType}</Badge>
                              <h4 className="font-semibold text-sm">{rating.featureName}</h4>
                            </div>
                            <Badge variant="outline">{rating.rating}</Badge>
                          </div>
                          {rating.comment && (
                            <p className="text-sm text-muted-foreground mt-2">{rating.comment}</p>
                          )}
                          <span className="text-xs text-muted-foreground block mt-2">
                            {rating.createdAt ? new Date(rating.createdAt).toLocaleDateString('ar-SA') : ''}
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">لا توجد تقييمات بعد</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

