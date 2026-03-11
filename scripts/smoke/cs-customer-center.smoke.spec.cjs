const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 4173;
const ROOT_DIR = path.resolve("front/pages");
const ENTRY_PATH = path.join(ROOT_DIR, "cs", "customer_center.html");
const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

let server;

const resolveFilePath = (requestUrl = "/") => {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${HOST}:${PORT}`).pathname);
  const normalizedPath = pathname === "/" ? "/cs/customer_center.html" : pathname;
  const filePath = path.join(ROOT_DIR, normalizedPath);

  if (!filePath.startsWith(ROOT_DIR)) {
    return null;
  }

  return filePath;
};

const createStaticServer = () =>
  http.createServer((request, response) => {
    const filePath = resolveFilePath(request.url);

    if (!filePath) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not Found");
        return;
      }

      const contentType =
        CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";

      response.writeHead(200, { "Content-Type": contentType });
      response.end(file);
    });
  });

const startServer = async () =>
  new Promise((resolve) => {
    server = createStaticServer();
    server.listen(PORT, HOST, () => resolve());
  });

const stopServer = async () =>
  new Promise((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

const createIssueTracker = (page) => {
  const consoleErrors = [];
  const pageErrors = [];
  const requestFailures = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("requestfailed", (request) => {
    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText}`);
  });

  return {
    consoleErrors,
    pageErrors,
    requestFailures,
  };
};

const expectNoRuntimeIssues = ({ consoleErrors, pageErrors, requestFailures }) => {
  expect(
    consoleErrors,
    `console error 발생\n${consoleErrors.join("\n")}`,
  ).toEqual([]);
  expect(
    pageErrors,
    `pageerror 발생\n${pageErrors.join("\n")}`,
  ).toEqual([]);
  expect(
    requestFailures,
    `requestfailed 발생\n${requestFailures.join("\n")}`,
  ).toEqual([]);
};

test.beforeAll(async () => {
  expect(fs.existsSync(ENTRY_PATH), `${ENTRY_PATH} 산출물 누락 상태`).toBeTruthy();
  await startServer();
});

test.afterAll(async () => {
  await stopServer();
});

test("홈 라우트 스모크 체크", async ({ page }) => {
  const issues = createIssueTracker(page);
  let dialogMessage = "";

  page.on("dialog", async (dialog) => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await page.goto(`http://${HOST}:${PORT}/cs/customer_center.html`, {
    waitUntil: "networkidle",
  });

  await expect(page).toHaveTitle("제주항공 통합 고객센터");
  await expect(page.locator("#root")).toBeVisible();
  await expect(page.getByText("세 가지 서비스, 하나의 완벽한 여행")).toBeVisible();
  await expect(page.getByRole("button", { name: "팻봇" })).toBeVisible();

  await page.getByRole("button", { name: "팻봇" }).click();
  await expect.poll(() => dialogMessage).toContain("팻봇");

  await page.getByRole("textbox").fill("환불");
  await expect(page.getByText("2026년 2월 제주항공 신규 노선 운항 안내")).toBeVisible();

  await page.getByRole("link", { name: "공지사항 확인" }).click();
  await expect(page).toHaveURL(/#\/notices$/);
  await expect(page.getByText("LATEST ANNOUNCEMENTS")).toBeVisible();

  expectNoRuntimeIssues(issues);
});

test("공지 라우트 스모크 체크", async ({ page }) => {
  const issues = createIssueTracker(page);

  await page.goto(`http://${HOST}:${PORT}/cs/customer_center.html#/notices`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("LATEST ANNOUNCEMENTS")).toBeVisible();
  await expect(page.getByRole("link", { name: "메인 고객센터로 돌아가기" })).toBeVisible();

  await page.getByRole("textbox").fill("방콕");
  await expect(page.getByText("2026년 2월 제주항공 신규 노선 운항 안내")).toBeVisible();
  await expect(page.getByText("제주 그룹의 변화와 새로운 소식을 가장 입체적인 타임라인으로 확인하세요.")).toBeVisible();

  expectNoRuntimeIssues(issues);
});

test("FAQ 라우트 스모크 체크", async ({ page }) => {
  const issues = createIssueTracker(page);

  await page.goto(`http://${HOST}:${PORT}/cs/customer_center.html#/faqs`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("JEJU GROUP FAQ LIBRARY")).toBeVisible();

  await page.getByRole("textbox").fill("취소");
  const faqItems = page.locator("main button").filter({ has: page.locator("h3") });
  await expect(faqItems.first()).toBeVisible();
  await faqItems.first().click();
  await expect(
    page.getByText("제주항공 웹사이트 또는 모바일 앱에서 '예약 조회'를 통해 예약 번호와 이메일을 입력하여 취소할 수 있습니다."),
  ).toBeVisible();

  expectNoRuntimeIssues(issues);
});
