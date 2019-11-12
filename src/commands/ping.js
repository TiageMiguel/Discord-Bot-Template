// Model to create new commands.
// Simply export an object with name and a function,
// 'execute', that will be executed when the
// command is called.
module.exports = {
  // Name of the command to be used in the chat.
  name: 'ping',

  // A simple description of the command.
  description: 'A simple ping command!',

  // This function will be executed when the command is called.
  execute (message) {
    // reply to the user who wrote the command 'ping'.
    message.reply('Pong!')
  }
}
