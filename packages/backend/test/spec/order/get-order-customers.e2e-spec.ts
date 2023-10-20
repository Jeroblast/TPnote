import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';

import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get  order for customers after date ', () => {
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

  it('should return orders by customer', async () => {
    // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
    // récupèrer la réponse HTTP

    const getOrdersCustomersResponse = await request(app.getHttpServer()).get('/api/orders/customers/pepechicken');

    console.log(getOrdersCustomersResponse.error)

    // vérifier que la réponse a bien un status 200
    expect(getOrdersCustomersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getOrdersCustomersResponse.body).toEqual([]);


  });

  it ('Should return empty array if no orders for this customer', async () => {

    //Act
    const getOrdersCustomersResponse = await request(app.getHttpServer()).get('/api/orders/by-customers/ElFamosoJP');

    //Assert
    expect(getOrdersCustomersResponse.status).toBe(404);
  });

  //s'execute après tous les tests de ce fichier
  //permet de supprimer  les données de la db et de fermer la connexion
  afterAll(async ()=> {
    await cleanApp(app, connection);
  });

});