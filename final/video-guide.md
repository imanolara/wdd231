# FocusLab video guide (3–5 minutes)

## Before recording

- Upload the final site to GitHub Pages.
- Open the public `techniques.html` page in one tab.
- Open `js/techniques.js` in GitHub in a second tab.
- Make sure your face camera is visible and the browser text is large enough to read.
- Do one silent practice run. Keep the recording focused only on the two required JavaScript points.

## Suggested script

### 0:00–0:20 — Introduction

“Hi, I’m Imanol Aranda. This is FocusLab, my WDD 231 final project. I’ll demonstrate how I use a local JSON data source, the Fetch API, and asynchronous error handling to generate the technique library.”

### 0:20–1:30 — Data integration and output

1. Show `data/techniques.json` in GitHub.
2. Briefly expand one object and point to these properties: `name`, `category`, `duration`, `energy`, `description`, and `steps`.
3. Say: “This local JSON file contains 18 study techniques. Every object has the same data structure.”
4. Switch to the public `techniques.html` page.
5. Scroll through the grid and say: “JavaScript generates all 18 cards from the JSON data. Each card displays multiple properties, including name, category, duration, energy, and description.”
6. Search for “memory,” change a filter, and clear it. Explain that the visible output is regenerated from the same fetched data.

### 1:30–3:20 — Fetch, async, and try/catch

1. Switch to `js/techniques.js` in GitHub.
2. Find `async function loadTechniques()`.
3. Say: “This function is asynchronous. Inside the `try` block, `fetch` requests `data/techniques.json`. I use `await` for the response and then parse the response with `await response.json()`.”
4. Point to the `response.ok` check and say: “I check that the response succeeded. If it did not, I throw an error.”
5. Point to `renderTechniques()` and say: “After the data is available, I store it and call the rendering function.”
6. Point to the `catch` block and say: “If the request or JSON parsing fails, the `catch` block logs the technical error and displays a useful message to the visitor instead of leaving an empty page.”
7. Point to `filteredTechniques()` and `techniqueCard()`. Say: “The fetched array is processed with `filter` and `map`. A template literal builds each card, and `renderTechniques` places the finished HTML in the page.”

### 3:20–3:35 — Finish

“That demonstrates how my JSON data is fetched asynchronously, handled with try/catch, and turned into the visible technique library. Thank you.”

## Upload checklist

- Keep the final recording between 3 and 5 minutes.
- Make the video public or unlisted so the grader can open it.
- The published video URL is `https://youtu.be/B0GfpkeD8kY` and is configured in `js/config.js`.
- Click **Video demonstration** in the footer of the deployed site and confirm it opens the correct video.
