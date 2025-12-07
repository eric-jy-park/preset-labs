"use client"

import { useState, useEffect } from "react"
import { Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useVisitorTracking } from "@/hooks/use-visitor-tracking"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Logo } from "@/components/logo"

export default function Page() {
  const router = useRouter()

  // Track visitor on page load
  useVisitorTracking()

  const [mounted, setMounted] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to sign-in
  const handleGetStarted = () => {
    router.push('/sign-in?redirect_url=/editor')
  }

  const presets = [
    {
      id: 1,
      name: "Tokyo Neon",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Jesse Caris",
    },
    {
      id: 2,
      name: "Paris Golden Hour",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Sam Moghadam",
    },
    {
      id: 3,
      name: "Santorini Blue",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Toa Heftiba",
    },
    {
      id: 4,
      name: "Seoul Night",
      image: "https://images.unsplash.com/photo-5htrsUUbFGI?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Jungwoo Hong",
    },
    {
      id: 5,
      name: "Kyoto Zen",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Everton Vila",
    },
    {
      id: 6,
      name: "NYC Moody",
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Unsplash",
    },
    {
      id: 7,
      name: "Bali Tropics",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Leio McLaren",
    },
    {
      id: 8,
      name: "Vancouver Rain",
      image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Jeremy Bishop",
    },
    {
      id: 9,
      name: "Barcelona Warm",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Raphael Lovaski",
    },
    {
      id: 10,
      name: "Iceland Mist",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Davide Cantelli",
    },
    {
      id: 11,
      name: "Dubai Desert",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Edmond Dantès",
    },
    {
      id: 12,
      name: "Prague Vintage",
      image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=600&h=800&q=80",
      photographer: "Thomas Kelley",
    },
  ]

  const creditPlans = [
    {
      name: "STARTER",
      price: "₩4,900",
      credits: "10 크레딧",
      features: [
        "프리셋 5개 구매 가능",
        "한 번 구매 시 영구 소유",
        "크레딧 무기한 사용",
        "워터마크 없음",
      ],
      pricePerUnit: "프리셋 1개당 ₩980",
      popular: false,
    },
    {
      name: "POPULAR",
      price: "₩12,900",
      credits: "30 크레딧",
      discount: "12% 할인",
      features: [
        "프리셋 15개 구매 가능",
        "한 번 구매 시 영구 소유",
        "크레딧 무기한 사용",
        "신규 프리셋 우선 알림",
        "워터마크 없음",
      ],
      pricePerUnit: "프리셋 1개당 ₩860",
      popular: true,
    },
    {
      name: "PRO",
      price: "₩39,000",
      credits: "100 크레딧",
      discount: "20% 할인",
      features: [
        "프리셋 50개 구매 가능",
        "한 번 구매 시 영구 소유",
        "크레딧 무기한 사용",
        "신규 프리셋 최우선 접근",
        "Discord 커뮤니티 초대",
        "워터마크 없음",
      ],
      pricePerUnit: "프리셋 1개당 ₩780",
      popular: false,
    },
  ]

  const subscriptionPlan = {
    name: "UNLIMITED",
    price: "₩9,900",
    period: "/월",
    features: [
      "모든 프리셋 무제한 사용",
      "현재 24개 + 매달 신규 추가",
      "워터마크 없음",
      "언제든 취소 가능",
      "Discord 커뮤니티 초대",
      "신규 프리셋 최우선 접근",
    ],
    note: "한 달에 프리셋 10개 이상 사용 시 유리",
  }

  const faqs = [
    {
      question: "베타 테스트가 뭔가요?",
      answer: "PresetLabs는 현재 **베타 테스트 기간**입니다. 정식 출시 전에 사용자분들의 피드백을 받고 서비스를 개선하기 위한 단계예요. 베타 기간 동안은 **완전 무료**로 모든 기능을 사용하실 수 있습니다."
    },
    {
      question: "10 크레딧으로 무엇을 할 수 있나요?",
      answer: "다운로드 1회당 **2 크레딧**이 사용됩니다. 따라서 10 크레딧으로 **5번의 다운로드**가 가능해요. 다운로드한 사진은 **개인 갤러리**에 자동으로 저장되며, 언제든지 다시 확인할 수 있습니다."
    },
    {
      question: "미리보기도 크레딧을 사용하나요?",
      answer: "아니요! **미리보기는 완전 무료**입니다. 모든 프리셋을 내 사진에 적용해보고, 강도도 조절해보고, 마음에 드는 것만 다운로드하세요. 미리보기는 무제한으로 할 수 있어요."
    },
    {
      question: "다운로드한 사진은 어떻게 되나요?",
      answer: "다운로드한 사진은 **갤러리**에 자동으로 저장됩니다. 언제든지 갤러리에서 확인하고, 다시 다운로드할 수 있어요. **워터마크 없이** 원본 화질 그대로 저장됩니다."
    },
    {
      question: "라이트룸이나 포토샵이 필요한가요?",
      answer: "전혀 필요 없습니다! **웹 브라우저만** 있으면 PC든 맥이든 바로 사용 가능해요. 프로그램 설치도, 복잡한 설정도 필요 없습니다. 클릭 3번이면 끝나요."
    },
    {
      question: "모바일(휴대폰)에서도 되나요?",
      answer: "네! iOS(아이폰, 아이패드)와 Android 모두 지원합니다. Safari, Chrome 같은 브라우저에서 바로 사용하실 수 있어요. 카페에서도, 지하철에서도, 여행지에서도 편집 가능합니다."
    },
    {
      question: "베타가 끝나면 어떻게 되나요?",
      answer: "베타 종료 시점은 **사전에 공지**해드릴 예정입니다. 정식 출시 후에는 유료 서비스로 전환되지만, 베타 참여자분들께는 **특별 할인 혜택**을 제공할 예정이에요. 이미 다운로드한 사진은 계속 사용하실 수 있습니다."
    },
    {
      question: "크레딧이 부족하면 어떻게 하나요?",
      answer: "현재 베타 기간에는 **추가 크레딧 구매가 불가능**합니다. 정식 출시 시 크레딧 구매 및 구독 옵션이 제공될 예정입니다. 베타 참여자분들께 먼저 안내드리겠습니다."
    },
  ]

  const handlePresetClick = (presetName: string) => {
    router.push(`/sign-in?redirect_url=/editor?preset=${presetName}`)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <span className="font-semibold text-lg text-slate-900">PresetLabs</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#presets" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-300">
                프리셋 둘러보기
              </a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-300">
                요금제
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="min-h-screen flex items-center py-20 sm:py-32 px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
                    사진 한 장으로
                    <br />
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                      세계 여행의 감성을
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg">
                    편집 프로그램 없이 웹에서 바로. 클릭 한 번으로 프로 감성 완성. 도쿄부터 파리까지, 12가지 도시의
                    무드를 지금 체험하세요.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-lg font-semibold h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    onClick={handleGetStarted}
                  >
                    무료 체험 시작하기 - 10 크레딧 받기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-sm text-slate-500">신용카드 정보 불필요 · 베타 기간 완전 무료</p>
                </div>

                {/* Social Proof */}
                <div className="pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">2,847명</span>이 이미 체험 중입니다
                  </p>
                </div>
              </div>

              {/* Right Column - Before/After Slider */}
              <div className="animate-fade-in-delay">
                <BeforeAfterSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - New */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-amber-500/20 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-yellow-500/20 rounded-full filter blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold border border-red-500/30">
                이런 경험 있으신가요?
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              유명 작가 프리셋,
              <br />
              <span className="text-slate-400">내 사진엔 왜 안 어울릴까?</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              수만원을 주고 산 프리셋. 작가의 사진에선 완벽했는데, 막상 내 사진에 적용하니 이상하기만 해요.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Problem Points */}
            <div className="space-y-5">
              {[
                { icon: "💸", text: "비싼 돈 주고 샀는데 쓸모가 없어요", subtext: "평균 2-5만원의 프리셋 팩" },
                { icon: "😞", text: "작가의 사진에만 어울리는 색감", subtext: "촬영 환경이 달라 적용이 안 돼요" },
                { icon: "⏰", text: "결국 다시 수동으로 편집", subtext: "시간과 돈을 둘 다 낭비하게 돼요" },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-white font-semibold text-base">{point.text}</p>
                    <p className="text-sm text-slate-400">{point.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Solution */}
            <div className="relative lg:sticky lg:top-24">
              <div className="bg-gradient-to-br from-amber-500/15 to-yellow-500/15 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-amber-500/30 shadow-2xl">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm font-semibold shadow-lg">
                      PresetLabs는 다릅니다
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    모든 사진에
                    <br />
                    자연스럽게 적용되는
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      범용 프리셋
                    </span>
                  </h3>

                  <div className="space-y-4 pt-2">
                    {[
                      { icon: "🎯", title: "범용성을 위해 설계", desc: "다양한 조명 환경에서 테스트 완료" },
                      { icon: "🔄", title: "실시간 미리보기", desc: "구매 전 내 사진으로 먼저 테스트" },
                      { icon: "💰", title: "원하는 방식으로 구매", desc: "필요한 만큼만 구매하거나 무제한 구독" },
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/30 to-yellow-500/30 flex items-center justify-center text-xl border border-amber-500/40">
                          {feature.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-white font-semibold text-base">{feature.title}</p>
                          <p className="text-sm text-slate-300">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleGetStarted}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl font-semibold h-14 shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                    >
                      지금 무료로 체험하기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10개", label: "무료 크레딧" },
                { value: "5번", label: "무료 다운로드" },
                { value: "30초", label: "평균 편집 시간" },
                { value: "무료", label: "베타 기간" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
                간단한 3단계
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              클릭 3번이면
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                프로 감성 완성
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              복잡한 편집 프로그램도, 전문 지식도 필요 없어요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                icon: "📸",
                title: "사진 업로드",
                desc: "드래그 앤 드롭으로 1초 만에 업로드",
                detail: "모든 이미지 포맷 지원",
              },
              {
                number: "02",
                icon: "🎨",
                title: "프리셋 미리보기",
                desc: "실시간으로 내 사진에 적용해보기",
                detail: "마음에 드는 것만 구매",
              },
              {
                number: "03",
                icon: "✨",
                title: "다운로드",
                desc: "원본 화질 그대로 저장",
                detail: "워터마크 없이 바로 사용",
              },
            ].map((step, idx) => (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Connection Line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-amber-300 to-transparent" />
                )}

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                  {/* Icon with Number Badge */}
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 text-5xl group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-700 font-medium">{step.desc}</p>
                    <p className="text-sm text-slate-500">{step.detail}</p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-slate-600 font-medium">
              <span className="text-amber-600 font-bold">평균 30초</span>면 충분합니다
            </p>
          </div>
        </div>
      </section>

      {/* Preset Gallery Section */}
      <section id="presets" className="py-24 sm:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">프리셋 갤러리</h2>
            <p className="text-lg text-slate-600">24가지 도시의 감성</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {presets.map((preset, idx) => (
              <div
                key={preset.id}
                onClick={() => handlePresetClick(preset.name)}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Price Badge */}
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  2 크레딧
                </div>

                {/* Preset Image */}
                <div className="relative aspect-square overflow-hidden bg-slate-200">
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop'
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Preview Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      미리보기
                    </button>
                  </div>
                </div>

                {/* Card Info - Overlay */}
                <div className="absolute inset-0 rounded-lg flex flex-col justify-end p-4 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none">
                  <h3 className="font-semibold text-white text-lg">{preset.name}</h3>
                  <p className="text-slate-300 text-sm opacity-80">{preset.photographer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
              무료로 시작
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">먼저 체험해보세요</h2>
            <p className="text-lg text-slate-600">회원가입만으로 10 크레딧을 무료로 받아보세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Credits Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">10 무료 크레딧</h3>
              <p className="text-slate-600 mb-6">
                회원가입 시 <strong className="text-amber-600">10 크레딧 (5회 다운로드)</strong> 무료 제공
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 워터마크 없음
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 개인 갤러리 자동 저장
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 신용카드 정보 불필요
                </li>
              </ul>
              <Button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-lg font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                무료로 받기
              </Button>
            </div>

            {/* Preview All Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4">👀</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">모든 프리셋 미리보기</h3>
              <p className="text-slate-600 mb-6">
                내 사진으로 <strong className="text-amber-600">모든 프리셋</strong>을 미리 테스트
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 다운로드 전 100% 확인
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 무제한 미리보기
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-amber-500">✓</span> 실시간 강도 조절
                </li>
              </ul>
              <Button
                onClick={() => {
                  const presetsSection = document.getElementById('presets')
                  presetsSection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                프리셋 둘러보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Beta */}
      <section id="pricing" className="py-24 sm:py-32 px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              현재 베타 테스트 중
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">완전 무료로 시작하세요</h2>
            <p className="text-lg text-slate-600">베타 기간 동안 모든 기능을 무료로 체험할 수 있습니다</p>
          </div>

          {/* Beta Free Plan */}
          <div className="relative rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl border-2 border-amber-400">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                BETA - 무료
              </span>
            </div>

            {/* Spacer for badge */}
            <div className="h-6"></div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl" />

            <div className="relative p-10 lg:p-12 space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">베타 테스터 혜택</h3>
                <div className="space-y-2">
                  <div className="text-7xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                    10 크레딧
                  </div>
                  <p className="text-lg text-slate-600">가입 즉시 무료 제공</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-slate-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      <span className="text-2xl">🎁</span> 포함된 혜택
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 flex-shrink-0 mt-1">✓</span>
                        <span className="text-slate-700">10 크레딧 (5회 다운로드)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 flex-shrink-0 mt-1">✓</span>
                        <span className="text-slate-700">모든 프리셋 무제한 미리보기</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 flex-shrink-0 mt-1">✓</span>
                        <span className="text-slate-700">워터마크 없는 원본 화질 다운로드</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-amber-500 flex-shrink-0 mt-1">✓</span>
                        <span className="text-slate-700">개인 갤러리 저장</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      <span className="text-2xl">💡</span> 사용 방법
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 flex-shrink-0 mt-1">1</span>
                        <span className="text-slate-700">회원가입만 하면 10 크레딧 즉시 지급</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 flex-shrink-0 mt-1">2</span>
                        <span className="text-slate-700">다운로드 1회당 2 크레딧 차감</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 flex-shrink-0 mt-1">3</span>
                        <span className="text-slate-700">다운로드한 사진은 갤러리에 저장</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 flex-shrink-0 mt-1">4</span>
                        <span className="text-slate-700">신용카드 정보 불필요</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm text-center text-slate-500">
                    베타 종료 후 유료 서비스 전환 시 사전 공지 예정 · 베타 참여자 특별 할인 제공
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGetStarted}
                className="w-full h-16 rounded-xl font-semibold text-lg bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                무료로 시작하기 - 10 크레딧 받기
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>

          {/* Beta Note */}
          <div className="mt-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-blue-600 font-medium text-sm">💬 베타 기간 중 여러분의 피드백을 기다립니다</span>
            </div>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              정식 출시 시 더 다양한 요금제가 준비될 예정입니다. 베타 참여자분들께는 특별 할인 혜택을 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">자주 묻는 질문</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-slate-200 pb-4"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-start gap-4 text-left py-4 hover:text-amber-600 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-slate-900 hover:text-amber-600 transition-colors">
                    Q. {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed pb-4 pt-2">
                    {faq.answer.split('**').map((part, i) =>
                      i % 2 === 0 ? (
                        <span key={i}>{part}</span>
                      ) : (
                        <strong key={i} className="font-bold text-slate-900">{part}</strong>
                      )
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 px-6 lg:px-8 border-t border-slate-200">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">오늘 시작하세요</h2>
          <p className="text-lg text-slate-600">
            지금 가입하고 무료 프리셋으로 당신의 사진을 변화시켜보세요
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="h-14 px-12 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base"
          >
            무료로 시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <Logo className="w-6 h-6" />
              <span className="font-semibold text-slate-900">PresetLabs</span>
            </div>

            {/* Center: Copyright */}
            <p className="text-sm text-slate-600">© 2025 PresetLabs</p>

            {/* Right: Instagram */}
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
