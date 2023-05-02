import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getRoomByUserId(id: number) {
  const bookingData = await bookingRepository.getBookingByUserId(id);
  const roomData = await bookingRepository.getRoomByRoomId(bookingData.roomId);

  const data = {
    id: bookingData.id,
    Room: roomData,
  };
  return data;
}

async function createNewBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);

  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollments.id);
  const room = await bookingRepository.getRoomByRoomId(roomId);
  const roomWithUser = await bookingRepository.getRoomsWithUsersByRoomId(roomId);
  if (
    !room ||
    roomWithUser[0].id ||
    ticket.TicketType.isRemote === true ||
    ticket.TicketType.includesHotel === false ||
    ticket.status === 'RESERVED'
  )
    return false;

  await bookingRepository.confirmRoom(booking.id, roomId);

  return booking.id;
}

const bookingService = { getRoomByUserId, createNewBooking };

export default bookingService;
