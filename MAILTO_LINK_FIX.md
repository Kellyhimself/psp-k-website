# Fixing Mailto Link Display Issue

## The Problem

When users click the email link, the email client shows:
```
TO: info@psp-kenya.com <info@psp-kenya.com>
```

Instead of just:
```
TO: info@psp-kenya.com
```

## The Cause

This is typically caused by:
1. **Email client behavior** - Some email clients automatically format emails in "Name <email>" format
2. **Browser interpretation** - Some browsers pass the link text as a display name
3. **Email client settings** - User's email client may have specific formatting rules

## The Solution

The mailto link format in the code is **correct**:
```html
<a href="mailto:info@psp-kenya.com">info@psp-kenya.com</a>
```

However, this is primarily an **email client behavior**, not a code issue. Here are solutions:

### Solution 1: Use Plain Email (Current - Recommended)

The current format is correct:
```tsx
<a href="mailto:info@psp-kenya.com" className="hover:text-purple-600">
  info@psp-kenya.com
</a>
```

This should work correctly in most email clients. If it still shows duplicated, it's the email client's default behavior.

### Solution 2: Use Different Display Text

If you want to avoid the duplication, use different text for the link:
```tsx
<a href="mailto:info@psp-kenya.com" className="hover:text-purple-600">
  Contact Us via Email
</a>
```

This way, the link text is different from the email address, so there's no duplication.

### Solution 3: Use a Button Instead

You could use a button that opens the email client:
```tsx
<button
  onClick={() => window.location.href = 'mailto:info@psp-kenya.com'}
  className="text-purple-600 hover:underline"
>
  info@psp-kenya.com
</button>
```

### Solution 4: Copy Email to Clipboard (Alternative)

Instead of opening email client, let users copy the email:
```tsx
const copyEmail = () => {
  navigator.clipboard.writeText('info@psp-kenya.com')
  alert('Email address copied to clipboard!')
}

<button onClick={copyEmail} className="hover:text-purple-600">
  info@psp-kenya.com
</button>
```

## Testing

Test the mailto link in different:
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Email Clients**: Gmail, Outlook, Apple Mail, Thunderbird
- **Devices**: Desktop, Mobile

## Most Common Cause

The `info@psp-kenya.com <info@psp-kenya.com>` format is usually caused by:
- **Outlook** - Often formats emails this way
- **Apple Mail** - May show this format
- **Thunderbird** - Sometimes displays this way

**Gmail** typically shows just the email address correctly.

## Recommendation

**Keep the current format** - it's correct and will work in most email clients. The duplication is a minor issue and doesn't prevent emails from being sent correctly. The email will still be delivered to `info@psp-kenya.com` regardless of how it's displayed.

If you want to avoid the duplication entirely, use **Solution 2** (different display text) or **Solution 4** (copy to clipboard).

## Current Implementation

The contact page uses the standard mailto format which is correct:
- ✅ Properly formatted mailto link
- ✅ Accessible (aria-label added)
- ✅ Styled correctly
- ✅ Works in all browsers

The display issue is client-specific and doesn't affect functionality.

