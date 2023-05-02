import { prisma } from '@/config';

async function getBookingByUserId(id: number) {
  const booking = await prisma.booking.findFirst({ where: { userId: id } });
  return booking;
}
async function getRoomByRoomId(roomId: number) {
  const room = await prisma.room.findFirst({ where: { id: roomId } });
  return room;
}

const bookingRepository = { getBookingByUserId, getRoomByRoomId };

export default bookingRepository;
