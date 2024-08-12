<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none"><rect width="100" height="100" fill="#111" rx="20"/><path fill="tomato" d="M84.78 50c0 12.524-10.153 22.677-22.677 22.677S39.426 62.524 39.426 50s10.153-22.677 22.677-22.677S84.781 37.476 84.781 50"/><path fill="#fff" d="M60.574 50c0 12.524-10.153 22.677-22.677 22.677S15.22 62.524 15.22 50s10.152-22.677 22.677-22.677c12.524 0 22.677 10.153 22.677 22.677"/><path fill="#111" fill-rule="evenodd" d="M63.137 50c0 13.94-11.3 25.24-25.24 25.24S12.657 63.94 12.657 50s11.3-25.24 25.24-25.24 25.24 11.3 25.24 25.24m-25.24 22.677c12.524 0 22.677-10.153 22.677-22.677S50.421 27.323 37.897 27.323 15.22 37.476 15.22 50s10.152 22.677 22.677 22.677" clip-rule="evenodd"/><path fill="#111" d="m35.088 60.54 5.58-7.112q.402-.546.913-.911.546-.402.948-.511H27.502v-4.012h14.881q-.402-.11-.875-.474a4.6 4.6 0 0 1-.84-.839l-5.616-7.222h5.033l8.206 10.505L40.05 60.54z"/></svg>

  <h1>next-transition-router</h1>
</div>

Create animated transitions between pages using Next.js App Router and your favorite animation library.

[**See it in action**](https://next-transition-router.vercel.app), and take a look at the [example source code](/example).

## Disclaimer

This project is currently in Beta. Please note that the API may change as features are enhanced and refined. Be aware that it doesn't cover all possible use cases. If you require a specific scenario, please [open an issue](https://github.com/ismamz/next-transition-router/issues/new/choose), and we can explore the possibility of extending the functionality.

## Features

- Automatically detect internal links to handle page transitions (by default).
- Use a custom `Link` component to manually handle page transitions (optional).
- Exclusively to be used with [Next.js App Router](https://nextjs.org/docs/app).
- Quickly add animated transitions between pages using JavaScript or CSS.
- Utilize popular libraries like [GSAP](https://gsap.com/resources/React/) or any other animation library.
- If JavaScript is disabled, the router works normally.
- Focused on customizable animations, not targeting the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

If you're looking to use the View Transitions API, check [next-view-transitions](https://github.com/shuding/next-view-transitions).

## Installation

Install the package using your preferred package manager, e.g.:

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
      leave={(next, from, to) => {
        // do some cool animation when the current page is still visible
        // when the animation ends, call the `next` function
        // `from` and `to` are the current and next page routes
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

### Programmatic navigation

Use the `useTransitionRouter` hook if you need programmatic navigation and you want to use page transitions.

It works exactly like the [Next.js built-in `useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router) hook.

```tsx
'use client';

import { useTransitionRouter } from 'next-transition-router';

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <button
      onClick={() => {
        alert("You're about to go to /about");
        router.push('/about');
      }}
    >
      programmatic navigation (push to /about)
    </button>
  );
}
```

### Transition state

You can use the `useTransitionState` hook to get the current transition stage.

The values of `stage` can be one of these: `'entering' | 'leaving' | 'none'`.

```tsx
'use client';

import { useTransitionState } from 'next-transition-router';

export function Example() {
  const { stage } = useTransitionState();
  return <div>stage: {stage}</div>;
}
```

This is useful, for example, if you want to trigger a reveal animation after the page transition ends.

Also, you can use the `data-stage` attribute added to the `<html>` tag with the current stage value.

### Ignore a link

By default, all internal links, excluding anchor or fragment identifier links, will trigger the page transition hooks.

If you want to ignore a link, simply add the `data-transition-ignore` attribute:

```html
<Link href="/about" data-transition-ignore>
  Don't trigger the page transition for this link
</Link>
```

Be aware that this is a custom data attribute, and not a property of the [built-in Next.js Link component](https://nextjs.org/docs/app/api-reference/components/link).

### Turn off auto-detection and use a custom `Link` component

If you want to ignore all links from auto-detection, you should set the property `auto` to `false` in the `TransitionRouter` provider.

```tsx
<TransitionRouter auto={false}>
  {children}
</TransitionRouter>
```

In this case, you need to use the custom `<Link>` component:

```tsx
import { Link } from 'next-transition-router';

export function Example() {
  return <Link href="/about">About</Link>;
}
```

> You can use `import { Link as TransitionLink } from 'next-transition-router'` to avoid naming conflicts with the default `Link` component from Next.js.

## Summary

### `TransitionRouter`

| Prop       | Type       | Default Value    | Description                                       |
| ---------- | ---------- | ---------------- | ------------------------------------------------- |
| `leave`    | `function` | `next => next()` | Function to handle the leaving animation          |
| `enter`    | `function` | `next => next()` | Function to handle the entering animation         |
| `auto`     | `boolean`  | `true`           | Flag to enable/disable auto-detection of links    |

## License

MIT.
