import axios from 'axios';

export const getKeycloakToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', 'gateway');
  params.append('client_secret', 'kfjHnDqJ3cAYHD2UwnpIzM2xpsKeulMw');
  params.append('scope', 'openid offline_access');

  try {
    const response = await axios.post(
      'http://localhost:8080/realms/JobBoardKeycloack/protocol/openid-connect/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error obtaining Keycloak access token:', error);
    throw error;
  }
};
