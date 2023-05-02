import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsWithRooms } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter
    .all('/*', authenticateToken)
    .get('/', getHotels)
    .post('/:hotelId', getHotelsWithRooms)
    .put('/');

export { hotelsRouter };
