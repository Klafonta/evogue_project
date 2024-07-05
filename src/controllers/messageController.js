exports.getMessages = (req, res) => {
  console.log('GET /api/messages called');
  res.send(req.body);
};

exports.createMessage = (req, res) => {
  console.log('POST /api/messages called');
  console.log(req.body);
  res.json(req.body);
};

exports.deleteMessage = (req, res) => {
  console.log('DELETE /api/messages/:id called');
  res.send('Message deleted');
};
