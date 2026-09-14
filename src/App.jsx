import React, { useState } from 'react';
import { Heart, Globe, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';

const questionsData = [
  { id: 1, en: "I felt bothered by things that usually don't bother me.", ar: "شعرت بالانزعاج من أمور لم تكن تزعجني في العادة." },
  { id: 2, en: "I did not feel like eating; my appetite was poor.", ar: "لم تكن لدي رغبة في تناول الطعام، وكانت شهيتي ضعيفة." },
  { id: 3, en: "I felt that I could not shake off the blues even with help from my family or friends.", ar: "شعرت أنني غير قادر على التخلص من الحزن حتى بمساعدة عائلتي أو أصدقائي." },
  { id: 4, en: "I felt I was just as good as other people.", ar: "شعرت أنني لست أقل شأناً من الآخرين.", isPositive: true },
  { id: 5, en: "I had trouble keeping my mind on what I was doing.", ar: "وجدت صعوبة في التركيز على ما أقوم به." },
  { id: 6, en: "I felt depressed and downhearted.", ar: "شعرت بالإحباط والاكتئاب." },
  { id: 7, en: "I felt that everything I did was an effort.", ar: "شعرت أن كل شيء أقوم به يتطلب مني جهداً شاقاً." },
  { id: 8, en: "I felt hopeful about the future.", ar: "شعرت بالأمل تجاه المستقبل.", isPositive: true },
  { id: 9, en: "I thought my life had been a failure.", ar: "شعرت وكأن حياتي كانت عبارة عن فشل." },
  { id: 10, en: "I felt fearful or anxious about things.", ar: "شعرت بالخوف أو القلق بشأن الأشياء من حولي." },
  { id: 11, en: "My sleep was restless and disturbed.", ar: "كان نومي غير مريح ومضطرباً." },
  { id: 12, en: "I was happy and content.", ar: "شعرت بالسعادة والرضا.", isPositive: true },
  { id: 13, en: "I talked less than usual.", ar: "تحدثت أقل بكثير من العادة." },
  { id: 14, en: "I felt lonely, as if I had no one.", ar: "شعرت بالوحدة، وكأنه ليس لدي أحد." },
  { id: 15, en: "People were unfriendly or distant towards me.", ar: "شعرت أن الناس غير ودودين أو بعيدون عني." },
  { id: 16, en: "I enjoyed life and its small moments.", ar: "استمتعت بالحياة وبلحظاتها الصغيرة.", isPositive: true },
  { id: 17, en: "I had crying spells or felt like crying.", ar: "نتابتني نوبات بكاء أو رغبة شديدة في البكاء." },
  { id: 18, en: "I felt sad and heavy-hearted.", ar: "شعرت بحزن وثقل في قلبي." },
  { id: 19, en: "I felt that people dislike me.", ar: "شعرت أن الناس لا يحبونني." },
  { id: 20, en: "I could not get 'going' or find motivation to start tasks.", ar: "لم أستطع تحفيز نفسي للبدء في المهام اليومية." }
];

const options = [
  { value: 0, labelEn: "Rarely or none of the time (less than 1 day)", labelAr: "نادراً أو لا أبداً (أقل من يوم)" },
  { value: 1, labelEn: "Some or a little of the time (1-2 days)", labelAr: "بعض الوقت (من 1 إلى 2 أيام)" },
  { value: 2, labelEn: "Occasionally / a moderate amount (3-4 days)", labelAr: "أحياناً / بشكل متوسط (من 3 إلى 4 أيام)" },
  { value: 3, labelEn: "Most or all of the time (5-7 days)", labelAr: "معظم الوقت أو دائماً (من 5 إلى 7 أيام)" }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const isRtl = lang === 'ar';

  const handleSelectOption = (val) => {
    const updated = { ...answers, [currentIndex]: val };
    setAnswers(updated);
    if (currentIndex < questionsData.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 180);
    } else {
      setTimeout(() => setIsCompleted(true), 200);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const resetTest = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setStarted(false);
  };

  const calculateScore = () => {
    let score = 0;
    questionsData.forEach((q, idx) => {
      const val = answers[idx] !== undefined ? answers[idx] : 0;
      score += q.isPositive ? 3 - val : val;
    });
    return score;
  };

  const getResult = (score) => {
    if (score <= 15) {
      return {
        titleEn: "Minimal Symptoms",
        titleAr: "أعراض بسيطة أو منعدمة",
        descEn: "You are currently experiencing very low levels of distress. Keep prioritizing your self-care and mental wellness!",
        descAr: "تمر بمستويات بسيطة جداً من الضغط النفسي. استمر في الاهتمام بنفسك وصحتك النفسية!"
      };
    } else if (score <= 21) {
      return {
        titleEn: "Mild Depressive Symptoms",
        titleAr: "أعراض اكتئاب خفيفة",
        descEn: "You may be facing some emotional fatigue. Rest, gentle routines, and talking to close friends can bring clarity.",
        descAr: "قد تكون تمر ببعض الإرهاق النفسي. الراحة والحديث مع شخص مقرب قد يساعدك كثيراً."
      };
    } else if (score <= 28) {
      return {
        titleEn: "Moderate Depressive Symptoms",
        titleAr: "أعراض اكتئاب متوسطة",
        descEn: "You are carrying a noticeable emotional weight right now. Reaching out to a counselor or supportive loved one is highly recommended.",
        descAr: "تحمل عبئاً نفسياً ملحوظاً في هذه الفترة. التواصل مع مختص أو شخص قريب سيكون خطوة ممتازة."
      };
    }
    return {
      titleEn: "Significant Depressive Symptoms",
      titleAr: "أعراض اكتئاب شديدة",
      descEn: "Your responses show heavy emotional strain. Please remember that seeking professional support is a strong and healthy step forward.",
      descAr: "توضح الإجابات وجود ضغط نفسي وحزن ثقيل. طلب المساعدة من أخصائي نفسي هو خطوة شجاعة ومهمة جداً."
    };
  };

  const progressPercent = Math.round(((currentIndex + 1) / questionsData.length) * 100);
  const score = calculateScore();
  const result = getResult(score);
  const answeredCount = Object.keys(answers).length;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FBF5DD] text-[#0D530E] selection:bg-[#E7E1B1] selection:text-[#0D530E] antialiased"
      style={{ fontFamily: "'Outfit','IBM Plex Sans Arabic','Segoe UI',system-ui,sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-[#FBF5DD]/80 backdrop-blur-xl border-b border-[#E7E1B1]/70">
        <div className="mx-auto max-w-6xl px-5 md:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-[#306D29] flex items-center justify-center shadow-sm shadow-[#306D29]/20 shrink-0">
              <Heart className="w-[18px] h-[18px] md:w-5 md:h-5 text-[#FBF5DD] fill-[#FBF5DD]" />
            </div>
            <span className="text-[19px] md:text-[22px] font-extrabold tracking-tight text-[#0D530E]">
              Maladh <span className="font-light text-[#306D29]">|</span> <span className="font-bold">ملاذ</span>
            </span>
          </div>

          {/* Language toggle — pill shaped */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#306D29] bg-transparent px-5 py-2 text-sm font-semibold text-[#306D29] shadow-sm hover:bg-[#306D29] hover:text-[#FBF5DD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306D29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF5DD] transition-all duration-200"
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="tracking-wide">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center px-4 md:px-6 py-8 md:py-12">
        <div className="w-full max-w-[640px]">
          {/* Hero Section */}
          {!started && !isCompleted && (
            <section className="text-center py-6 md:py-10 animate-in fade-in">
              {/* Tag badge */}
              <div className="inline-flex items-center gap-2 bg-[#E7E1B1] text-[#306D29] px-4 py-1.5 rounded-full text-xs md:text-[13px] font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 opacity-70" />
                <span>{lang === 'en' ? 'A Safe Place for Your Mind' : 'مساحة آمنة لراحتك النفسية'}</span>
              </div>

              <h1 className="mt-6 text-[30px] md:text-[42px] font-extrabold leading-[1.15] tracking-tight text-[#0D530E] text-balance">
                {lang === 'en' ? (
                  <>
                    Understand Your Feelings <br className="hidden md:block" />
                    <span className="text-[#306D29]">with Science &amp; Compassion</span>
                  </>
                ) : (
                  <>افهم مشاعرك باختبار علمي هادئ وموثوق</>
                )}
              </h1>

              <p className="mt-4 md:mt-5 text-[15px] md:text-[17px] leading-7 text-[#306D29]/90 max-w-[52ch] mx-auto font-medium">
                {lang === 'en'
                  ? 'Welcome to Maladh. Take a quiet moment for yourself with a clinically validated self-assessment designed to help you reflect on your emotional well-being — gently, privately, and at your own pace.'
                  : 'مرحباً بك في ملاذ. خذ لحظة هادئة لنفسك مع هذا التقييم الذاتي المعتمد علمياً، لمساعدتك في فهم حالتك النفسية بكل هدوء وخصوصية.'}
              </p>

              {/* CTA */}
              <div className="mt-8 md:mt-10">
                <button
                  onClick={() => setStarted(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#306D29] text-[#FBF5DD] px-8 md:px-10 py-3.5 md:py-4 rounded-full text-[17px] md:text-lg font-bold shadow-[0_8px_24px_rgba(48,109,41,0.25)] hover:bg-[#0D530E] hover:shadow-[0_12px_28px_rgba(48,109,41,0.30)] hover:-translate-y-[1px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306D29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF5DD] transition-all duration-200"
                >
                  <span>{lang === 'en' ? 'Start Free Assessment' : 'ابدأ الاختبار الآن'}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
                <p className="mt-3 text-xs font-medium text-[#306D29]/60">
                  {lang === 'en' ? `20 questions • ~3 minutes • ${answeredCount > 0 ? 'Continue where you left off' : 'Completely private'}` : '20 سؤالاً • حوالي 3 دقائق • خصوصية تامة'}
                </p>
              </div>

              {/* Trust / disclaimer */}
              <div className="mt-10 md:mt-14 flex items-center justify-center gap-2 border-t border-[#E7E1B1] pt-6 text-xs md:text-[13px] font-medium text-[#306D29]/80 px-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-[#306D29]" />
                <span className="leading-relaxed">
                  {lang === 'en' ? 'This tool is for self-awareness only, not a medical diagnosis.' : 'هذا الاختبار للتوعية الذاتية فقط، ولا يعتبر تشخيصاً طبياً.'}
                </span>
              </div>
            </section>
          )}

          {/* Question Card */}
          {started && !isCompleted && (
            <section className="bg-white rounded-[28px] md:rounded-[32px] p-6 md:p-10 shadow-[0_8px_40px_rgba(13,83,14,0.06)] border border-[#E7E1B1]/60 space-y-6 md:space-y-7">
              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold tracking-widest uppercase text-[#306D29]">
                  <span className="tracking-wide">
                    {lang === 'en' ? `Question ${currentIndex + 1} of ${questionsData.length}` : `السؤال ${currentIndex + 1} من ${questionsData.length}`}
                  </span>
                  <span className="tabular-nums bg-[#FBF5DD] border border-[#E7E1B1] px-2.5 py-1 rounded-full text-[#0D530E]">{progressPercent}%</span>
                </div>
                <div className="h-2.5 w-full bg-[#E7E1B1]/60 rounded-full overflow-hidden p-1">
                  <div
                    className="h-full bg-[#306D29] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-2 pt-1">
                <h2 className="text-[19px] md:text-[22px] font-bold leading-7 md:leading-8 text-[#0D530E] text-start text-balance">
                  {lang === 'en' ? questionsData[currentIndex].en : questionsData[currentIndex].ar}
                </h2>
                <p className="text-xs md:text-[13px] font-medium text-[#306D29]/70 text-start">
                  {lang === 'en' ? 'How often have you felt this way during the past week?' : 'كم مرة شعرت بهذا الإحساس خلال الأسبوع الماضي؟'}
                </p>
              </div>

              {/* Options — choice cards */}
              <div className="grid gap-3 md:gap-3.5">
                {options.map((opt) => {
                  const isSelected = answers[currentIndex] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border-2 px-4 md:px-5 py-4 md:py-[18px] text-start text-sm md:text-[14.5px] font-medium leading-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306D29] focus-visible:ring-offset-2 focus-visible:ring-offset-white
                        ${
                          isSelected
                            ? 'border-[#306D29] bg-[#E7E1B1] text-[#0D530E] shadow-sm shadow-[#306D29]/10'
                            : 'border-[#E7E1B1]/70 bg-[#FBF5DD] text-[#0D530E]/90 hover:bg-white hover:border-[#306D29]/30 hover:shadow-sm hover:shadow-[#306D29]/5'
                        }`}
                    >
                      <span className={`${isSelected ? 'font-bold' : 'font-medium'} flex-1 text-start`}>{lang === 'en' ? opt.labelEn : opt.labelAr}</span>
                      <span
                        className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'bg-[#306D29] border-[#306D29] text-white' : 'border-[#306D29]/20 bg-white group-hover:border-[#306D29]/30'
                        }`}
                        aria-hidden
                      >
                        {isSelected ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className="w-2 h-2 rounded-full bg-[#E7E1B1] opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4 border-t border-[#E7E1B1]/60 pt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E7E1B1] bg-white px-5 py-2.5 text-sm font-bold text-[#306D29] shadow-sm hover:bg-[#FBF5DD] hover:border-[#306D29]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306D29] transition-colors"
                >
                  {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span>{lang === 'en' ? 'Previous' : 'السابق'}</span>
                </button>

                <span className="hidden sm:inline text-xs font-medium text-[#306D29]/60 text-center">
                  {answers[currentIndex] !== undefined
                    ? lang === 'en'
                      ? 'Answer saved • Continue'
                      : 'تم حفظ الإجابة • تابع'
                    : lang === 'en'
                      ? 'Select an answer to proceed'
                      : 'اختر إجابة للمتابعة'}
                </span>

                <span className="text-xs font-bold tabular-nums text-[#0D530E]/60">
                  {currentIndex + 1} / {questionsData.length}
                </span>
              </div>
            </section>
          )}

          {/* Results */}
          {isCompleted && (
            <section className="flex flex-col gap-5 md:gap-6 animate-in fade-in">
              {/* Score card */}
              <div className="bg-white rounded-[28px] md:rounded-[32px] p-7 md:p-10 text-center shadow-[0_8px_40px_rgba(13,83,14,0.06)] border border-[#E7E1B1]/60 space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#E7E1B1] text-[#0D530E] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#306D29] animate-pulse" />
                  {lang === 'en' ? result.titleEn : result.titleAr}
                </div>

                <h2 className="text-[24px] md:text-[28px] font-extrabold tracking-tight text-[#0D530E] leading-tight">
                  {lang === 'en' ? 'Your Assessment Result' : 'نتيجة التقييم الخاص بك'}
                </h2>

                <p className="text-[15px] md:text-[16px] leading-7 text-[#306D29] font-medium max-w-[48ch] mx-auto text-balance">
                  {lang === 'en' ? result.descEn : result.descAr}
                </p>

                {/* Score pill */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-3 bg-[#FBF5DD] border border-[#E7E1B1] rounded-full px-5 py-2.5">
                    <span className="text-xs font-bold tracking-widest uppercase text-[#306D29]/70">{lang === 'en' ? 'Score' : 'النتيجة'}</span>
                    <span className="text-lg font-extrabold tabular-nums text-[#0D530E]">{score} / 60</span>
                    <span className="w-px h-4 bg-[#E7E1B1]" />
                    <span className="text-xs font-semibold text-[#306D29]">{progressPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Encouragement box — deep green */}
              <div className="bg-[#306D29] text-[#FBF5DD] rounded-[28px] md:rounded-[32px] p-7 md:p-10 shadow-[0_12px_32px_rgba(48,109,41,0.25)] space-y-4 relative overflow-hidden">
                {/* subtle decoration */}
                <div className="pointer-events-none absolute -top-16 -end-16 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -start-12 w-32 h-32 rounded-full bg-[#E7E1B1]/15 blur-2xl" />

                <div className="relative flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FBF5DD]/15 flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-[#FBF5DD] text-[#FBF5DD]" />
                  </div>
                  <h3 className="text-[18px] md:text-xl font-bold tracking-tight">{lang === 'en' ? 'You Are Not Alone' : 'تذكر أنك لست بمفردك'}</h3>
                </div>

                <p className="relative text-[14px] md:text-[15px] leading-7 text-[#FBF5DD]/95 font-medium text-start">
                  {lang === 'en'
                    ? "Taking this self-assessment is a courageous first step. Depression can trick us into feeling isolated, but your emotions are real and help is always within reach. You don't have to carry this burden by yourself."
                    : "إجراء هذا الاختبار خطوة شجاعة حقيقية. الاكتئاب قد يوهمك أنك وحدك، لكن مشاعرك حقيقية وهناك دائماً أمل ودعم بانتظارك. لست مجبراً على حمل هذا العبء بمفردك."}
                </p>
                <p className="relative text-[13px] md:text-sm font-bold text-[#E7E1B1] text-start">
                  {lang === 'en' ? 'Reach out to someone you trust or a professional. Small steps lead to big light.' : 'تحدث مع شخص ترتاح له أو أخصائي نفسي. الخطوات الصغيرة تبني الأمل.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetTest}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#306D29] bg-white px-7 py-3 text-sm font-bold text-[#306D29] shadow-sm hover:bg-[#306D29] hover:text-[#FBF5DD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306D29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF5DD] transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Retake Assessment' : 'إعادة الاختبار'}</span>
                </button>
                <span className="text-xs text-[#306D29]/60 font-medium hidden sm:block">•</span>
                <span className="text-xs text-[#306D29]/60 font-medium text-center">
                  {lang === 'en' ? 'Your answers stay on this device only.' : 'إجاباتك تبقى على هذا الجهاز فقط.'}
                </span>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7E1B1]/70 py-5 text-center">
        <p className="text-xs font-medium tracking-wide text-[#306D29]/70">Maladh © 2026 — Created with care &amp; compassion. ملاذ — صُنع بعناية ومودّة</p>
      </footer>
    </div>
  );
}
