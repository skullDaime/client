import { gql } from 'graphql-tag'
export const QUERY = gql`
{
    allUserComplete{
      id
      name
    }
}

`;