import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function getRoomByUserId(id: number) {
  const bookingData = await bookingRepository.getBookingByUserId(id);
  if (!bookingData) throw notFoundError();
  const roomData = await bookingRepository.getRoomByRoomId(bookingData.roomId);
    
  const data = {
        id: bookingData.id,
        Room: roomData
    }
  return data;
}

const bookingService = { getRoomByUserId };

export default bookingService;
