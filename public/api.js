let companies = [];
let coordinates = {};
let requests;
/**
 * @description adding data directly (requires auth)
 */
export async function add(formData) {
  console.log(formData);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  const res = await fetch(`/api/add`, {
    method: "POST",
    headers: {
      accept: "application/json;",
    },
    body: formData,
  });
  let dataa = await res.json();
  if (dataa.success) {
    // window.location.reload();
  }
}

/**
 * @description requesting data change (requires wallet connection)
 */
export async function request(formData) {
  console.log(formData);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  const res = await fetch(`/api/request`, {
    method: "POST",
    headers: {
      accept: "application/json;",
    },
    body: formData,
  });
  let data = await res.json();
  if (data.success) {
    window.location.reload();
  }
}

export async function getRequests(context) {
  const res = await fetch(`/api/getRequests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; charset=utf-8;",
    },
  });

  let data = await res.json();
  requests = data.requests;
  return requests;
}

export async function get(context) {
  const res = await fetch(`/api/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; charset=utf-8;",
    },
  });

  let data = await res.json();
  console.log(data);
  companies = data.com;
  loadData();
  console.log(companies);
  return companies;
}

function loadData() {
  if (companies.length > 0) {
    companies.forEach((company) => {
      coordinates[company.coordinates] = company;
    });
  }
  console.log(coordinates);
}

function logout(e) {
  e.preventDefault();
  document.cookie = `token=${null}`;
  window.location.reload();
}
