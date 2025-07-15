export function setupChat(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on('chatMessage', ({ roomId, message, sender }) => {
      io.to(roomId).emit('chatMessage', { sender, message, timestamp: new Date() });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
