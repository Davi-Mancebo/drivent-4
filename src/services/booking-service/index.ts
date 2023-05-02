import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getRoomByUserId(id: number) {
  const bookingData = await bookingRepository.getBookingByUserId(id);
  if(!bookingData) throw notFoundError()
  const roomData = await bookingRepository.getRoomByRoomId(bookingData.roomId);

  const data = {
    id: bookingData.id,
    Room: roomData,
  };
  return data;
}
async function getByRoomId(id: number) {
  return await bookingRepository.getRoomByRoomId(id)
}

async function createNewBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);

  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollments.id);
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === 'RESERVED') {
    return false;
  }

  const roomWithUser = await bookingRepository.getRoomsWithUsersByRoomId(roomId);
  if (roomWithUser[0].id) return false;

  await bookingRepository.confirmRoom(booking.id, roomId);

  return booking;
}
async function updateRoom(userId: number, roomId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);
  if (!booking) return false;

  const room = await bookingRepository.getRoomByRoomId(roomId);
  if (!room) throw notFoundError();

  const roomWithUser = await bookingRepository.getRoomsWithUsersByRoomId(roomId);
  if(roomWithUser[0].id) return false

  await bookingRepository.updateRoom(roomId, booking.id)
  return booking;
}

const bookingService = { getRoomByUserId, createNewBooking, updateRoom, getByRoomId };

export default bookingService;
