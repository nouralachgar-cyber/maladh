import React, { useState } from 'react';
import { QUESTIONS, OPTIONS, FEATURES, getSeverityDetails } from './data/questions';

function LotusLogo({ className = "w-16 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M50 67 C28 50 30 24 50 5 C70 24 72 50 50 67Z" stroke="#A99BD8" strokeWidth="3" />
      <path d="M49 67 C25 69 9 54 5 34 C27 31 43 43 49 67Z" stroke="#A99BD8" strokeWidth="3" />
      <path d="M51 67 C75 69 91 54 95 34 C73 31 57 43 51 67Z" stroke="#A4D8D3" strokeWidth="3" />
      <path d="M50 67 C33 50 22 32 23 19 C42 24 52 43 50 67Z" stroke="#B6DDE9" strokeWidth="3" />
      <path d="M50 67 C67 50 78 32 77 19 C58 24 48 43 50 67Z" stroke="#A4D8D3" strokeWidth="3" />
      <path d="M18 58 Q50 79 82 58" stroke="#A99BD8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState('ar'); // Defaulted to Arabic
  const [activeTab, setActiveTab] = useState('home');
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const isAr = lang === 'ar';
  const currentQ = QUESTIONS[currentIndex];

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleSelectOption = (value) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    QUESTIONS.forEach((q) => {
      if (q.id !== 18) {
        total += answers[q.id] || 0;
      }
    });
    return total;
  };

  const score = calculateScore();
  const resultDetails = getSeverityDetails(score);
  const hasSafetyWarning = answers[18] && answers[18] > 0;

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FBFAF8] text-[#293E5E] font-sans">
      
      {/* NAVBAR */}
      <header className="h-24 px-6 md:px-16 flex items-center justify-between gap-6 bg-[#FBFAF8]/95 sticky top-0 z-50 border-b border-purple-100/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <LotusLogo className="w-16 h-12 md:w-20 md:h-14" />
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold text-[#293E5E]">ملاذ</span>
            <span className="text-sm md:text-base font-medium text-[#A99BD8] mt-0.5">Maladh</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            className={`text-base font-medium transition-colors py-1 relative ${activeTab === 'home' ? 'text-[#9284CB] font-semibold border-b-2 border-[#A99BD8]' : 'text-slate-600 hover:text-[#9284CB]'}`}
            onClick={() => setActiveTab('home')}
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </button>
          <button 
            className={`text-base font-medium transition-colors py-1 relative ${activeTab === 'test' ? 'text-[#9284CB] font-semibold border-b-2 border-[#A99BD8]' : 'text-slate-600 hover:text-[#9284CB]'}`}
            onClick={() => setActiveTab('test')}
          >
            {isAr ? 'الاختبار' : 'Test'}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleLanguage} 
            className="bg-white border border-purple-100 text-[#293E5E] px-4 py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-purple-50 transition-colors shadow-sm"
          >
            🌐 {isAr ? 'English' : 'العربية'}
          </button>
          <button 
            onClick={() => setActiveTab('test')} 
            className="bg-[#A99BD8] hover:bg-[#9586CD] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-sm"
          >
            <span>{isAr ? 'ابدأ الاختبار' : 'Take the Test'}</span>
            <span>{isAr ? '←' : '→'}</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {activeTab === 'home' ? (
          <>
            {/* HERO SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] px-6 md:px-16 py-10 bg-gradient-to-r from-[#EEF5F7] via-[#F2F5F6] to-[#E7F4F5]">
              <div className="flex flex-col justify-center py-6">
                <p className="text-[#9689CB] text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
                  {isAr ? 'صحتك النفسية تهمنا' : 'YOUR MENTAL HEALTH MATTERS'}
                </p>
                <h1 className="text-3xl md:text-5xl font-bold text-[#293E5E] leading-tight">
                  {isAr ? 'لست وحدك...' : "You're not alone..."}
                </h1>
                <div className="text-3xl md:text-4xl font-bold text-[#A095D1] mt-2 flex items-center gap-3">
                  <span>ملاذ</span>
                  <span className="text-2xl font-medium text-slate-400">|</span>
                  <span>Maladh</span>
                </div>

                <p className="text-slate-600 text-base leading-relaxed my-6 max-w-xl">
                  {isAr 
                    ? 'مساحة آمنة لفهم مشاعرك. خذ اختبار الاكتئاب واخطُ الخطوة الأولى نحو مستقبل أكثر صحة وإشراقاً.' 
                    : 'A safe space to understand your feelings. Take our depression test and take the first step towards a healthier, brighter you.'}
                </p>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setActiveTab('test')} 
                    className="bg-[#A99BD8] hover:bg-[#9586CD] text-white px-7 py-3.5 rounded-full font-semibold text-base flex items-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-md"
                  >
                    <span>{isAr ? 'ابدأ الاختبار' : 'Take the Test'}</span>
                    <span>{isAr ? '←' : '→'}</span>
                  </button>
                </div>
              </div>

              {/* HERO IMAGE CONTAINER */}
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="w-full max-w-lg bg-white rounded-3xl p-3 shadow-xl border border-purple-50 relative overflow-hidden">
                  <div className="absolute top-6 right-8 italic text-[#A095D1] font-bold text-sm leading-tight text-right z-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-purple-100 shadow-sm">
                    Better<br />Days<br />Ahead ♡
                  </div>
                  <img 
                    src="/maladh-hero.png" 
                    alt="Maladh Hero Illustration" 
                    className="w-full h-[350px] md:h-[420px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16 py-16 bg-[#FBFAF8]">
              {FEATURES.map((feat) => (
                <div key={feat.titleEn} className="p-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold ${feat.bg}`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-[#293E5E] font-bold text-lg mb-1">
                    {isAr ? feat.titleAr : feat.titleEn}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {isAr ? feat.descAr : feat.descEn}
                  </p>
                </div>
              ))}
            </section>
          </>
        ) : (
          /* TEST SECTION */
          <section className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-purple-100">
              {!showResults ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#293E5E] text-sm md:text-base flex items-center gap-2">
                      🧠 {isAr ? 'اختبار الاكتئاب النفسي' : 'Depression Screening'}
                    </span>
                    <span className="bg-purple-50 text-[#9383C7] text-xs md:text-sm font-bold px-3 py-1 rounded-full">
                      {isAr ? `السؤال ${currentIndex + 1} من ${QUESTIONS.length}` : `Question ${currentIndex + 1} of ${QUESTIONS.length}`}
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full h-2 bg-purple-50 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="h-full bg-[#A99BD8] transition-all duration-300"
                      style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>

                  {/* QUESTION */}
                  <h2 className="text-lg md:text-xl font-bold text-[#293E5E] leading-relaxed mb-8">
                    {isAr ? currentQ.ar : currentQ.en}
                  </h2>

                  {/* OPTIONS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {OPTIONS.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt.value)}
                          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                            isSelected 
                              ? 'bg-purple-50 border-[#9383C7] shadow-sm' 
                              : 'bg-slate-50/50 border-slate-200 hover:bg-purple-50/40 hover:border-[#A99BD8]'
                          } ${isAr ? 'text-right' : 'text-left'}`}
                        >
                          <span className="font-bold text-[#293E5E] text-sm md:text-base">
                            {isAr ? opt.titleAr : opt.titleEn}
                          </span>
                          <span className="text-xs font-semibold text-[#8C82B5] bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                            {isAr ? opt.subtitleAr : opt.subtitleEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between items-center pt-2">
                    <button 
                      onClick={handlePrev} 
                      disabled={currentIndex === 0} 
                      className="bg-slate-100 text-[#293E5E] px-6 py-2.5 rounded-full font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
                    >
                      {isAr ? 'السابق' : 'Previous'}
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={answers[currentQ.id] === undefined} 
                      className="bg-[#A99BD8] hover:bg-[#9586CD] text-white px-7 py-2.5 rounded-full font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      {currentIndex === QUESTIONS.length - 1 ? (isAr ? 'إنهاء ورؤية النتيجة' : 'Finish & View Result') : (isAr ? 'التالي' : 'Next')}
                    </button>
                  </div>
                </>
              ) : (
                /* RESULTS SECTION */
                <div className="py-4">
                  <div className="text-center mb-8">
                    <span className="text-3xl mb-2 block">🌿</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#293E5E]">
                      {isAr ? 'نتيجة التقييم النفسي' : 'Your Assessment Results'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {isAr ? 'بناءً على إجاباتك خلال الأسبوعين الماضيين' : 'Based on your answers for the past two weeks'}
                    </p>
                  </div>

                  {/* SCORE & LEVEL BOX */}
                  <div className="bg-gradient-to-b from-purple-50/60 to-white border border-purple-100 p-6 rounded-3xl mb-8 text-center shadow-sm">
                    <p className="text-xs font-bold text-[#8C82B5] uppercase tracking-wider mb-1">
                      {isAr ? 'النتيجة الإجمالية' : 'Total Score'}
                    </p>
                    <h1 className="text-5xl font-extrabold text-[#9383C7] my-2">
                      {score} <span className="text-lg text-slate-400 font-normal">/ 57</span>
                    </h1>

                    {/* SEVERITY BADGE */}
                    <div className={`inline-block mt-3 px-5 py-2 rounded-full border font-bold text-sm md:text-base ${resultDetails.color}`}>
                      {isAr ? resultDetails.levelAr : resultDetails.levelEn}
                    </div>

                    <p className="text-slate-600 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
                      {isAr ? resultDetails.descAr : resultDetails.descEn}
                    </p>
                  </div>

                  {/* SAFETY WARNING IF QUESTION 18 ANSWERED */}
                  {hasSafetyWarning && (
                    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-8 text-rose-800 text-sm leading-relaxed flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <strong className="block font-bold mb-1 text-rose-900">
                          {isAr ? 'ملاحظة هامة جداً لسلامتك:' : 'Important Safety Note:'}
                        </strong>
                        {isAr 
                          ? 'لقد أشرت إلى وجود أفكار تؤذيك أو تشعرك برغبة في الاختفاء. نتمنى منك عدم البقاء وحدك والتحدث فوراً مع أخصائي نفسي أو شخص مقرب تثق به.'
                          : 'You indicated thoughts of harm or wanting to disappear. Please do not stay alone with these thoughts. We strongly urge you to reach out to a professional or a trusted loved one immediately.'}
                      </div>
                    </div>
                  )}

                  {/* RECOMMENDATIONS & TIPS */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
                    <h3 className="font-bold text-[#293E5E] text-base md:text-lg mb-4 flex items-center gap-2">
                      💡 {isAr ? 'نصائح وإرشادات مخصصة لك:' : 'Personalized Recommendations:'}
                    </h3>
                    <ul className="space-y-3">
                      {(isAr ? resultDetails.tipsAr : resultDetails.tipsEn).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <span className="text-[#A99BD8] font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                    <button 
                      onClick={() => { setAnswers({}); setCurrentIndex(0); setShowResults(false); }} 
                      className="w-full sm:w-auto bg-[#A99BD8] hover:bg-[#9586CD] text-white px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-md"
                    >
                      {isAr ? 'إعادة الاختبار' : 'Retake Test'}
                    </button>
                    <button 
                      onClick={() => setActiveTab('home')} 
                      className="w-full sm:w-auto bg-slate-100 text-[#293E5E] hover:bg-slate-200 px-8 py-3 rounded-full font-semibold text-sm transition-colors"
                    >
                      {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}