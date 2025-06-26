import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./NewBlog";

describe("5.13 blog lists tests", () => {
  const SampleBlogEntry = {
    title: "Sample Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: {
      username: "tester",
      name: "Test User",
      id: "123",
    },
  };

  beforeEach(() => {
    render(<Blog blog={SampleBlogEntry} />);
  });

  test("renders blog title", () => {
    const element = screen.getByText((content) =>
      content.includes("Sample Blog")
    );
    expect(element).toBeDefined();
  });

  test("renders blog author", () => {
    const authorElement = screen.getByText((content) =>
      content.includes("Test Author")
    );
    expect(authorElement).toBeDefined();
  });

  test("does not show likes by default", () => {
    expect(screen.getByText(/likes/i)).not.toBeVisible();
  });

  test("does not show url by default", () => {
    expect(screen.getByText(/url/i)).not.toBeVisible();
  });
});

describe("5.14 blog lists tests", () => {
  const SampleBlogEntry = {
    title: "Sample Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: {
      username: "tester",
      name: "Test User",
      id: "123",
    },
  };

  beforeEach(() => {
    render(<Blog blog={SampleBlogEntry} />);
  });

  test("does not show url by default", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);
    expect(screen.getByText(/url/i)).toBeVisible();
  });

  test("does not show url by default", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);
    expect(screen.getByText(/likes/i)).toBeVisible();
  });
});

describe("5.15 LikeButton DoubleClick", () => {
  const SampleBlogEntry = {
    title: "Sample Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: {
      username: "tester",
      name: "Test User",
      id: "123",
    },
  };

  const mockHandler = vi.fn().mockResolvedValue({ status: "success " });
  beforeEach(() => {
    render(<Blog blog={SampleBlogEntry} onLike={mockHandler} />);
    vi.clearAllMocks();
  });

  test("registers one click", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  test("double-click successfull", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("view");

    await user.click(showButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("5.16 New Blog form", () => {
  const SampleBlogEntry = {
    title: "Sample Blog",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: {
      username: "tester",
      name: "Test User",
      id: "123",
    },
  };
  const mockHandler = vi.fn().mockResolvedValue({ status: "success " });

  test("Verify forms", async () => {
    const user = userEvent.setup();
    const { container } = render(<BlogForm createBlog={mockHandler} />);

    const titleInput = container.querySelector("#blog-title");
    const authorInput = container.querySelector("#blog-author");
    const urlInput = container.querySelector("#blog-url");
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();

    await user.type(titleInput, SampleBlogEntry.title);
    await user.type(authorInput, SampleBlogEntry.author);
    await user.type(urlInput, SampleBlogEntry.url);
    const createButton = screen.getByText("create");
    await user.click(createButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe(SampleBlogEntry.title);
    expect(mockHandler.mock.calls[0][0].author).toBe(SampleBlogEntry.author);
    expect(mockHandler.mock.calls[0][0].url).toBe(SampleBlogEntry.url);
  });
});
