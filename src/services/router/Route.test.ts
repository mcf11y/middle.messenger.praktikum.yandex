import Block from "../block";
import { isPathEqual, render } from "./Route";
import { expect } from "chai";

describe("Route", () => {
  describe("isPathEqual", () => {
    it("should return true when two paths are identical", () => {
      const lhs = "/path";
      const rhs = "/path";

      const result = isPathEqual(lhs, rhs);

      expect(result).to.be.true;
    });

    it("should return true when path has a trailing slash and the same path without it", () => {
      const lhs = "/path/";
      const rhs = "/path";

      const result = isPathEqual(lhs, rhs);

      expect(result).to.be.true;
    });

    it("should return false when path has a leading slash and the same path without it", () => {
      const lhs = "/path";
      const rhs = "path";

      const result = isPathEqual(lhs, rhs);

      expect(result).to.be.false;
    });
  });

  describe("render", () => {
    let root: HTMLElement;
    const rootQuery = "#root";

    beforeEach(() => {
      root = document.createElement("div");
      root.id = "root";
      document.body.appendChild(root);
    });

    afterEach(() => {
      document.body.removeChild(root);
    });

    it("should render block content to root element", () => {
      class TestBlock extends Block {
        render() {
          const fragment = document.createDocumentFragment();
          const div = document.createElement("div");
          div.textContent = "Test Block Content";
          fragment.appendChild(div);
          return fragment;
        }
      }

      const block = new TestBlock();
      render(rootQuery, block);
      expect(root.innerHTML).to.equal("<div>Test Block Content</div>");
    });

    it("should replace existing content in root element", () => {
      const existingContent = document.createElement("p");
      existingContent.textContent = "Existing Content";
      root.appendChild(existingContent);

      class TestBlock extends Block {
        render() {
          const fragment = document.createDocumentFragment();
          const div = document.createElement("div");
          div.textContent = "Test Block Content";
          fragment.appendChild(div);
          return fragment;
        }
      }

      const block = new TestBlock();
      render(rootQuery, block);
      expect(root.innerHTML).to.equal("<div>Test Block Content</div>");
    });
  });
});
