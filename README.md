<div align="center">
  <img src="/example/app/icon.svg" alt="next-transition-router" width="100" height="100" />
  <h1>next-transition-router</h1>
</div>

Easily add animated transitions between pages using Next.js App Router and your favorite animation library.

[**See it in action**](https://next-transition-router.vercel.app), and take a look at the [example source code](/example) that uses [GSAP](https://gsap.com/resources/React/).

## Disclaimer

This project is currently in Beta. Please note that the API may change as features are enhanced and refined.

This package may not cover every use case. If you require a specific scenario, please [open an issue](https://github.com/ismamz/next-transition-router/issues/new/choose), and we can explore the possibility of extending the functionality.

## Features

- Automatically detect internal links to handle page transitions (optional).
- Use a custom `Link` component to manually handle page transitions.
- Exclusively to be used with [Next.js App Router](https://nextjs.org/docs/app).
- Quickly add animated transitions between pages using JavaScript or CSS.
- Integrate seamlessly with [GSAP](https://gsap.com/resources/React/) or any other animation library of your choice.
- If JavaScript is disabled, the router's accessibility is not compromised.
- Focused on customizable animations, not targeting the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

If you're looking to use the View Transitions API, check [next-view-transitions](https://github.com/shuding/next-view-transitions).

## Installation

Install the package using your preferred package manager:

```sh
pnpm add next-transition-router
```

```sh
yarn add next-transition-router
```

```sh
npm install next-transition-router
```

## Usage

Create a client component to use the `TransitionRouter` provider like this:

```tsx
'use client';

import { TransitionRouter } from 'next-transition-router';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      auto={true} // all internal links will trigger transitions
      leave={(next, from, to) => {
        // animate current page before navigating away
        // when the animation ends, call the `next` function
        // extra: `from` and `to` are the current and next page routes
      }}
      enter={(next) => {
        // perform an entry animation to reveal the new page that is ready
        // when the animation ends, call the `next` function
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

> It should be a client component because you have to pass DOM functions as props to the provider.

After that, you should import that component in the layout component (e.g.: `app/layout.tsx`).

### Auto-detection or custom `Link` component

When `auto` is enabled, the `TransitionRouter` intercepts click events on internal links and triggers page transitions. The router automatically ignores external links, anchor links, and links with the `data-transition-ignore` attribute.


To enable internal links auto-detection to perform transitions between pages, you must use the `auto` prop with the value `true`.

```tsx
<TransitionRouter auto={true}>
  {children}
</TransitionRouter>
```

With `auto` enabled, all internal links, except those with anchors or fragment identifiers, will trigger transitions.

When `auto` is enabled, the `TransitionRouter` intercepts click events on internal links and triggers page transitions. The router automatically ignores external links, anchor links, and links with the `data-transition-ignore` attribute.

By default, the `auto` option is set to `false`; if you prefer it this way, you should use the custom `Link` component instead of the native `Link` component from Next.js.

```tsx
import { Link } from 'next-transition-router';

export function Example() {
  return <Link href="/about">About</Link>;
}
```

> You can use `import { Link as TransitionLink } from 'next-transition-router'` to avoid naming conflicts with the default `Link` component from Next.js.

### Ignore a link when use auto-detection

If you set `auto` to `true`, but you want to ignore a link in particular, simply add the `data-transition-ignore` attribute:

```html
<Link href="/about" data-transition-ignore>
  Ignore transition for this link
</Link>
```

Be aware that this is a custom data attribute, and not a property of the [built-in Next.js Link component](https://nextjs.org/docs/app/api-reference/components/link).

### Programmatic navigation

Use the `useTransitionRouter` hook to seamlessly manage navigation (`push` and `replace`) while incorporating page transitions.

This hook functions identically to the [Next.js `useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router) hook, offering a familiar API with added support for transitions.

```tsx
'use client';

import { useTransitionRouter } from 'next-transition-router';

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <button
      onClick={() => {
        alert("Do something before navigating away");
        router.push('/about');
      }}
    >
      Go to /about
    </button>
  );
}
```

### Transition state

Use the `useTransitionState` hook to determine the current stage of the transition.

The values of `stage` can be one of these: `'entering' | 'leaving' | 'none'`.

```tsx
'use client';

import { useTransitionState } from 'next-transition-router';

export function Example() {
  const { stage, isReady } = useTransitionState();

  return (
    <div>
      {stage === 'leaving' && <div>Animating out…</div>}
      {stage === 'entering' && <div>Animating in…</div>}
      {stage === 'none' && <div>Nothing is happening</div>}
      {isReady && <div>New page fully loaded!</div>}
    </div>
  );
}

```

This is useful, for example, if you want to trigger a reveal animation after the page transition ends.

In this case, you have a special `isReady` (`boolean`) state that indicates that the new page is ready to be revealed.

### Transition cleanups

The `TransitionRouter` uses references to store and manage cleanup functions for both `leave` and `enter` animations, ensuring smooth transitions without memory leaks. This is particularly useful when animations need to be cancelled or adjusted based on the current stage.

Here's an example using GSAP:

```tsx
'use client';

import { TransitionRouter } from 'next-transition-router';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={(next) => {
        const tween = gsap.fromTo('main', { autoAlpha: 1 }, { autoAlpha: 0, onComplete: next });
        return () => tween.kill();
      }}
      enter={(next) => {
        const tween = gsap.fromTo('main', { autoAlpha: 0 }, { autoAlpha: 1, onComplete: next });
        return () => tween.kill();
      }}
    >
      {children}
    </TransitionRouter>
  );
}
```

## API

### `TransitionRouter`

| Prop       | Type       | Default Value    | Description                                       |
| ---------- | ---------- | ---------------- | ------------------------------------------------- |
| `leave`    | `function` | `next => next()` | Function to handle the leaving animation          |
| `enter`    | `function` | `next => next()` | Function to handle the entering animation         |
| `auto`     | `boolean`  | `false`          | Flag to enable/disable auto-detection of links    |

## License

MIT.
