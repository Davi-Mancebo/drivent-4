import { notFoundError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getRoomOfUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const data = await bookingService.getRoomByUserId(userId);
    if (!data.id) {
      throw notFoundError();
    }

    return res.status(httpStatus.OK).send(data);
  } catch (erro) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(erro.message);
  }
}

export async function createNewRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  try {
    const roomData = await bookingService.getByRoomId(roomId)
    if(!roomData) throw notFoundError()

    const data = await bookingService.createNewBooking(userId, roomId);
    if (data === null) {
      return res.sendStatus(404);
    }
    if (data === false) {
      return res.sendStatus(403);
    }

    return res.status(httpStatus.OK).send(data.id);
  } catch (err) {
    return res.status(500).send(err);
  }
}
export async function updateRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try{
    const roomData = await bookingService.getByRoomId(roomId)
    if(!roomData) throw notFoundError()
    
    const data = await bookingService.updateRoom(userId, roomId)
    if(!data) return res.sendStatus(403)

    return res.status(httpStatus.OK).send(data.id)
  }catch(err){
    return res.status(404).send(err)
  }
}
