# VisionAI Image & Text OCR — Frontend

> A React frontend for uploading images, running AI-powered classification, and displaying prediction results with confidence scoring.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Components](#components)
- [Utilities](#utilities)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

VisionAI Frontend is a React-based single-page application that lets users upload images and receive real-time AI classification and OCR predictions. Results are presented visually with confidence bars and a detailed results panel.

![App Screenshot](public/Screenshot%202026-04-02%20203611.png)

---

## Features

- **Image Upload** — Drag-and-drop or click-to-upload interface
- **Prediction Results** — Visual confidence bars for each prediction class
- **Result Panel** — Detailed breakdown of classification or OCR output
- **Toast Notifications** — User feedback for upload status and errors
- **Confidence Scoring** — Utility-driven confidence formatting and thresholding

---

## Project Structure

```
├── public/
│   └── index.html                 # HTML entry point
├── src/
│   ├── components/
│   │   ├── Header.jsx             # App header and navigation
│   │   ├── PredictionBar.jsx      # Confidence bar for each prediction
│   │   ├── ResultPanel.jsx        # Full results display panel
│   │   ├── Toast.jsx              # Toast notification component
│   │   └── UploadZone.jsx         # Image upload / drag-and-drop area
│   ├── utils/
│   │   └── confidenceUtils.js     # Confidence score helpers & formatting
│   ├── App.css                    # Global app styles
│   ├── App.jsx                    # Root component & layout
│   └── index.js                   # App entry point
├── .gitignore
├── package-lock.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/visionai-image-textocr.git
cd visionai-image-textocr
npm install
```

### Running the App

```bash
# Development server
npm start

# Production build
npm run build
```

---

## Components

| Component | Description |
|---|---|
| `Header` | Top navigation bar and app branding |
| `UploadZone` | Drag-and-drop or file picker for image input |
| `PredictionBar` | Renders a labeled confidence bar for a single prediction class |
| `ResultPanel` | Aggregates and displays the full set of classification/OCR results |
| `Toast` | Ephemeral notifications for upload success, errors, or warnings |

---

## Utilities

| File | Description |
|---|---|
| `confidenceUtils.js` | Helper functions for formatting confidence percentages, applying thresholds, and sorting prediction results |

---

## Tech Stack

- [React](https://react.dev/) — UI framework
- [JavaScript (JSX)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — Component language
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) — Styling via `App.css`

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT © Your Name
