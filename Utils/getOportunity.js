export const getOportunity = async (origin, name, token) => {
    // return await fetch(`${origin}/crm/get_opportunity_client?oportunity=${name}&access_token=${token}`).then(
  return await fetch(`${origin}/crm/get_opportunity?oportunity=${name}&no_filter=1`).then(
    (res) => {
      return res.json()
    }
  );
};

export const getOportunityClient = async (origin, name, token) => {
    return await fetch(`${origin}/crm/get_opportunity_client?oportunity=${name}&access_token=${token}`).then(
  //return await fetch(`${origin}/crm/get_opportunity?oportunity=${name}&no_filter=1`).then(
    (res) => {
      return res.json()
    }
  );
};

export const updateOffersOnCRM = async (data) => {
  const body = data
  return await fetch(`${origin}/crm/order_offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(
    (res) => {
      return res.json()
    }
  );
};