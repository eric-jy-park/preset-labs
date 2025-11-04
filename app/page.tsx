"use client"

import { useState, useEffect } from "react"
import { Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWaitlistForm } from "@/hooks/use-waitlist-form"
import { SuccessModal } from "@/components/success-modal"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { EmailModal } from "@/components/email-modal"
import { Logo } from "@/components/logo"

export default function Page() {
  const { email, setEmail, advice, setAdvice, isLoading, showSuccess, handleSubmit, setShowSuccess } = useWaitlistForm()

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

      {/* How It Works Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">이렇게 쉽습니다</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                number: "01",
                title: "사진 올리기",
                desc: "갤러리에서 사진을 선택하거나 드래그하세요",
              },
              {
                number: "02",
                title: "프리셋 고르기",
                desc: "12가지 도시 무드 중 원하는 스타일 선택",
              },
              {
                number: "03",
                title: "완성본 받기",
                desc: "보정된 사진을 바로 저장",
              },
            ].map((step) => (
              <div key={step.number} className="space-y-6 group cursor-default">
                <div className="relative">
                  <span className="text-7xl font-bold text-slate-100 absolute -left-4 -top-2">{step.number}</span>
                  <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-white font-semibold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
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
