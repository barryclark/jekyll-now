# Wedding Website Configuration Guide

This wedding website uses a centralized configuration system that makes it easy to update key information in one place.

## 📝 How to Update Your Information

All important wedding details are stored in a single file: **`src/lib/config.ts`**

### What You Can Update

Edit the values in `src/lib/config.ts` to customize your wedding website:

#### 1. **Couple Information**
```typescript
couple: {
  names: "Justine & Alex",              // Your names as they appear throughout the site
  email: "justine.and.alex.wedding@gmail.com"  // Contact email (appears on About page)
}
```

#### 2. **Wedding Date**
```typescript
date: {
  day: 6,
  month: 6,                             // Month number (1-12)
  year: 2026,
  displayEn: "June 6, 2026",           // How the date appears in English
  displayFr: "6 juin 2026"             // How the date appears in French
}
```

#### 3. **RSVP Deadline**
```typescript
rsvp: {
  deadline: {
    day: 6,
    month: 4,
    year: 2026,
    displayEn: "April 6, 2026",
    displayFr: "6 avril 2026"
  }
}
```

#### 4. **Venue Information**
```typescript
venue: {
  name: "Fritz Community Center",       // Short name used in navigation
  nameFr: "Centre Communautaire Fritz", // Short name in French
  fullName: "Fritz Community Centre",    // Full name for detailed pages
  fullNameFr: "Centre Communautaire Fritz",
  address: "45 Rue Lakeshore Rd, Baie-D'Urfé, QC H9X 1P7",
  city: "Baie-D'Urfé",
  province: "QC"
}
```

#### 5. **Event Schedule Times**
```typescript
schedule: {
  ceremony: "4:00 PM",
  ceremonyFr: "16h00",
  cocktail: "5:00 PM",
  cocktailFr: "17h00",
  dinner: "6:30 PM",
  dinnerFr: "18h30",
  dancing: "8:30 PM",
  dancingFr: "20h30",
  end: "11:00 PM",
  endFr: "23h00"
}
```

## ✨ Benefits of This System

### Before (Multiple Updates Required)
If you wanted to change your email address, you had to update it in:
- English translations
- French translations
- Multiple pages that might reference it

**Total: 2+ places to update**

### After (Single Update)
Now you only update the email in **one place** (`src/lib/config.ts`), and it automatically updates everywhere on your website.

**Total: 1 place to update** ✓

## 🎯 Where These Values Appear

When you update a value in `config.ts`, it automatically updates in all these locations:

- **Couple Names**: Homepage hero, footer, page title
- **Email**: About page contact section
- **Wedding Date**: Homepage, countdown timer, footer, page title
- **RSVP Deadline**: RSVP page subtitle
- **Venue**: Homepage, footer, venue page, FAQ, travel page
- **Schedule Times**: Schedule page, FAQ answers

## 🔄 How It Works

The configuration file (`config.ts`) is imported into the translations file (`translations.ts`), which then uses these values throughout the website. This means:

1. You edit one value in `config.ts`
2. The value is used in both English and French translations
3. All pages automatically display the updated information
4. No need to hunt through multiple files

## 📂 File Structure

```
src/
├── lib/
│   ├── config.ts          ← EDIT THIS FILE to update your info
│   └── translations.ts     ← Uses config values (don't need to edit)
└── components/
    └── pages/              ← Pages automatically use the config
```

## 💡 Example: Changing Your Email

**Old way:**
1. Open `translations.ts`
2. Find line 31: `email: "justine.and.alex.wedding@gmail.com"`
3. Update it
4. Scroll down to line 129: `email: "justine.and.alex.wedding@gmail.com"`
5. Update it again

**New way:**
1. Open `config.ts`
2. Change `email: "your.new.email@example.com"`
3. Done! ✓

## 🚀 Quick Start

To customize your wedding website:

1. Open `/workspaces/spark-template/src/lib/config.ts`
2. Update the values with your wedding information
3. Save the file
4. Your changes will appear throughout the entire website automatically

That's it! No need to search through multiple files or worry about missing a spot.
