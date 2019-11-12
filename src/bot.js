// Importing the dotenv file configuration.
require('dotenv/config')

// Importing the Client and Collection from discord.js.
// More info about those variables under.
const { Client, Collection } = require('discord.js')

// In this project, fs is used to import every command.
// All the commands are inside the 'commands' folder.
const fs = require('fs')

// Bot initialization
const Bot = new Client()

// Creating a collection of commands inside the Bot variable.
// The Bot will use the commands that are inside this variable.
Bot.commands = new Collection()

// Store every file that ends with .js (every javascript file)
const CommandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))

// Loop for each file inside the CommandFiles variable.
for (const file of CommandFiles) {
  // Import the current file in the loop.
  const Command = require(`./commands/${file}`)

  // Grab the name variable from the imported file.
  const { name } = Command

  // Set a new command for the bot with the name, and the imported file.
  Bot.commands.set(name, Command)
}

// Example of an event.
// When every command is imported, and the bot is logged in,
// The message 'The Bot is ready...' will pop up in the console.
Bot.on('ready', () => console.log('The Bot is ready...'))

// Message event.
// When a message is sent in the chat,
// this event is called.

Bot.on('message', message => {
  const { content, author } = message

  // Get your command prefix.
  const prefix = String(process.env.COMMAND_PREFIX)

  // Check if the message does not starts with your prefix,
  // or if the author of the message is the bot.
  // It will not execute.
  if (!content.startsWith(prefix) || author.bot) {
    return
  }

  // Grab the arguments of the message, if any.
  const args = content.slice(prefix.length).split(/ +/)

  // Make the command lowercase,
  // to compare with your commands.
  const command = args.shift().toLowerCase()

  // If your bot does not have that command,
  // just return nothing.
  if (!Bot.commands.has(command)) {
    return
  }

  // If the command was found, the bot will
  // try to execute it.
  try {
    // Execute the command.
    Bot.commands.get(command).execute(message, args)
  } catch (error) {
    // If an error is found during the executed of the command.
    message.reply(`An Error as occured: ${error}`)
  }
})

// Login the bot.
Bot.login(process.env.BOT_TOKEN)

// To learn and try new events and methods
// visit the discord.js documentation.
// Docs: https://discord.js.org/#/docs/main/stable/general/welcome
