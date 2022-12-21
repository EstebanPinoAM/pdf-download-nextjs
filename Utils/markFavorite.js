import axios from "axios";
const url = new URLSearchParams(window.location.search);


const mark_Favorite = async (order_id) => {

  const body = {
      name: "mark_favorite_order",
      order_id: order_id,
      tenant_data: {
          "name": window.odoo?.session_info?.db || url.get("tenant") || window.location.host
        }
    }

  return await axios
    .post("https://6c11c7i3cb.execute-api.us-east-2.amazonaws.com/v1/crm/v2", body)
    .then((res) => (res))
    .catch((err) =>( 
          console.log(err)
      ))
};

const markFavorite = async (order_id) => {
  const body = {
    name: "mark_favorite_order",
    order_id: order_id,
    tenant_data: {
        "name": window.odoo?.session_info?.db || url.get("tenant") || window.location.host
      }
  }
  return await fetch("https://6c11c7i3cb.execute-api.us-east-2.amazonaws.com/v1/crm/v2",{
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}
  
  export { markFavorite }