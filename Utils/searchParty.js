const searchParty = (vehicle,rol)=>{
    let answ = null
    vehicle.risk_in.parties.map((party) =>{
      if (party.party_rol === rol){
        answ = party
      } 
    })
    return answ;
  }

  export {searchParty}