# transitions

Create animated transitions between pages using Next.js App Router and your favorite animation library.

[**See it in action**](https://ismamz-transitions.vercel.app), and take a look at the [example source code](/example).

## Disclaimer

This project is currently in Beta. Please be aware that the API is subject to change as we continue to improve and refine our features. Be aware that it does not cover all use cases. Please [open an issue](https://github.com/ismamz/transitions/issues/new/choose) if you need a specific scenario, and we can explore extending it.

## Features

- [OPINIONATED] Automatically detect internal links to handle page transitions.
- Exclusively to be used with [Next.js App Router](https://nextjs.org/docs/app).
- Quickly add animated transitions between pages using JavaScript or CSS.
- Utilize popular libraries like [GSAP](https://gsap.com/resources/React/) or any other animation library.
- Focused on customizable animations, not targeting the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

If you're looking to use the View Transitions API, check [next-view-transitions](https://github.com/shuding/next-view-transitions).

## Installation

Install the package using your preferred package manager, e.g.:

```sh
npm install @ismamz/transitions
```

## Usage

Create a client component to use the `PageTransitions` provider like this:

```tsx
'use client';

import { PageTransitions } from '@ismamz/transitions';

export function Providers({ children }: { children: React.ReactNode }) {
  const handleLeave = (next, from, to) => {
    // The current page is still visible.
    // Call `next()` when your "leave" logic ends.
    // `from` and `to` are the current & next page routes.
  };

  const handleEnter = next => {
    // Call `next()` when your "enter" logic ends.
  };

  return (
    <PageTransitions leave={handleLeave} enter={handleEnter}>
      {children}
    </PageTransitions>
  );
}
```

> 🧐 It should be a client component because you have to pass DOM functions as props to the provider.

After that, you should import that component in the layout component (e.g.: `app/layout.tsx`).

### Programmatic navigation

Use the `useTransitionRouter` hook if you need programmatic navigation and you want to use page transitions.

It works exactly like the [Next.js built-in `useRouter`](https://nextjs.org/docs/app/api-reference/functions/use-router) hook.

```tsx
'use client';

import { useTransitionRouter } from '@ismamz/transitions';

export function Programmatic() {
  const router = useTransitionRouter();

  return (
    <button
      onClick={() => {
        alert("You're about to go to /about");
        router.push('/about');
      }}
    >
      programmatic navigation (/about)
    </button>
  );
}
```

### Transition State

You can use the `useTransitionState` hook to get the current transition stage.

The values of `stage` can be one of these: `'entering' | 'leaving' | 'none'`.

```tsx
'use client';

import { useTransitionState } from '@ismamz/transitions';

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
  Don't trigger the page transition here 🙏
</Link>
```

Be aware that this is a custom data attribute, and not a property of the [built-in Next.js Link component](https://nextjs.org/docs/app/api-reference/components/link).

## License

MIT.
