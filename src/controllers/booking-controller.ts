import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getRoomOfUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const data = await bookingService.getRoomByUserId(userId);

    return res.send(data);
  } catch (erro) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(erro.message);
  }
}
