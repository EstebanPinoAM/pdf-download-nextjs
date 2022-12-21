const GetRiskName = (risk) => {
    let asegurado = ""
    for (let party of risk.parties) {
      if (party.party_rol == 'Asegurado') {
        asegurado = party[party.party_type].identification_number
      }
    }
    return `${risk.business_line.toUpperCase()}-${asegurado}-${risk.insurable_objects[0].tag}`
  }

export { GetRiskName };