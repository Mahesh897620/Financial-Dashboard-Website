
# Fix Navigation 404 Errors and Theme Toggle

## Issues Identified

### Issue 1: Missing Pages (404 Errors)
The sidebar navigation includes links to:
- `/calculator` - No route defined
- `/converter` - No route defined  
- `/help` - No route defined

These routes are not registered in `App.tsx`, so clicking them shows the NotFound (404) page.

### Issue 2: Theme Toggle Not Working
The `ThemeToggle` component manages its own state with `useState` and `localStorage`, but the app uses `ThemeProvider` from `next-themes`. These two systems conflict - the toggle changes local state but doesn't communicate with the theme provider.

---

## Solution

### Part 1: Create Missing Pages

**Create Calculator Page** (`src/pages/Calculator.tsx`)
- Financial calculator with multiple tools:
  - Loan EMI calculator
  - Investment returns calculator
  - Savings goal calculator
- Input fields for amounts, rates, periods
- Visual results display

**Create Converter Page** (`src/pages/Converter.tsx`)
- Currency converter (reuse existing CurrencyConverter widget)
- Unit converter for financial metrics
- Full-page layout with more features

**Create Help Page** (`src/pages/Help.tsx`)
- FAQ section with common questions
- Contact/support information
- Documentation links
- Keyboard shortcuts guide

### Part 2: Register New Routes

Update `App.tsx` to add:
```
<Route path="/calculator" element={<Calculator />} />
<Route path="/converter" element={<Converter />} />
<Route path="/help" element={<Help />} />
```

### Part 3: Fix Theme Toggle

Update `ThemeToggle.tsx` to use `next-themes`:
- Replace `useState` with `useTheme` hook from `next-themes`
- Use `setTheme()` function instead of manual class manipulation
- Remove manual localStorage handling (next-themes handles this)

---

## Files to Create
1. `src/pages/Calculator.tsx` - Financial calculator tools
2. `src/pages/Converter.tsx` - Currency/unit converter page
3. `src/pages/Help.tsx` - Help and support page

## Files to Modify
1. `src/App.tsx` - Add 3 new routes
2. `src/components/shared/ThemeToggle.tsx` - Use `useTheme` from next-themes

---

## Technical Details

### ThemeToggle Fix (Before/After)

**Before (broken):**
```tsx
const [isDark, setIsDark] = useState(() => {...});
useEffect(() => {
  root.classList.add/remove('dark');
  localStorage.setItem('theme', ...);
}, [isDark]);
```

**After (working):**
```tsx
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
```

This ensures the theme toggle works properly with the ThemeProvider that wraps the entire app.
