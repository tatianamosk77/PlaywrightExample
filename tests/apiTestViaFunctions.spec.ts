import { APIRequestContext, expect, test } from "@playwright/test";

const host = "https://x-clients-be.onrender.com";
const auth = "/auth/login"; // https://x-clients-be.onrender.com/docs/#/auth/AuthController_login
const company = "/company"; // https://x-clients-be.onrender.com/docs/#/company/CompanyController_add
const companyDelete = company + "/delete"; 


const loginData = {
  username: "leonardo",
  password: "leads",
};


async function getAuthToken(request) {
const authResponse = await request.post(host + auth, { data: loginData });
const authBody = await authResponse.json();
const token = authBody["userToken"];

    return token;
}

async function createNewCompany(request: APIRequestContext) {
    const token = await getAuthToken(request);
    const response = await request.post(host + company, {
        headers: { "x-client-token": token },
        data: {
          name: "Company 6",
          description: "Description for 6",
        },
      });
      const body = await response.json();
      return body['id'];
}

async function getCompanyById(request) {
    const idCompany = await createNewCompany(request);
    const response = await request.get(host + company + '/' + idCompany);
    return response.json();    
}


async function deleteCompanyById(request: APIRequestContext) {
    const idCompany = await createNewCompany(request);
    const token: any = await getAuthToken(request);
    const response = await request.get(host + companyDelete + '/' + idCompany, {
        headers: { "x-client-token": token }
      });
    return response;    
}

test("Get the information of company by id", async ({ request }) => {
  const companyResult = await getCompanyById(request);
  console.log(companyResult);
  expect(await companyResult).toHaveProperty("id");
  expect(await companyResult).toHaveProperty("name");
  expect(await companyResult).toHaveProperty("description");
  expect(await companyResult).toHaveProperty("isActive");


});

test("Delete the company by id", async ({ request }) => {
    const deleteResult = await deleteCompanyById(request);
    console.log((await deleteResult).json());
    expect(await deleteResult.status()).toEqual(200);
  
  });


  test("Edit the company", async ({ request }) => {
    const idCompany = await createNewCompany(request);
    const token: any = await getAuthToken(request);
    const newName = "Company 7";
    const newDescription = "Description for new company!!!";

    const response = await request.patch(host + company + '/' + idCompany, {
        headers: { "x-client-token": token },
        data: {
          name: newName,
          description: newDescription,
        },
      });
      const formattedResp = await response.json();

      expect(await response.status()).toEqual(200);
      expect(await formattedResp['name']).toEqual(newName);
      expect(await formattedResp['description']).toEqual(newDescription);

  
  });