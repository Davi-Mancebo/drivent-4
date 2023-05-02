import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function getRoomByUserId(id: number) {
  const bookingData = await bookingRepository.getBookingByUserId(id);
  if (!bookingData) throw notFoundError();
  const roomData = await bookingRepository.getRoomByRoomId(bookingData.roomId);

  const data = {
    id: bookingData.id,
    Room: roomData,
  };
  return data;
}
async function createNewBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking) throw notFoundError();

  const room = await bookingRepository.getRoomByRoomId(roomId);
  const roomWithUser = await bookingRepository.getRoomsWithUsersByRoomId(roomId);
  if (!room || roomWithUser[0].id) return false;

  await bookingRepository.confirmRoom(booking.id, roomId);

  return booking.id;
}

const bookingService = { getRoomByUserId, createNewBooking };

export default bookingService;
