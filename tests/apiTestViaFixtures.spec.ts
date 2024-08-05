import { APIRequestContext, APIResponse, expect} from "@playwright/test";
import { test } from "../fixtures/my.fixture"; 

const host = "https://x-clients-be.onrender.com";
const companyPath = "/company"; // https://x-clients-be.onrender.com/docs/#/company/CompanyController_add

test("Information about the company", async ({ request, company }) => {
    const response = await request.get(`${host}${companyPath}/${company.id}`);
    const body = await response.json();
  
    expect(response.status()).toEqual(200);
    expect(body['isActive']).toBeTruthy();
    expect(body['name']).toEqual(company.name);
   
  });

  test("Edit the company", async ({ request, company, token }) => {

    const newName = "Company 7";
    const newDescription = "Description for new company!!!";

    const response = await request.patch(host + companyPath + '/' + company.id, {
        headers: { "x-client-token": token },
        data: {
          name: newName,
          description: newDescription,
        },
      });
      const formattedResp = await response.json();

      expect(response.status()).toEqual(200);
      expect(await formattedResp['name']).toEqual(newName);
      expect(await formattedResp['description']).toEqual(newDescription);

  
  });