import { prisma } from '@/config';

async function getBookingByUserId(id: number) {
  const booking = await prisma.booking.findFirst({ where: { userId: id } });
  return booking;
}
async function getRoomByRoomId(roomId: number) {
  const room = await prisma.room.findFirst({ where: { id: roomId } });
  return room;
}
async function getRoomsWithUsersByRoomId(roomId: number) {
  return await prisma.booking.findMany({ where: { roomId: roomId } });
}
async function confirmRoom(bookingId: number, roomId: number) {
  return await prisma.booking.update({ where: { id: bookingId }, data: { roomId: roomId } });
}
async function updateRoom(roomId: number, id: number) {
  return await prisma.booking.update({where: {id: id}, data: {roomId: roomId}})
}

const bookingRepository = { getBookingByUserId, getRoomByRoomId, getRoomsWithUsersByRoomId, confirmRoom, updateRoom };

export default bookingRepository;
