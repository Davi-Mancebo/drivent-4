import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createNewRoom, getRoomOfUser, updateRoom } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getRoomOfUser)
  .post('/', createNewRoom)
  .put('/:bookingId', updateRoom);

export { bookingRouter };
