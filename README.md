
# Reddit Client Web App
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE) ![Repo Size](https://img.shields.io/github/repo-size/BenedictPolacek/Reddit_Client_Clone)  
A lightweight, minimalist and modern alternative to Reddit’s official web client.

## 🔧 Built With
![React](https://img.shields.io/badge/React-19.0.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.7.0-purple) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4) ![Flowbite React](https://img.shields.io/badge/Flowbite_React-0.11.7-green) ![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325)![Testing Library](https://img.shields.io/badge/Testing_Library-16.3.0-9E9E9E) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6)

-   [Next.js](https://nextjs.org/) – The React framework
    
-   [React](https://reactjs.org/) – UI library
    
-   [Redux Toolkit](https://redux-toolkit.js.org/) – State management
    
-   [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
    
-   [Flowbite](https://flowbite.com/) – Tailwind UI component library
    
-   [Reddit API](https://www.reddit.com) – Data source

## Features

- Browse r/all, r/popular, or any subreddit of your choice
- Infinite scroll with lazy loading
- Subreddit search/filter
- Error handling with retry button on network failures


## Usage

1. **Browse posts**  
   Select a subreddit from the sidebar to load its posts. Scroll down to automatically fetch more content.

2. **Search posts**  
   Enter keywords in the search bar and press Enter (or click the search icon) to filter posts.


## Getting Started

Follow these steps to run the project locally for development and testing.  

### Prerequisites

- Node.js (v18 or later)
- npm

### Installing

Clone the repository:

```bash
git clone https://github.com/BenedictPolacek/Reddit_Client_Clone.git
cd Reddit_Client_Clone
```
Install dependencies: 
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Run the production server:
```bash
npm run build
npm run start
```
> Open your browser and visit http://localhost:3000

 Optional: Update your Git remote URL to avoid pushing changes to the original repository:
```bash
git remote set-url origin github_username/repo_name
git remote -v # confirm the changes
```

## Running the tests

### 🔬 Unit and Integration Tests

This project uses **Jest** and **React Testing Library** to ensure the reliability of individual components and their interactions.

```bash
npm run test
```
 > 💡 In the future, end-to-end (E2E) tests will be added to cover real user flows.

## Deployment

This project is ready for deployment on platforms like [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/).

To deploy on Vercel:

1.  Push your code to GitHub.
    
2.  Visit https://vercel.com/import.
    
3.  Connect your GitHub repo and follow the setup instructions.

## 🗺️ Roadmap

- [x] Browse r/all, r/popular, and custom subreddits
- [x] Infinite scroll for loading posts
- [x] Basic error handling (retry on network failure)
- [ ] Unit and integration tests with Jest
- [ ] End-to-end testing with Playwright or Cypress

## 🤝 Contributing

Please read the contributing guidelines below.

### How to Contribute

1.  Fork the repository
    
2.  Create a new branch (`git checkout -b feature/awesome-feature`)
    
3.  Commit your changes (`git commit -m 'Add some awesome feature'`)
    
4.  Push to the branch (`git push origin feature/awesome-feature`)
    
5.  Open a Pull Request

## Authors
- **Benedict Polacek** – [@BenedictPolacek](https://github.com/BenedictPolacek)  
  Creator & maintainer · Email: polacek.benedict@gmail.com  
  High school student interested in web dev

## 📄 License

This project is licensed under the [MIT License](LICENSE).
