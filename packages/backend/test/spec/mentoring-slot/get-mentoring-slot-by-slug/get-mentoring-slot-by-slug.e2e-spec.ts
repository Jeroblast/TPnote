import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

describe('Get Missed Mentoring Slots ', () => {
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

  it ('should return a mentoring slot by slug', async () => {

    //Arrange
    //Créer une permanance en bdd avec was missed à true

    const mentoringSlot = mentoringSlotBuilder().build();
    const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);

    console.log(mentoringSlotInDb)

    //Act
    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get(`/api/mentoring-slots/by-slug/${mentoringSlotInDb.slug}`);

    //Assert
    expect(getMissedMentoringSlotsResponse.status).toBe(200);
    expect(getMissedMentoringSlotsResponse.body.id).toEqual(mentoringSlotInDb.id);


  });

  it ('should return a 404 if the mentoring slot by slug does not exist', async () => {

    //Arrange
    //Créer une permanance en bdd avec was missed à true


    //Act
    const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/by-slug/elfamosojp');

    //Assert
    expect(getMissedMentoringSlotsResponse.status).toBe(404);
  });


  //s'execute après tous les tests de ce fichier
  //permet de supprimer  les données de la db et de fermer la connexion
  afterAll(async ()=> {
    await cleanApp(app, connection);
  });

});


