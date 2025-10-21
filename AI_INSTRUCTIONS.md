# 📋 دليل تعليمات صارم للذكاء الاصطناعي - منصة خطى التعليمية

## 🎯 مقدمة ونطاق العمل

هذا الدليل يحدد التعليمات الصارمة والدقيقة لجميع عمليات الذكاء الاصطناعي في تطوير منصة خطى التعليمية. يجب الالتزام الكامل بهذه التعليمات دون أي استثناء.

## 📏 معايير التصميم الموحدة

### 🎨 نظام الألوان الصارم
- **اللون الأساسي**: `#1a365d` (slate-900) - لا يُستخدم أي لون آخر كأساسي
- **اللون الثانوي**: `#3182ce` (blue-500) - للتفاعلات والروابط
- **اللون التكميلي**: `#38a169` (green-500) - للنجاح والإنجازات
- **الرمادي المحايد**: `#64748b` (slate-500) - للنصوص الثانوية
- **الأبيض النقي**: `#ffffff` - للخلفيات
- **الأسود الداكن**: `#0f172a` (slate-900) - للوضع المظلم

### 📐 نظام المسافات الصارم (8px Grid System)
- **الوحدة الأساسية**: 8px (0.5rem)
- **المضاعفات المسموحة فقط**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 128px
- **ممنوع تماماً**: أي قيمة غير مضاعفة للوحدة الأساسية

### 🔲 نظام Border Radius الصارم
- **xs**: 0.375rem (6px) - للعناصر الصغيرة
- **sm**: 0.5rem (8px) - للأزرار الصغيرة
- **md**: 0.75rem (12px) - للبطاقات القياسية
- **lg**: 1rem (16px) - للبطاقات الكبيرة
- **xl**: 1.5rem (24px) - للمودالات
- **full**: 9999px - للعناصر الدائرية

## ⚡ معايير الأداء الصارمة

### 📊 أهداف الأداء الإلزامية
- **First Contentful Paint (FCP)**: < 1.5 ثانية
- **Largest Contentful Paint (LCP)**: < 2.5 ثانية
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Time to Interactive (TTI)**: < 3.5 ثانية

### 🚀 تقنيات التحسين الإلزامية
- **Code Splitting**: تطبيق لكل صفحة ومكون
- **Image Optimization**: WebP فقط مع lazy loading
- **Font Optimization**: Preload للخطوط العربية فقط
- **Bundle Analysis**: إزالة أي مكتبة غير مستخدمة
- **Caching Strategy**: استخدام SWR للبيانات الديناميكية

## 🧩 معايير المكونات الصارمة

### 🎯 هيكل الملفات الإلزامي
```
src/
├── components/
│   ├── [FeatureName]/
│   │   ├── [FeatureName].tsx
│   │   ├── [FeatureName].module.css
│   │   ├── [FeatureName].test.tsx
│   │   └── [FeatureName].stories.tsx
├── hooks/
│   ├── use[HookName].ts
│   └── use[HookName].test.ts
├── utils/
│   ├── [UtilityName].ts
│   └── [UtilityName].test.ts
```

### 📋 قالب المكون الإلزامي
```typescript
// ComponentName.tsx
'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { use[HookName] } from '@/hooks/use[HookName]';

interface ComponentNameProps {
  // Props معرفة بدقة
}

const ComponentName = memo(({ prop1, prop2 }: ComponentNameProps) => {
  // منطق المكون
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="component-specific-classes"
    >
      {/* المحتوى */}
    </motion.div>
  );
});

ComponentName.displayName = 'ComponentName';
export default ComponentName;
```

## 🎨 معايير التصميم البصري الصارمة

### 🌈 نظام التدرجات الصارم
- **التدرج الأساسي**: `linear-gradient(135deg, #1a365d 0%, #3182ce 100%)`
- **التدرج الثانوي**: `linear-gradient(135deg, #3182ce 0%, #38a169 100%)`
- **التدرج التكميلي**: `linear-gradient(135deg, #38a169 0%, #805ad5 100%)`
- **ممنوع**: أي تدرج غير محدد في النظام

### 🌟 تأثيرات Glass Morphism الصارمة
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### 🎯 تأثيرات الحركة الصارمة
- **المدة**: 200ms للحركات البسيطة، 300ms للحركات المعقدة
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` فقط
- **الحد الأقصى**: لا تتجاوز 500ms لأي حركة
- **الحد الأدنى**: لا تقل عن 150ms لأي حركة

## 📱 معايير التصميم المتجاوب الصارمة

### 📐 نقاط الـ Breakpoints الصارمة
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: 1280px+

### 📱 نظام Grid الصارم
- **Mobile**: 4 columns, 16px gutters
- **Tablet**: 8 columns, 24px gutters
- **Desktop**: 12 columns, 32px gutters
- **Large Desktop**: 12 columns, 48px gutters

## ♿ معايير إمكانية الوصول الصارمة

### 🎯 WCAG 2.1 Level AA إلزامي
- **Color Contrast**: 4.5:1 للنصوص العادية، 3:1 للنصوص الكبيرة
- **Keyboard Navigation**: Tab order منطقي فقط
- **Screen Reader Support**: ARIA labels لكل عنصر تفاعلي
- **Focus Indicators**: 3px solid outline مع 2px offset

### 🔍 مثال على ARIA Labels الصارم
```typescript
<button
  aria-label="ابدأ التعلم الآن - سجل مجاناً"
  aria-describedby="signup-description"
  className="btn-primary"
>
  ابدأ الآن
</button>
<span id="signup-description" className="sr-only">
  سجل حسابك المجاني وابدأ رحلتك التعليمية في المحاسبة والمراجعة
</span>
```

## 🚀 معايير الأداء المتقدمة

### 📊 Core Web Vitals Targets
```typescript
const performanceTargets = {
  fcp: 1500, // ms
  lcp: 2500, // ms
  cls: 0.1,
  fid: 100, // ms
  tti: 3500, // ms
  tbt: 200, // ms
};
```

### 🎯 تقنيات التحسين الإلزامية
- **Critical CSS**: استخراج CSS الحرج فقط
- **Font Display**: swap للخطوط العربية
- **Preload**: للخطوط والصور الحرجة فقط
- **Lazy Loading**: لكل صورة ومكون غير حرج

## 🧪 معايير الاختبار الصارمة

### ✅ أنواع الاختبارات الإلزامية
- **Unit Tests**: 90% coverage للمكونات
- **Integration Tests**: لكل تدفق مستخدم
- **E2E Tests**: للمسارات الحرجة فقط
- **Performance Tests**: Lighthouse score > 90
- **Accessibility Tests**: axe-core integration

### 🎯 مثال على اختبار المكون
```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render with correct props', () => {
    render(<ComponentName prop1="test" prop2={123} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📋 معايير التوثيق الصارمة

### 📝 JSDoc الإلزامي
```typescript
/**
 * وصف دقيق للمكون مع وظيفته
 * @param {string} title - عنوان الدورة التعليمية
 * @param {number} duration - مدة الدورة بالساعات
 * @param {string[]} tags - الكلمات المفتاحية للدورة
 * @returns {JSX.Element} مكون بطاقة الدورة
 * @example
 * <CourseCard title="المراجعة الداخلية المتقدمة" duration={40} tags={["محاسبة", "مراجعة"]} />
 */
```

### 📊 README.md الإلزامي لكل مكون
```markdown
# ComponentName Component

## الوصف
وصف دقيق لوظيفة المكون

## الاستخدام
```typescript
<ComponentName prop1="value" prop2={123} />
```

## الخصائص
| الخاصية | النوع | الوصف | مطلوب |
|---------|--------|--------|--------|
| prop1 | string | الوصف الدقيق | نعم |

## الأمثلة
أمثلة عملية للاستخدام
```

## 🎯 معايير التسمية الصارمة

### 📁 تسمية الملفات
- **المكونات**: PascalCase (e.g., `HeroComponent.tsx`)
- **الـ Hooks**: camelCase مع prefix use (e.g., `useCourseData.ts`)
- **الـ Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **الأنواع**: PascalCase مع suffix Type (e.g., `CourseType.ts`)

### 🏷️ تسمية المتغيرات
- **الـ Props**: camelCase مع prefix descriptive (e.g., `courseTitle`, `isLoading`)
- **الـ States**: camelCase مع prefix useState (e.g., `isOpen`, `hasError`)
- **الـ Constants**: UPPER_SNAKE_CASE (e.g., `MAX_COURSES_PER_PAGE`)

## 🚨 معايير الأمان الصارمة

### 🔒 Security Headers الإلزامية
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
];
```

### 🛡️ Input Validation الإلزامي
```typescript
const validateCourseInput = (input: CourseInput) => {
  const schema = z.object({
    title: z.string().min(3).max(100),
    duration: z.number().min(1).max(200),
    price: z.number().min(0).max(10000)
  });
  return schema.parse(input);
};
```

## 📊 معايير المتابعة والقياس

### 📈 KPIs الإلزامية
- **Performance Score**: > 90 (Lighthouse)
- **Accessibility Score**: > 95 (Lighthouse)
- **Best Practices Score**: > 90 (Lighthouse)
- **SEO Score**: > 95 (Lighthouse)
- **Bundle Size**: < 200KB (gzipped)

### 🎯 Monitoring الإلزامي
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Privacy-focused analytics

## 🎯 قائمة التحقق النهائية

### ✅ قبل دمج أي تغيير
- [ ] جميع الاختبارات تمر بنجاح
- [ ] Lighthouse score > 90 في جميع المجالات
- [ ] التوثيق الكامل مكتمل
- [ ] التصميم متجاوب على جميع الأجهزة
- [ ] إمكانية الوصول مضمونة (WCAG 2.1 AA)
- [ ] الأداء محسن (Core Web Vitals targets)
- [ ] الأمان مضمون (Security headers)
- [ ] التوافق مع RTL مضمون

### 🚨 قائمة الممنوعات الصارمة
- ❌ لا تستخدم أي لون غير محدد في tokens.ts
- ❌ لا تستخدم أي حجم غير مضاعف للوحدة الأساسية 8px
- ❌ لا تستخدم أي animation duration غير المحددة
- ❌ لا تستخدم أي breakpoint غير المحددة
- ❌ لا تستخدم أي font غير Cairo أو Tajawal
- ❌ لا تستخدم أي shadow غير المحددة في النظام
- ❌ لا تستخدم أي border-radius غير المحددة

## 🎯 التواصل مع الذكاء الاصطناعي

### 📋 صيغة الطلبات الصارمة
```
السياق: [وصف دقيق للمكون المطلوب]
المتطلبات: [قائمة محددة بالتفصيل]
القيود: [أي قيود أو متطلبات خاصة]
الأولوية: [الأهمية من 1-5]
```

### 🎯 مثال على طلب صارم
```
السياق: مكون بطاقة دورة تعليمية
المتطلبات: 
- عرض عنوان الدورة (max 2 lines)
- عرض السعر مع تنسيق عملة عربية
- زر "ابدأ الآن" مع تأثير hover
- تصنيف النجوم 5 نجوم
القيود: 
- يجب أن يكون متجاوباً تماماً
- يجب أن يدعم الوضع المظلم
- يجب أن يكون قابلاً للوصول عبر لوحة المفاتيح
الأولوية: 5 (حرج)
```

## 🎯 التحديثات والمراجعات

### 📊 مراجعة دورية إلزامية
- **أسبوعياً**: مراجعة الأداء والمقاييس
- **شهرياً**: تحديث التوثيق والاختبارات
- **ربع سنوياً**: مراجعة كاملة للمعايير والتقنيات

### 🎯 توقيع الالتزام
```
تمت المراجعة بواسطة: [الاسم]
التاريخ: [YYYY-MM-DD]
النتيجة: [متوافق/غير متوافق]
التعديلات المطلوبة: [إن وجدت]
```

---
**ملاحظة نهائية**: هذا الدليل يُحدث أسبوعياً ويجب مراجعته قبل كل عملية تطوير جديدة. أي انحراف عن هذه التعليمات يعتبر خرقاً صارماً لمعايير المشروع.
