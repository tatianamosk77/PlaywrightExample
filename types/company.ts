const { test, expect } = require("@playwright/test");

export type Company = {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
};

test("Company type", () => {
    const comp1: Company = {
      id: 1,
      isActive: true,
      name: "Company number 1",
    };
  
    const comp2: Company = {
      id: 2,
      isActive: false,
      name: "Company number 2",
      description: "Pretty good",
    };
  });