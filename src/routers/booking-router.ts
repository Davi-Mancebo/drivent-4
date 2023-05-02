import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getRoomOfUser } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getRoomOfUser)
  .post('/', );

export { bookingRouter };
