// Shared copy used on more than one page (and in the FAQ schema).

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "I get all my work from word of mouth. Why would I need this?",
    a: "Keep the word of mouth. Most people who hear about you still look you up before they ring, and a proper site makes that check easy. Your town pages also reach people who have never heard of you.",
  },
  {
    q: "I've been let down by a web company before. Why is this different?",
    a: "You see your site before you pay anything. Prices are on this website, you pay monthly, and after the first 2 payments you can cancel with 30 days' notice. You deal with Robbie directly, not a call centre.",
  },
  {
    q: "I'm too busy to sort out a website.",
    a: "We build your demo from your Google listing, so you don't have to do anything to see it. If you go ahead, we need your list of services and some photos of your work. We handle the rest.",
  },
  {
    q: "Can I afford it?",
    a: "Starter is £29 a month with no setup fee. If your site brings in one extra job a month, it has paid for itself. Pick a bigger plan only when you want more enquiries.",
  },
  {
    q: "How do I know it will work?",
    a: "We're new, so we don't have case studies yet and we won't make any up. Instead, you see your site before you pay, and Pro comes with a guarantee: your first tracked enquiry within 60 days of going live, or 3 months free.",
  },
  {
    q: "Is there a free month?",
    a: "No. We build your demo site for free instead, so you can judge the real thing before paying.",
  },
  {
    q: "How long am I tied in?",
    a: "The minimum is 2 monthly payments. After that you can cancel any time with 30 days' notice.",
  },
  {
    q: "Who pays for the Google ads on Pro?",
    a: "You pay Google directly, and you set a monthly spend cap so it never goes over. Our monthly fee doesn't include ad spend.",
  },
  {
    q: "Do I own my domain name?",
    a: "Yes. If you already have one, it stays yours and we just point it at your new site. If you need one, we'll register it for your business.",
  },
  {
    q: "Do you only work with trades?",
    a: "We started with electricians, plumbers, gas engineers and builders. We now build for any local business that wants more customers.",
  },
];

/**
 * REAL REVIEWS ONLY. Add reviews here once real clients give them, with their
 * permission. Leave empty until then: the site shows an honest placeholder.
 * Example: { quote: "…", name: "Jane S.", business: "Plumber, Gainsborough" }
 */
export const REVIEWS: { quote: string; name: string; business: string }[] = [];
