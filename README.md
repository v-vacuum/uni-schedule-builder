# Schedule Builder

A course scheduling tool. You can search for classes, add them to a calendar, and see time conflicts as you go. When you're happy with your schedule, there's a checkout flow to enroll or join waitlists.

<video src="assets/demo.mp4" controls width="100%"></video>

## Features

- Search and filter courses by name, professor, day, time, open seats, etc.
- Calendar view that updates as you add courses, with conflict highlighting
- Multiple carts so you can compare different schedule options
- Prerequisite checking based on what you've already taken
- Checkout with enrollment status, waitlisting, and prereq/conflict validation

## Running it

```bash
npm install
npm run dev
```

Then go to [localhost:3000](http://localhost:3000).

## Stack

Next.js, React 19, TypeScript, Tailwind. State management is React Context with useReducer. Everything runs client-side with mock data — no backend.

## Project structure

```
src/
├── app/             Next.js pages
├── components/      Organized by feature (calendar, cart, checkout, search, etc.)
├── data/            Mock courses, students, carts
├── lib/             Utilities, conflict detection
├── store/           Scheduler context and reducer
└── types/           TypeScript interfaces
```
