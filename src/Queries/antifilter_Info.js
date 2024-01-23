var gql = require("@apollo/client").gql;

export const ANTIFILTER_INFO = gql`
  query infoText($type: String!) {
    infoText(type: $type) {
      title
      text
    }
  }
`;
