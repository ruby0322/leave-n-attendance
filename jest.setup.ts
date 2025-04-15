import "@testing-library/jest-dom";

// 模擬 Next.js 的 useRouter（來自 next/navigation）
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(), // Mock push 方法
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      // 可以根據需要 mock 其他 router 屬性或方法
    })),
    usePathname: jest.fn(() => '/'), // 如果元件用到 usePathname
    useSearchParams: jest.fn(() => new URLSearchParams()), // 如果用到 useSearchParams
}));

// 模擬 window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 已被廢棄，但仍需模擬以防止錯誤
    removeListener: jest.fn(), // 已被廢棄，但仍需模擬以防止錯誤
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});