"use client"

import { useState, useEffect } from "react"
import { Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWaitlistForm } from "@/hooks/use-waitlist-form"
import { useVisitorTracking } from "@/hooks/use-visitor-tracking"
import { SuccessModal } from "@/components/success-modal"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { EmailModal } from "@/components/email-modal"
import { Logo } from "@/components/logo"

export default function Page() {
  const { email, setEmail, advice, setAdvice, isLoading, showSuccess, handleSubmit, setShowSuccess } = useWaitlistForm()

  // Track visitor on page load
  useVisitorTracking()

  const [mounted, setMounted] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const pricingPlans = [
    {
      name: "FREE TRIAL",
      price: "₩0",
      period: "7일 무료 체험",
      features: ["모든 프리셋 체험", "미리보기 가능", "워터마크 포함"],
      cta: "무료 시작하기",
      popular: false,
    },
    {
      name: "STARTER",
      price: "₩4,900",
      period: "/월",
      features: ["월 5장 편집", "모든 프리셋 사용", "워터마크 없음", "신규 프리셋 우선 체험"],
      cta: "사전 등록하기",
      popular: true,
    },
    {
      name: "PRO",
      price: "₩9,900",
      period: "/월",
      features: ["무제한 편집", "모든 프리셋 접근", "독점 프리셋 사용", "월 1회 편집 상담"],
      cta: "사전 등록하기",
      popular: false,
    },
  ]

  const handlePresetClick = (presetName: string) => {
    setSelectedPreset(presetName)
    setShowEmailModal(true)
  }

  const handlePricingClick = () => {
    setSelectedPreset(null)
    setShowEmailModal(true)
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
                    onClick={() => handlePricingClick()}
                  >
                    무료로 시작하기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <p className="text-sm text-slate-500">신용카드 정보 불필요</p>
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
                      { icon: "🎯", title: "모든 환경에서 작동", desc: "실내, 실외, 낮, 밤 어디서나" },
                      { icon: "🔄", title: "실시간 미리보기", desc: "적용 전 먼저 확인하고 선택" },
                      { icon: "💰", title: "월 4,900원", desc: "한 번 사면 끝이 아닌 구독형 서비스" },
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
                      onClick={() => handlePricingClick()}
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
                { value: "98%", label: "만족도" },
                { value: "12개", label: "도시 프리셋" },
                { value: "30초", label: "평균 편집 시간" },
                { value: "₩4,900", label: "시작 가격" },
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
                title: "프리셋 선택",
                desc: "실시간 미리보기로 즉시 확인",
                detail: "도쿄부터 파리까지 12가지 감성",
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
            <p className="text-lg text-slate-600">12가지 도시의 감성</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {presets.map((preset, idx) => (
              <div
                key={preset.id}
                onClick={() => handlePresetClick(preset.name)}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
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
                </div>

                {/* Card Info - Overlay */}
                <div className="absolute inset-0 rounded-lg flex flex-col justify-end p-4 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent">
                  <h3 className="font-semibold text-white text-lg">{preset.name}</h3>
                  <p className="text-slate-300 text-sm opacity-80">{preset.photographer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">요금제</h2>
            <p className="text-lg text-slate-600">당신에게 맞는 플랜</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl transition-all duration-300 ${
                  plan.popular
                    ? "md:scale-105 md:-translate-y-4 bg-white shadow-2xl border-2 border-amber-400"
                    : "bg-white shadow-lg border border-slate-200 hover:border-slate-300 hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      인기 선택
                    </span>
                  </div>
                )}

                <div className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6">{plan.name}</h3>
                    <div className="space-y-2">
                      <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                      <p className="text-slate-600 text-sm">{plan.period}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handlePricingClick()}
                    className={`w-full h-12 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4 pt-8 border-t border-slate-200">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <span className="text-xs font-bold text-white">✓</span>
                        </div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
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

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handlePricingClick()
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 rounded-lg border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
            />
            <Button
              type="submit"
              className="h-12 px-8 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              출시 알림 받기
            </Button>
          </form>
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

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          presetName={selectedPreset}
          email={email}
          setEmail={setEmail}
          advice={advice}
          setAdvice={setAdvice}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  )
}
