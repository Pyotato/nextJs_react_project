Important! Next 13 Updates
Hi there,

Very important Update!

You will start using a Link and Image component in the next lecture. You might encounter some issues with this because the new Next js 13 was released recently, and they introduced new changes.

1. Important changes with <Image>

If you see some errors related to <Image> component

change the import of the Image this way:

import Image from 'next/legacy/image'

instead of

import Image from "next/image"

Then it should work the same as in the lectures.

2. Important changes with <Link>

If you see this error:

Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>. Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor

The fix is very simple. Find in the layout <Link> component, for example, this one:

<Link href="/"> 
  <a className="navbar-item"> 
     <h1>Content Manager</h1> 
  </a> 
</Link>

1. And change it to:

<Link href="/" className="navbar-item">
   <h1>Content Manager</h1>
</Link>

2. OR keep it as it was, and add to it legacyBehavior prop, so it looks like this:

<Link legacyBehavior href="/"> 
  <a className="navbar-item"> 
     <h1>Content Manager</h1> 
  </a> 
</Link>

Very simple. You need to do this with all links. This is the easiest way to fix it and not break the layout.

More ways can be found here:

https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor
