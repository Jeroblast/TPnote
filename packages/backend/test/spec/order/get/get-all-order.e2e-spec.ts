import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';

import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get All order ', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  // beforeAll est fonction mise à dispo par Vitest (framework de test)
  // qui sera executée avant tous les tests
  // permet de créer l'application et la connection à la base de données
  // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return all order in DB', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/all-order');

    console.log(getAllOrdersResponse.error)

    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getAllOrdersResponse.body).toEqual([]);
    // même chose que :
    expect(getAllOrdersResponse.body.length).toBe(0);

  });

  it ('should return a 404 if orders does not exist', async () => {

    //Act
    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/');

    //Assert
    expect(getAllOrdersResponse.status).toBe(404);
  });

  //s'execute après tous les tests de ce fichier
  //permet de supprimer  les données de la db et de fermer la connexion
  afterAll(async ()=> {
    await cleanApp(app, connection);
  });

});


