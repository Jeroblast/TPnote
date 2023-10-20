import { GetMentoringSlotsByMissedService } from "../get-mentoring-slots-by-missed.service";

describe('Get mentoring slot by missed if the user is authenticated', () => {


    it('shoudl return  the mentoring slot by missed if the user is authenticated', async () => {

        const mentoringSlotsMissedMock = [{
            id:1,
        }]

        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed: () => 
                mentoringSlotsMissedMock
            
        };
        

        const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);
        const returnValue = await getMentoringSlotsByMissedService.getMentoringSlotsByMissed(true);
        expect(returnValue).toEqual(mentoringSlotsMissedMock);
        

    });


    it('should return error if the user is not authenticated', async () => {

        const mentoringSlotsMissedMock = [{
            id:1,
        }]

        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed: () => 
                mentoringSlotsMissedMock         
        };

        const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);

        await expect(getMentoringSlotsByMissedService.getMentoringSlotsByMissed(false)).rejects.toThrow('User is authenticated');

    })


});