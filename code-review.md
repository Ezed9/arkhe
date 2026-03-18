## Summary
Five components with solid structure overall, but several blocking issues: a missing devicePixelRatio scaling bug that causes blurry canvas output on retina screens, silent error swallowing that hides real submission failures from users, multiple accessibility gaps on the form, and hover-only interaction patterns that are non-functional on touch devices.

---

## Issues

### ParticleText.tsx

- **[severity: high] Correctness — ParticleText.tsx:43-46 — Missing devicePixelRatio scaling**
  The canvas `width`/`height` are set to `window.innerWidth`/`window.innerHeight` without accounting for `devicePixelRatio`. On any retina or HiDPI screen (dpr=2 or 3, which covers virtually all modern phones and MacBooks), every drawn particle is blurry. The CSS dimensions also need to be set separately.
  Fix:
  ```ts
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
  ctx.scale(dpr, dpr)
  ```
  The `scale` call must happen once after every resize, and `mouse` coordinates from `clientX`/`clientY` do NOT need dpr scaling since they are in CSS pixels — leave those as-is.

- **[severity: high] Correctness — ParticleText.tsx:81-82 — Home coordinates use `rect.top` without scroll offset**
  `getBoundingClientRect()` returns viewport-relative coordinates. If the user has scrolled at all before `build()` runs (after the 80ms font delay), `hy` will be wrong — particles will home to the wrong Y position. Since the canvas is positioned `inset: 0` (fixed to the viewport), and the hero is at the top of the page this is currently survivable, but it becomes a real bug the moment the page layout changes or `build()` is ever called on resize after scroll.
  Fix: add `window.scrollY` to `hy` and `window.scrollX` to `hx` if the canvas is `position: absolute`, or keep coordinates in viewport space and set the canvas to `position: fixed`. Currently the canvas is `position: absolute` but coordinates are viewport-relative — these are inconsistent.

- **[severity: medium] Performance — ParticleText.tsx:66-68 — Offscreen canvas created inside loop, never pooled**
  A fresh `document.createElement('canvas')` is created for each of the 5 letters on every `build()` call (which also fires on every debounced resize). These canvases are not explicitly freed and rely on GC. Not a leak per se, but avoidable allocation pressure. Pre-allocating one reusable offscreen canvas would be cleaner.

- **[severity: medium] Correctness — ParticleText.tsx:145 — `document.fonts.ready` promise is not cancelled on cleanup**
  If the component unmounts before fonts are ready, `build()` still executes after unmount and writes into `particles` (which is in the closed-over scope). The `draw` loop is cancelled correctly, but `build` running after unmount will still allocate memory. Store the timeout reference from `fonts.ready.then(() => setTimeout(...))` and cancel it in cleanup.

- **[severity: low] Performance — ParticleText.tsx:66 — Missing `willReadFrequently` hint on offscreen canvas context**
  `oc.getImageData(...)` is called immediately after drawing. Passing `{ willReadFrequently: true }` to `getContext('2d')` allows the browser to keep the canvas in CPU memory and skip the GPU round-trip.

- **[severity: low] Correctness — ParticleText.tsx:166 — Empty `useEffect` dependency array suppresses stale ref warning**
  `letterRefs` is used inside the effect but omitted from the dependency array. This is intentional (the effect should only run once) and the ref itself is stable, so this is not a real bug — but `letterRefs.current` values are populated by React after mount, which is why the 80ms `setTimeout` exists. The pattern is correct but worth a comment.

---

### ArkheHero.tsx

- **[severity: medium] UX/Mobile — ArkheHero.tsx:67-86 — Scroll indicator is a `div` with `onClick` but no keyboard or ARIA role**
  A plain `<div>` with `cursor: pointer` and `onClick` is not reachable by keyboard and not announced to screen readers. Use a `<button>` element or add `role="button"` + `tabIndex={0}` + `onKeyDown` handler.

- **[severity: low] UX — ArkheHero.tsx:68 — Inline `transform` conflicts with Framer Motion**
  The scroll indicator has `style={{ transform: 'translateX(-50%)' }}` alongside `left-1/2`. Framer Motion owns the `transform` property on a `motion.div`, so the inline `translateX` can be silently overridden when motion applies its own transform. Use `translateX` via Framer's `x` prop or restructure with an absolutely-positioned wrapper that handles the centering separately.

---

### Navigation.tsx

- **[severity: medium] UX/Mobile — Navigation.tsx:54-55 — Hover color change is mouse-only**
  `onMouseEnter`/`onMouseLeave` imperatively mutate `e.currentTarget.style.color`. On touch devices these events do not fire reliably. The nav links will always appear at their dim default color with no active-state feedback on mobile. Use CSS `:hover` via a class, or Tailwind's `hover:` utility, so the browser handles the distinction correctly.

- **[severity: medium] Accessibility — Navigation.tsx:51 — Nav buttons have no `aria-label` and scroll targets have no landmark roles**
  The nav `<button>` elements only contain text labels, which is fine, but the `<nav>` element itself has no `aria-label` attribute. If there are multiple nav regions on the page this causes ambiguity for screen readers. Add `aria-label="Main navigation"` to the `<motion.nav>`.

- **[severity: low] UX — Navigation.tsx:34 — `transition: 'background 0.3s ease'` as an inline style alongside Framer Motion animation**
  Framer Motion and a raw CSS `transition` on the same element can interact unexpectedly. The background color change on scroll is driven by a React state flip which re-renders; the CSS transition will work here, but it is fragile. Prefer Framer Motion's `animate` prop for the background value too.

---

### Contact.tsx

- **[severity: high] Error handling — Contact.tsx:66-69 — `catch` block silently swallows real errors and lies to the user**
  The comment says "Supabase not configured yet — still show success." This means that even when the backend IS configured and a network error or 500 response occurs, the user sees a success state and believes their message was sent. This is a data-loss bug in production. The catch block must distinguish between a "not configured" state (which should be an explicit environment check) and a real runtime error (which should set `status('error')` and show an error message).

- **[severity: high] Accessibility — Contact.tsx:37-44 — `<label>` elements are not programmatically associated with their inputs**
  The `<label>` elements use display text (e.g., `> Your Name`) but have no `htmlFor` attribute pointing to the corresponding input's `id`. The inputs have no `id` attributes at all. Screen readers cannot associate the label with the field, and clicking the label does not focus the input.
  Fix: add matching `id` props to each input/textarea and `htmlFor` on each label.

- **[severity: high] Accessibility — Contact.tsx:119 — Form has `noValidate` but no custom error state is rendered**
  `noValidate` disables the browser's built-in validation UI, which is acceptable when custom validation is implemented. But the current code only silently returns (line 61: `if (!name || !email || !automate) return`) — there is no visible error message, no `aria-invalid` attribute, and no `aria-describedby` error region. Users who submit an incomplete form see nothing happen, with no feedback explaining why. This fails WCAG 3.3.1.

- **[severity: medium] UX/Mobile — Contact.tsx:134-135 — Submit button hover effects are mouse-only**
  Same pattern as Navigation: `onMouseEnter`/`onMouseLeave` imperatively set border and color. These do not fire on touch devices, meaning the button never shows any active/hover visual feedback on mobile.

- **[severity: low] TypeScript — Contact.tsx:57-60 — Unsafe `as string` cast on `FormData.get()`**
  `fd.get('name')` returns `string | File | null`. Casting directly with `as string` and then calling `.trim()` will throw at runtime if the value is `null` or a `File`. Use `(fd.get('name') ?? '') as string` or check the type before casting.

---

### Gallery.tsx

- **[severity: medium] UX/Mobile — Gallery.tsx:129-138 — Card button hover via `onMouseEnter`/`onMouseLeave`**
  Same imperative mouse-event pattern. On touch, the "See Full Details" button will never show the white-fill hover state. The `onMouseDown`/`onMouseUp` scale effect (lines 139-140) also won't fire on touch — use `onPointerDown`/`onPointerUp` instead, which covers both mouse and touch.

- **[severity: medium] Layout — Gallery.tsx:83 — `borderRight` condition is hardcoded to `index < 2`**
  The number of agents is a static array of 3, but the border condition `index < 2` assumes exactly 3 cards in a 3-column grid forever. If an agent is added or removed, the border logic will be wrong. A more robust approach is to use CSS (`border-right` on all cells, then remove it via `last-child` or `[&:nth-child(3n)]:border-r-0`).

- **[severity: low] Accessibility — Gallery.tsx:85-86 — Decorative hover line has no `aria-hidden`**
  The top-border gradient `<div>` is purely decorative but is a real DOM node. It should have `aria-hidden="true"` to prevent screen readers from traversing it.

- **[severity: low] Accessibility — Gallery.tsx:111-117 — Capability list items use `<li>` inside a `<ul>` with `listStyle: 'none'` but no `role` fix**
  In some browsers (notably Safari with VoiceOver), a `<ul>` with `list-style: none` has its list semantics removed. Add `role="list"` on the `<ul>` to restore announced list semantics.

---

## Verdict
NEEDS CHANGES — Three high-severity blocking issues must be fixed before production: the blurry canvas on retina screens (ParticleText), the form silently reporting success on errors (Contact), and the inaccessible form labels with no input association (Contact). The mobile hover-only patterns are pervasive across all components and should be addressed as a batch.
