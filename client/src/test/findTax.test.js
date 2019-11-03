import findTax from "../components/store/actionCreators";

describe("find the right tax", () => {
  it("should return the right tax when income below 18200", () => {
    expect(findTax(18200)).toBe(0);
  });
  it("should return the right tax when income between 18201 and 37000", () => {
    expect(findTax(18240)).toBe(1);
    expect(findTax(37000)).toBe(298);
  });
  it("should return the right tax when income between 37001 and 90000", () => {
    expect(findTax(37040)).toBe(299);
    expect(findTax(90000)).toBe(1733);
  });
  it("should return the right tax when income between 90000 and 180000", () => {
    expect(findTax(90020)).toBe(1734);
    expect(findTax(180000)).toBe(4508);
  });
  it("should return the right tax when income more than 180000", () => {
    expect(findTax(180020)).toBe(4509);
    expect(findTax(999999999)).toBe(37497758);
  });
});
