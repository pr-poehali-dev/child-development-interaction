import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [email, setEmail] = useState('');
  const [currentTest, setCurrentTest] = useState<number>(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [showTestResult, setShowTestResult] = useState(false);
  const [activeSection, setActiveSection] = useState('main');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Отлично! Вы подписались на рассылку', {
        description: 'Полезные советы будут приходить на вашу почту'
      });
      setEmail('');
    }
  };

  const testQuestions = [
    {
      id: 1,
      question: 'Как часто вы обсуждаете с ребенком его эмоции и чувства?',
      options: [
        { value: 'a', label: 'Каждый день, это важная часть общения' },
        { value: 'b', label: 'Несколько раз в неделю' },
        { value: 'c', label: 'Только когда возникают проблемы' },
        { value: 'd', label: 'Редко обсуждаем эмоции' }
      ]
    },
    {
      id: 2,
      question: 'Что вы делаете, когда ребенок капризничает?',
      options: [
        { value: 'a', label: 'Спокойно выясняю причину и помогаю справиться' },
        { value: 'b', label: 'Пытаюсь отвлечь чем-то интересным' },
        { value: 'c', label: 'Жду, пока сам успокоится' },
        { value: 'd', label: 'Строго запрещаю капризы' }
      ]
    },
    {
      id: 3,
      question: 'Как вы реагируете на детские ошибки?',
      options: [
        { value: 'a', label: 'Разбираем вместе и учимся на них' },
        { value: 'b', label: 'Объясняю, как правильно' },
        { value: 'c', label: 'Указываю на ошибку' },
        { value: 'd', label: 'Расстраиваюсь и критикую' }
      ]
    },
    {
      id: 4,
      question: 'Как вы поощряете успехи ребенка?',
      options: [
        { value: 'a', label: 'Хвалю за усилия и процесс, а не только за результат' },
        { value: 'b', label: 'Делаю подарки за хорошие оценки' },
        { value: 'c', label: 'Говорю «молодец» когда вспомню' },
        { value: 'd', label: 'Считаю, что это его обязанность' }
      ]
    },
    {
      id: 5,
      question: 'Ребенок жалуется на усталость от учебы. Ваши действия?',
      options: [
        { value: 'a', label: 'Обсуждаю нагрузку и корректирую расписание' },
        { value: 'b', label: 'Предлагаю сделать перерыв' },
        { value: 'c', label: 'Говорю, что всем тяжело' },
        { value: 'd', label: 'Настаиваю закончить все уроки' }
      ]
    },
    {
      id: 6,
      question: 'Как часто вы проводите время один на один с ребенком?',
      options: [
        { value: 'a', label: 'Регулярно выделяю время для общения' },
        { value: 'b', label: 'По выходным стараемся что-то делать вместе' },
        { value: 'c', label: 'Когда есть свободное время' },
        { value: 'd', label: 'Редко, много дел' }
      ]
    },
    {
      id: 7,
      question: 'Ребенок просит завести домашнее животное. Что вы делаете?',
      options: [
        { value: 'a', label: 'Обсуждаем ответственность и принимаем решение вместе' },
        { value: 'b', label: 'Обещаю подумать' },
        { value: 'c', label: 'Объясняю, почему сейчас нельзя' },
        { value: 'd', label: 'Сразу отказываю' }
      ]
    },
    {
      id: 8,
      question: 'Как вы устанавливаете правила и границы?',
      options: [
        { value: 'a', label: 'Обсуждаем правила вместе и объясняю их смысл' },
        { value: 'b', label: 'Устанавливаю четкие правила' },
        { value: 'c', label: 'Правила меняются в зависимости от ситуации' },
        { value: 'd', label: 'Строгая дисциплина без обсуждений' }
      ]
    }
  ];

  const handleTestAnswer = (questionId: number, value: string) => {
    setTestAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentTest < testQuestions.length - 1) {
      setCurrentTest(prev => prev + 1);
    } else {
      setShowTestResult(true);
    }
  };

  const calculateTestResult = () => {
    const aCount = Object.values(testAnswers).filter(v => v === 'a').length;
    const bCount = Object.values(testAnswers).filter(v => v === 'b').length;
    
    if (aCount >= 6) return { 
      title: 'Осознанный родитель', 
      desc: 'Вы отлично понимаете эмоциональные потребности ребенка и умеете выстраивать доверительные отношения! Ваш подход основан на уважении и эмпатии.' 
    };
    if (aCount >= 4 || (aCount >= 3 && bCount >= 3)) return { 
      title: 'Внимательный родитель', 
      desc: 'Вы на правильном пути! Продолжайте развивать эмоциональный интеллект вместе с ребенком. У вас хороший баланс заботы и поддержки.' 
    };
    if (aCount >= 2) return { 
      title: 'Развивающийся родитель', 
      desc: 'У вас есть потенциал! Почитайте наши статьи о детской психологии для улучшения взаимопонимания. Небольшие изменения дадут большой результат.' 
    };
    return { 
      title: 'Учащийся родитель', 
      desc: 'Воспитание — это навык, который можно развить! Начните с малого: выделяйте время на разговоры с ребенком о его чувствах. Наши материалы помогут вам.' 
    };
  };

  const articles = [
    {
      id: 1,
      category: '3-7 лет',
      title: 'Как научить ребенка справляться с эмоциями',
      excerpt: 'Дошкольный возраст — время бурных эмоций. Узнайте, как помочь малышу их понимать и контролировать.',
      icon: 'Heart'
    },
    {
      id: 2,
      category: '7-12 лет',
      title: 'Школьные конфликты: как реагировать родителям',
      excerpt: 'Ссоры с одноклассниками — нормальная часть социализации. Разбираем правильную стратегию поддержки.',
      icon: 'Users'
    },
    {
      id: 3,
      category: '12-16 лет',
      title: 'Подростковый кризис: инструкция для родителей',
      excerpt: 'Переходный возраст — испытание для всей семьи. Как сохранить контакт и понимание.',
      icon: 'Sparkles'
    }
  ];

  const situations = [
    {
      id: 1,
      situation: 'Ребенок: "Ты меня не любишь!"',
      response: 'Я тебя очень люблю. Мне кажется, ты расстроен из-за чего-то. Расскажи мне, что случилось?',
      explanation: 'Признаем чувства ребенка и помогаем выразить истинную причину обиды.'
    },
    {
      id: 2,
      situation: 'Ребенок: "Я не буду это делать!"',
      response: 'Я вижу, ты не хочешь. Можешь объяснить почему? Давай вместе подумаем, как сделать это проще.',
      explanation: 'Вместо конфликта предлагаем сотрудничество и выясняем причину отказа.'
    },
    {
      id: 3,
      situation: 'Ребенок: "Все дети так делают!"',
      response: 'Понимаю, тебе важно быть как все. Давай обсудим, почему это важно для тебя и найдем решение вместе.',
      explanation: 'Показываем, что понимаем желание принадлежать к группе, и учим критически мыслить.'
    },
    {
      id: 4,
      situation: 'Ребенок: "Я тебя ненавижу!"',
      response: 'Я слышу, что ты очень зол прямо сейчас. Злиться — это нормально. Когда успокоишься, мы поговорим.',
      explanation: 'Не принимаем слова на свой счет, признаем право на эмоцию и даем время остыть.'
    },
    {
      id: 5,
      situation: 'Ребенок: "У меня ничего не получается!"',
      response: 'Я вижу, ты стараешься, и это сложно. Давай разберем по шагам, что уже получилось хорошо?',
      explanation: 'Поддерживаем усилия, помогаем увидеть прогресс и разбиваем задачу на части.'
    },
    {
      id: 6,
      situation: 'Ребенок: "Ты всегда на стороне брата/сестры!"',
      response: 'Я люблю вас обоих одинаково. Расскажи, что тебя обидело? Твои чувства важны для меня.',
      explanation: 'Даем ребенку почувствовать, что его слышат, и исследуем причину ревности.'
    },
    {
      id: 7,
      situation: 'Ребенок: "Я боюсь идти в школу"',
      response: 'Спасибо, что поделился. Страх — это нормально. Расскажи подробнее, что именно тебя пугает?',
      explanation: 'Благодарим за откровенность, нормализуем эмоцию и выясняем конкретную причину.'
    },
    {
      id: 8,
      situation: 'Ребенок: "Мне скучно, не знаю чем заняться"',
      response: 'Скука — это возможность придумать что-то новое! Давай вместе подумаем или ты можешь исследовать сам?',
      explanation: 'Учим справляться со скукой как ресурсом для творчества, предлагаем поддержку, но не развлекаем.'
    },
    {
      id: 9,
      situation: 'Ребенок: "Почему я должен слушаться?"',
      response: 'Хороший вопрос! Правила нужны для безопасности и уважения друг к другу. Давай обсудим, что тебя смущает?',
      explanation: 'Объясняем смысл правил и вовлекаем в диалог, развивая критическое мышление.'
    },
    {
      id: 10,
      situation: 'Ребенок: "Мне никто не хочет дружить"',
      response: 'Мне очень жаль, что тебе грустно. Расскажи, что произошло? Давай подумаем, как найти друзей.',
      explanation: 'Сопереживаем, выясняем ситуацию и помогаем выработать стратегию социализации.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={28} />
              <h1 className="text-2xl font-bold text-primary">Растём вместе</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveSection('main')}>Главная</Button>
              <Button variant="ghost" onClick={() => setActiveSection('articles')}>Статьи</Button>
              <Button variant="ghost" onClick={() => setActiveSection('tests')}>Тесты</Button>
              <Button variant="ghost" onClick={() => setActiveSection('situations')}>Ситуации</Button>
              <Button variant="ghost" onClick={() => setActiveSection('about')}>О проекте</Button>
            </div>
          </div>
        </div>
      </nav>

      {activeSection === 'main' && (
        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Психология развития детей<br />и подростков
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Практические советы, научные подходы и готовые решения для воспитания счастливых детей
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gap-2" onClick={() => setActiveSection('tests')}>
                <Icon name="Brain" size={20} />
                Пройти тест
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => setActiveSection('articles')}>
                <Icon name="BookOpen" size={20} />
                Читать статьи
              </Button>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="hover:shadow-lg transition-shadow animate-scale-in">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="BookOpen" className="text-primary" size={24} />
                </div>
                <CardTitle>Экспертные статьи</CardTitle>
                <CardDescription>
                  Научно обоснованные материалы по возрастным категориям
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Brain" className="text-primary" size={24} />
                </div>
                <CardTitle>Интерактивные тесты</CardTitle>
                <CardDescription>
                  Оцените свой стиль воспитания и получите рекомендации
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" className="text-primary" size={24} />
                </div>
                <CardTitle>Готовые ответы</CardTitle>
                <CardDescription>
                  Что сказать ребенку в сложных ситуациях и спорах
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          <section className="bg-white rounded-2xl p-8 mb-16 shadow-sm">
            <div className="max-w-2xl mx-auto text-center">
              <Icon name="Mail" className="text-primary mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold mb-4">Получайте полезные советы на почту</h3>
              <p className="text-muted-foreground mb-6">
                Каждую неделю мы отправляем новые статьи и практические рекомендации
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="ваш@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit">Подписаться</Button>
              </form>
            </div>
          </section>
        </main>
      )}

      {activeSection === 'articles' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-8 text-center">Статьи по возрастам</h2>
          <Tabs defaultValue="3-7" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="3-7">3-7 лет</TabsTrigger>
              <TabsTrigger value="7-12">7-12 лет</TabsTrigger>
              <TabsTrigger value="12-16">12-16 лет</TabsTrigger>
            </TabsList>
            <TabsContent value="3-7" className="space-y-4">
              {articles.filter(a => a.category === '3-7 лет').map(article => (
                <Card key={article.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={article.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <CardTitle className="mb-2">{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="7-12" className="space-y-4">
              {articles.filter(a => a.category === '7-12 лет').map(article => (
                <Card key={article.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={article.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <CardTitle className="mb-2">{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="12-16" className="space-y-4">
              {articles.filter(a => a.category === '12-16 лет').map(article => (
                <Card key={article.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={article.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <CardTitle className="mb-2">{article.title}</CardTitle>
                        <CardDescription>{article.excerpt}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      )}

      {activeSection === 'tests' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Тест: Какой вы родитель?</h2>
            
            {!showTestResult ? (
              <Card>
                <CardHeader>
                  <div className="mb-4">
                    <Progress value={((currentTest + 1) / testQuestions.length) * 100} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Вопрос {currentTest + 1} из {testQuestions.length}
                    </p>
                  </div>
                  <CardTitle className="text-2xl">{testQuestions[currentTest].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={testAnswers[testQuestions[currentTest].id]}
                    onValueChange={(value) => handleTestAnswer(testQuestions[currentTest].id, value)}
                  >
                    {testQuestions[currentTest].options.map(option => (
                      <div key={option.value} className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={option.value} id={`q${currentTest}-${option.value}`} />
                        <Label htmlFor={`q${currentTest}-${option.value}`} className="cursor-pointer flex-1">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!testAnswers[testQuestions[currentTest].id]}
                    className="w-full mt-6"
                  >
                    {currentTest < testQuestions.length - 1 ? 'Следующий вопрос' : 'Показать результат'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Trophy" className="text-primary" size={40} />
                  </div>
                  <CardTitle className="text-3xl mb-2">{calculateTestResult().title}</CardTitle>
                  <CardDescription className="text-lg">{calculateTestResult().desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => {
                    setCurrentTest(0);
                    setTestAnswers({});
                    setShowTestResult(false);
                  }}>
                    Пройти тест заново
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      )}

      {activeSection === 'situations' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Что ответить ребенку?</h2>
            <p className="text-center text-muted-foreground mb-8">
              Готовые ответы на типичные детские фразы с пояснениями психолога
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {situations.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`} className="border rounded-lg px-6 bg-white">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Icon name="MessageCircle" className="text-primary flex-shrink-0" size={24} />
                      <span className="font-semibold">{item.situation}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-accent/50 p-4 rounded-lg mb-3">
                      <p className="font-medium text-primary mb-1">Рекомендуемый ответ:</p>
                      <p className="italic">"{item.response}"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Lightbulb" className="text-muted-foreground flex-shrink-0 mt-1" size={18} />
                      <p className="text-sm text-muted-foreground">{item.explanation}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
      )}

      {activeSection === 'about' && (
        <main className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">О проекте</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Target" className="text-primary" size={28} />
                    Наша миссия
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы создали "Растём вместе", чтобы помочь родителям лучше понимать своих детей 
                    и находить правильные подходы в воспитании. Наши материалы основаны на современных 
                    научных исследованиях в области детской психологии.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Users" className="text-primary" size={28} />
                    Для кого этот сайт
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Для родителей детей от 3 до 16 лет, которые хотят выстроить доверительные отношения 
                    с ребенком, научиться эффективно решать конфликты и поддерживать эмоциональное 
                    благополучие всей семьи.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Star" className="text-primary" size={28} />
                    Что мы предлагаем
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span>Статьи по возрастным категориям с конкретными советами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span>Интерактивные тесты для самопознания стиля воспитания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span>Готовые фразы для сложных разговоров с детьми</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={18} />
                      <span>Email-рассылку с еженедельными полезными материалами</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      )}

      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Растём вместе. Психология развития детей и подростков</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;