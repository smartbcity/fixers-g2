import { request } from 'utils'
import { Organization } from './OrgCreation'

export const getOrganization = async (
  siret: string
): Promise<Partial<Organization> | undefined> => {
  const response = await request({
    url: `https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`,
    method: 'GET',
    jwt: '509653ea-4043-33cd-8433-e9c055f8da88'
  })

  return response ? toOrganizationDetails(response) : undefined
}

export const toOrganizationDetails = (data: any): Partial<Organization> => {
  const establishment = data.etablissement
  const address = data.etablissement.adresseEtablissement

  const streetNumber: string = address.numeroVoieEtablissement ?? ''
  const streetType: string = address.typeVoieEtablissement ?? ''
  const streetName: string = address.libelleVoieEtablissement ?? ''

  return {
    name:
      establishment.uniteLegale.denominationUniteLegale ||
      establishment.uniteLegale.denominationUsuelle1UniteLegale ||
      establishment.uniteLegale.denominationUsuelle2UniteLegale ||
      establishment.uniteLegale.denominationUsuelle3UniteLegale,
    address: streetNumber + ' ' + streetType + ' ' + streetName,
    city: address.libelleCommuneEtablissement,
    postalCode: address.codePostalEtablissement
  }
}
