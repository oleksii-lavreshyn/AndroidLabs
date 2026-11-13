import { calculateStars } from '@/utils/rating';
describe('calculateStars',()=>{it('calculates full, half and empty stars',()=>{expect(calculateStars(3.5)).toEqual(['full','full','full','half','empty']);});it('clamps values',()=>{expect(calculateStars(8)).toEqual(['full','full','full','full','full']);expect(calculateStars(-2)).toEqual(['empty','empty','empty','empty','empty']);});});
