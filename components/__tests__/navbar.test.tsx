import { SidebarProvider } from "@/components/ui/sidebar"; // 匯入 SidebarProvider
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { Navbar } from "../navbar";


describe("Navbar Component", () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(<SidebarProvider>{ui}</SidebarProvider>);
  };

  // 測試案例 1: 驗證通知數量的顯示
  test("displays the correct number of unread notifications", async () => {
    renderWithProviders(<Navbar />);
    
    // 查找通知數量徽章
    await waitFor(() => {
        const badgeElement = screen.getByTestId("notification-badge"); // 使用 data-testid
        expect(badgeElement).toHaveTextContent("2"); // 預設有 2 個未讀通知
    });
  });

  // 測試案例 2: 驗證通知列表的渲染
  test("renders notification list correctly", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    // 點擊通知按鈕以顯示通知列表
    const notificationButton = screen.getByTestId("notification-button");
    await user.click(notificationButton);

    // 使用 waitFor 等待通知項目渲染
    await waitFor(() => {
      expect(screen.getByTestId("notification-1")).toBeInTheDocument();
      expect(screen.getByTestId("notification-2")).toBeInTheDocument();
      expect(screen.getByTestId("notification-3")).toBeInTheDocument();
    });
  });

  // 測試案例 3: 驗證點擊通知按鈕後顯示通知彈出框
  test("shows notification popover when notification button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    // 查找通知按鈕
    const notificationButton = screen.getByTestId("notification-button");
    await user.click(notificationButton);

    // 使用 waitFor 等待彈出框內容顯示
    await waitFor(() => {
      const popover = screen.getByTestId("notification-popover");
      expect(popover).toBeInTheDocument();
    });
  });

  // 測試案例 4: 驗證點擊用戶菜單按鈕後顯示下拉選單
  test("shows user dropdown menu when avatar button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Navbar />);

    // 查找用戶菜單按鈕
    const userMenuButton = screen.getByTestId("user-menu-button");
    await user.click(userMenuButton);

    // 使用 waitFor 等待下拉選單內容顯示
    await waitFor(() => {
      const profileMenuItem = screen.getByTestId("menu-profile");
      expect(profileMenuItem).toBeInTheDocument();

      const settingsMenuItem = screen.getByTestId("menu-settings");
      expect(settingsMenuItem).toBeInTheDocument();

      const logoutMenuItem = screen.getByTestId("menu-logout");
      expect(logoutMenuItem).toBeInTheDocument();
    });
  });
});