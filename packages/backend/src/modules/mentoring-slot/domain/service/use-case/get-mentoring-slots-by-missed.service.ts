import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';

export class GetMentoringSlotsByMissedService {
  constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) {}

  async getMentoringSlotsByMissed(IsUserAuthenticated: boolean = true): Promise<MentoringSlot[]> {

    if(!IsUserAuthenticated){
      throw new Error('User is authenticated');
    }

    const mentoringSlots = await this.mentoringSlotRepository.findMentoringSlotsByMissed();
    return mentoringSlots;
  }
}
