import { Company } from "../types/company";

import { test as base } from "@playwright/test";

const host = "https://x-clients-be.onrender.com";
const auth = "/auth/login"; // https://x-clients-be.onrender.com/docs/#/auth/AuthController_login
const loginData = {
    username: "leonardo",
    password: "leads",
  };

type MyFixtureType = { 
  token: string;
  company: Company;
};

type Token = {
    token: string;
}

async function getToken(request) {
    const authResponse = await request.post(host + auth, { data: loginData });
    const authBody = await authResponse.json();
    const token = authBody["userToken"];
    
        return token;
    }

export const test = base.extend<MyFixtureType>({ 
  company: async ({ request }, use) => { 
    const companyInfo: Company = { 
      id: 0,
      isActive: true, 
      name: "Инженерка",
      description: "курсы для инженеров от инженеров.",
    };

    const createCompanyResponse = await request.post("https://x-clients-be.onrender.com/company", {
      headers: { "x-client-token": await getToken(request) },
      data: { name: companyInfo.name, description: companyInfo.description },
    });

    const body = await createCompanyResponse.json();
    companyInfo.id = body["id"];

    use(companyInfo); // (5)
  },
  token: async ({request}, use) => {
    const loginData = {
        username: "leonardo",
        password: "leads",
      };
    const createToken = await request.post("https://x-clients-be.onrender.com/auth/login", {
        data: loginData 
    });
    const response = await createToken.json();
    const token = await response['userToken'];
    use(token);
  }
});
