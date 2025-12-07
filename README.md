

# PresetLabs 📸

> 전문가급 사진 필터를 클릭 한 번으로. 당신의 사진을 작품으로 만들어보세요.

<img width="2043" height="1157" alt="0736368ea74ce8426a637bda9e42dee273586af27defa80ee6cef3e7db97ca58-min" src="https://github.com/user-attachments/assets/3ac37cb5-8fb6-4112-95e7-f166d7132c90" />

<br />

## 🎨 PresetLabs가 뭔가요?

PresetLabs는 전문 사진작가들이 사용하는 필터 프리셋을 누구나 쉽게 적용할 수 있는 웹 기반 사진 편집 서비스입니다. 복잡한 포토샵이나 라이트룸 없이도, 브라우저에서 몇 번의 클릭만으로 Instagram에서 봤던 그 감성적인 사진 톤을 만들 수 있어요.

Lightroom이나 VSCO 같은 전문 툴을 쓰기엔 러닝 커브가 너무 높고, 그렇다고 일반 필터 앱은 결과물이 별로... 그런 고민을 PresetLabs가 해결합니다.

<br />

## ✨ 주요 기능

### 1. 프리미엄 필터 프리셋
- **Tokyo Neon**: 네온사인이 빛나는 도쿄 야경 감성
- **Golden Hour**: 따뜻한 석양빛 세피아 톤
- **Arctic Blue**: 시원하고 정갈한 블루 톤
- **Noir**: 드라마틱한 흑백 무드
- **Vintage Film**: 필름 카메라로 찍은 듯한 빈티지 톤
- **Frost**: 차갑고 선명한 겨울 감성
- 그 외 10+ 개의 전문가 프리셋

### 2. 실시간 미리보기
- 필터를 선택하는 순간 바로 결과를 확인할 수 있어요
- 강도 슬라이더로 0~100% 자유롭게 조절 가능
- 원본과 비교하며 최적의 톤을 찾을 수 있어요

### 3. 크레딧 시스템
- 회원가입하면 **10 크레딧 무료 제공**
- 다운로드 1회당 2 크레딧 사용
- 마음에 드는 결과물만 골라서 다운로드하세요

### 4. 다양한 다운로드 옵션
**포맷 선택**
- JPEG (High/Medium/Low 품질)
- PNG (무손실)

**품질 선택**
- High Quality: JPEG 95% / 최고 화질
- Medium Quality: JPEG 85% / 균형잡힌 용량과 품질
- Low Quality: JPEG 70% / 빠른 업로드용

### 5. 갤러리
- 다운로드한 모든 사진을 한눈에 확인
- 어떤 프리셋을 적용했는지 기록
- 언제든 다시 찾아볼 수 있어요

### 6. 특별한 경험
- **첫 다운로드 피드백**: 첫 사용 후 솔직한 의견을 들려주세요
- **축하 애니메이션**: 다운로드하면 🎉 confetti가 터져요
- **다운로드 완료 모달**: 필터가 적용된 최종 결과물을 한 번 더 확인

<br />

## 🛠 기술 스택

### Frontend
- **Next.js 16** - React Server Components 활용
- **React 19** - 최신 React 기능
- **TypeScript** - 타입 안전성
- **Tailwind CSS 4** - 유틸리티 기반 스타일링
- **Radix UI** - 접근성 좋은 컴포넌트
- **Zustand** - 가벼운 상태 관리
- **Framer Motion** - 부드러운 애니메이션

### Backend & Database
- **Neon PostgreSQL** - 서버리스 데이터베이스
- **Drizzle ORM** - TypeScript ORM
- **Vercel Blob Storage** - 이미지 저장소
- **Clerk** - 사용자 인증 및 관리

### 배포 & 분석
- **Vercel** - 자동 배포 및 호스팅
- **Vercel Analytics** - 성능 모니터링
- **Hotjar** - 사용자 행동 분석

### 기타 라이브러리
- **canvas-confetti** - 축하 애니메이션
- **sonner** - 깔끔한 토스트 알림
- **lucide-react** - 아이콘
- **react-hook-form** - 폼 관리
- **zod** - 스키마 검증

<br />

## 📁 프로젝트 구조

```
preset-labs/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 랜딩 페이지
│   ├── editor/                   # 에디터 페이지
│   │   ├── page.tsx
│   │   └── EditorContent.tsx
│   ├── gallery/                  # 갤러리 페이지
│   │   ├── page.tsx
│   │   └── GalleryContent.tsx
│   ├── sign-in/                  # 로그인 페이지 (Clerk)
│   ├── sign-up/                  # 회원가입 페이지 (Clerk)
│   └── api/                      # API Routes
│       ├── upload/               # 이미지 업로드
│       ├── gallery/              # 갤러리 저장
│       ├── credits/              # 크레딧 관리
│       ├── feedback-given/       # 피드백 제출 확인
│       └── webhook/              # Clerk 웹훅
│
├── components/                   # React 컴포넌트
│   ├── editor/                   # 에디터 관련
│   │   ├── PhotoUpload.tsx       # 사진 업로드
│   │   ├── FilterSelector.tsx    # 필터 선택
│   │   ├── IntensitySlider.tsx   # 강도 조절
│   │   ├── ImagePreview.tsx      # 실시간 미리보기
│   │   └── DownloadButton.tsx    # 다운로드
│   ├── modals/                   # 모달 컴포넌트
│   │   ├── FeedbackModal.tsx     # 피드백 수집
│   │   └── CongratsModal.tsx     # 다운로드 축하
│   └── ui/                       # 재사용 가능한 UI 컴포넌트
│
├── lib/                          # 유틸리티 & 설정
│   ├── db/                       # 데이터베이스
│   │   ├── index.ts              # DB 연결
│   │   └── schema.ts             # 테이블 스키마
│   ├── store/                    # Zustand 상태 관리
│   │   ├── editor-store.ts       # 에디터 상태
│   │   └── credits-store.ts      # 크레딧 상태
│   └── filters/                  # 필터 관련
│       └── presets.ts            # 프리셋 정의
│
├── hooks/                        # Custom React Hooks
│   ├── use-visitor-tracking.ts   # 방문자 추적
│   └── use-waitlist-form.ts      # 대기자 명단
│
└── public/                       # 정적 파일
```

<br />

## 🚀 로컬 환경에서 실행하기

### 1. 사전 준비물

먼저 이것들이 설치되어 있어야 해요:

- **Node.js 18.17 이상** (최신 LTS 버전 권장)
- **pnpm** (빠른 패키지 매니저)
  ```bash
  npm install -g pnpm
  ```
- **Git**

### 2. 저장소 클론

```bash
git clone https://github.com/your-username/preset-labs.git
cd preset-labs
```

### 3. 패키지 설치

```bash
pnpm install
```

### 4. 환경 변수 설정

`.env.local.example` 파일을 복사해서 `.env.local` 파일을 만들어요:

```bash
cp .env.local.example .env.local
```

그리고 아래 서비스들에서 API 키를 발급받아서 `.env.local` 파일에 입력하세요:

#### 4-1. Neon 데이터베이스 설정

1. [Neon](https://neon.tech) 접속 후 회원가입
2. 새 프로젝트 생성
3. Connection String 복사
4. `.env.local`에 입력:

```env
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/presetlabs?sslmode=require
```

#### 4-2. Clerk 인증 설정

1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. 새 애플리케이션 생성
3. API Keys 메뉴에서 키 복사
4. `.env.local`에 입력:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

5. Clerk Dashboard → Settings → Paths 에서 경로 설정:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/editor`
   - After sign-up: `/editor`

#### 4-3. Vercel Blob Storage 설정

1. [Vercel](https://vercel.com) 로그인
2. 프로젝트 생성 (또는 기존 프로젝트 선택)
3. Storage → Blob → Create Database
4. `.env` 탭에서 `BLOB_READ_WRITE_TOKEN` 복사
5. `.env.local`에 입력:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxx
```

#### 4-4. Google Sheets 설정 (선택사항)

피드백과 대기자 명단을 Google Sheets에 저장하려면:

1. Google Apps Script 생성
2. 스크립트 배포 후 URL 복사
3. `hooks/use-visitor-tracking.ts`, `hooks/use-waitlist-form.ts`, `components/modals/FeedbackModal.tsx`에서 `GOOGLE_APPS_SCRIPT_URL` 수정

### 5. 데이터베이스 마이그레이션

Drizzle ORM으로 테이블을 생성해요:

```bash
# 마이그레이션 파일 생성
pnpm drizzle-kit generate

# 데이터베이스에 적용
pnpm drizzle-kit push
```

Drizzle Studio로 DB 확인하기:

```bash
pnpm drizzle-kit studio
```

→ 브라우저에서 `https://local.drizzle.studio` 열림

### 6. 개발 서버 실행

```bash
pnpm dev
```

→ [http://localhost:3000](http://localhost:3000) 접속

<br />

## 📊 데이터베이스 스키마

### users (사용자)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | text | Clerk 사용자 ID (PK) |
| email | text | 이메일 (unique) |
| name | text | 사용자 이름 |
| image | text | 프로필 사진 URL |
| kakaoId | text | 카카오 연동 ID |
| hasSeenWelcome | boolean | 환영 메시지 확인 여부 |
| hasGivenFeedback | boolean | 피드백 제출 여부 |
| createdAt | timestamp | 가입일 |
| updatedAt | timestamp | 수정일 |

### photos (업로드한 사진)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | 사진 ID (PK) |
| userId | text | 사용자 ID (FK) |
| originalUrl | text | Vercel Blob URL |
| fileName | text | 파일명 |
| fileSize | integer | 파일 크기 (bytes) |
| mimeType | text | MIME 타입 |
| width | integer | 가로 크기 |
| height | integer | 세로 크기 |
| uploadedAt | timestamp | 업로드 시간 |
| deletedAt | timestamp | 삭제 시간 (soft delete) |

### savedEdits (저장된 편집본)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | 편집 ID (PK) |
| userId | text | 사용자 ID (FK) |
| photoId | uuid | 사진 ID (FK) |
| presetId | text | 프리셋 ID |
| editedUrl | text | 편집된 이미지 URL |
| createdAt | timestamp | 생성일 |
| isFavorite | boolean | 즐겨찾기 여부 |

### userCredits (크레딧)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | 크레딧 ID (PK) |
| userId | text | 사용자 ID (FK, unique) |
| credits | integer | 남은 크레딧 (기본 10) |
| lastUpdated | timestamp | 마지막 업데이트 |

### gallery (다운로드 갤러리)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | 갤러리 ID (PK) |
| userId | text | 사용자 ID (FK) |
| originalUrl | text | 원본 사진 URL |
| fileName | text | 파일명 |
| width | integer | 가로 크기 |
| height | integer | 세로 크기 |
| presetId | text | 적용된 프리셋 ID |
| presetName | text | 프리셋 표시 이름 |
| filterIntensity | integer | 필터 강도 (0-100) |
| downloadedAt | timestamp | 다운로드 시간 |

<br />

## 🎯 핵심 기능 구현 방식

### 필터 적용 원리

CSS Filters를 Canvas API와 결합해서 실시간으로 필터를 적용해요:

```typescript
// 1. 이미지를 Canvas에 그리기
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

// 2. CSS 필터 적용
ctx.filter = `
  brightness(${brightness})
  contrast(${contrast})
  saturate(${saturate})
  sepia(${sepia})
  grayscale(${grayscale})
  hue-rotate(${hueRotate}deg)
`

// 3. 필터가 적용된 이미지 그리기
ctx.drawImage(img, 0, 0)

// 4. Blob으로 변환해서 다운로드
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob)
  // 다운로드...
})
```

### 크레딧 시스템

- Zustand로 전역 상태 관리
- 다운로드 시 낙관적 업데이트 (Optimistic UI)
- 서버에서 실제 차감 후 동기화

```typescript
// lib/store/credits-store.ts
const deductCredits = async () => {
  const response = await fetch('/api/credits', {
    method: 'POST',
    body: JSON.stringify({ amount: -2 })
  })
  const { credits } = await response.json()
  set({ credits })
  return credits
}
```

### 실시간 미리보기

Zustand 스토어의 상태가 변경되면 즉시 UI에 반영돼요:

```typescript
// 필터 선택
const { selectedPreset, filterIntensity } = useEditorStore()

// CSS 필터 계산
const style = {
  filter: `
    brightness(${1 + (preset.filters.brightness - 1) * intensity / 100})
    contrast(${1 + (preset.filters.contrast - 1) * intensity / 100})
    ...
  `
}

// 이미지에 적용
<img src={photo.url} style={style} />
```

<br />

## 🔧 주요 npm 스크립트

```bash
# 개발 서버 실행 (http://localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# ESLint로 코드 검사
pnpm lint

# Drizzle Studio (DB GUI)
pnpm drizzle-kit studio

# 새 마이그레이션 생성
pnpm drizzle-kit generate

# DB에 마이그레이션 적용
pnpm drizzle-kit push
```

<br />

## 🐛 트러블슈팅

### "Failed to fetch" 에러가 나요

**증상**: 피드백 제출 또는 Google Sheets 연동 실패

**해결**:
1. Google Apps Script URL이 올바른지 확인
2. Apps Script가 "Anyone"으로 배포되었는지 확인
3. CORS 정책 확인

### 이미지 업로드가 안 돼요

**증상**: 파일 선택 후 업로드 실패

**해결**:
1. Vercel Blob 토큰이 올바른지 확인
2. 파일 크기 제한 확인 (기본 5MB)
3. 지원하는 포맷인지 확인 (JPEG, PNG, WebP)

### 필터가 적용되지 않아요

**증상**: 프리셋 선택해도 변화 없음

**해결**:
1. 브라우저 캐시 삭제
2. 다른 브라우저에서 테스트
3. 개발자 도구 Console에서 에러 확인

### 데이터베이스 연결 실패

**증상**: "Failed to connect to database"

**해결**:
1. Neon 콘솔에서 데이터베이스 상태 확인
2. `DATABASE_URL`이 올바른지 확인
3. SSL 모드가 `require`로 설정되었는지 확인

### 로그인/회원가입이 안 돼요

**증상**: Clerk 인증 에러

**해결**:
1. Clerk API 키가 올바른지 확인
2. Clerk 대시보드에서 도메인 허용 확인
3. Webhook URL 설정 확인 (`/api/webhook/clerk`)

<br />

## 📝 환경 변수 전체 목록

```env
# 데이터베이스
DATABASE_URL=postgresql://...

# Clerk 인증
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editor
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/editor

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Analytics (선택사항)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto
```

<br />

## 🎨 커스터마이징

### 새로운 필터 프리셋 추가하기

1. `lib/filters/presets.ts` 열기
2. `PRESETS` 배열에 새 객체 추가:

```typescript
{
  id: "my-custom-filter",
  name: "My Custom Filter",
  displayName: "나만의 필터",
  photographer: "Your Name",
  previewImage: "https://...",
  filters: {
    brightness: 1.1,
    contrast: 1.2,
    saturate: 1.0,
    sepia: 0.0,
    grayscale: 0.0,
    hueRotate: 0,
  },
  description: "나만의 특별한 필터 톤",
  credits: 2,
}
```

### 크레딧 가격 변경하기

`components/editor/DownloadButton.tsx`에서:

```typescript
const DOWNLOAD_COST = 2  // 원하는 값으로 변경
```

### 초기 무료 크레딧 변경하기

`lib/db/schema.ts`에서:

```typescript
credits: integer("credits").default(10)  // 10을 원하는 값으로
```

<br />

## 🚢 배포하기

### Vercel에 배포 (권장)

1. [Vercel](https://vercel.com) 로그인
2. GitHub 저장소 연결
3. Environment Variables 추가
4. Deploy 버튼 클릭

자동 배포가 설정되어서, `main` 브랜치에 push하면 자동으로 배포돼요!

### 환경 변수 설정 (Vercel)

Vercel 대시보드 → Settings → Environment Variables에서:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `BLOB_READ_WRITE_TOKEN`
- 기타 필요한 환경 변수
