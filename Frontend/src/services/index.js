export const registerUserService = async ({ name, email, password }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/accounts`,
    {
      //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
};

export const loginUserService = async ({ email, password }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth`, {
    //aqui vamos a enviar datos al servidor,hacemos un fetch a la direccion,y despues le tenemos que mandar el metodo y el tipo de dato que le mandamos,a continuacion postman no recibe objetos por eso pasamos a texto con stringify
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  //pendiente de meterle un error si no deja crearla
  return json.data;
};
// en este archivo vamos a crear todas las funciones asíncronas que se encarguen de la comunicación con la base de datos

export const getAllRecommendationsService = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations`
  );

  const json = await response.json();
  console.log(json);
  if (!response.ok) {
    throw new Error(json.message);
  }
  // OJO!!! necesito recuperar más cosas de abajo!!!
  return json.recommendations;
};

export const getSingleRecommendationService = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}/api/recommendations/${id}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
  return json[0];
};

