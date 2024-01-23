var gql = require("@apollo/client").gql;

export const TARIFF_IN_ANTI_FILTER = gql`
  query TariffInAntiFilter(
    $region: String
    $providerId: Int
    $internet: Int
    $calls: Int
    $price: Int
    $fix: String
    $providerJoin: Boolean
    $with_aggregate: Boolean
    $switch: String
  ) {
    tariffInAntiFilter(
      region: $region
      providerId: $providerId
      internet: $internet
      calls: $calls
      price: $price
      fix: $fix
      providerJoin: $providerJoin
      with_aggregate: $with_aggregate
      switch: $switch
    ) {
      data {
        name
        displayPrice
        mobile_new {
          internet
          calls
        }
        social_unlim {
          whatsapp
          telegram
          viber
          discord
          skype
          vk
          ok
          tiktok
          youtube
          snapchat
        }
        provider {
          id
          name
          logo
          logo_2
          operator_settings {
            tariffs {
              url
              button_text
            }
          }
        }
      }
      aggregationTariffs {
        providers {
          id
        }
        internet
        calls
        price
      }
    }
  }
`;


