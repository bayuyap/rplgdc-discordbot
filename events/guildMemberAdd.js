module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome-hackers👋🏻');
  channel.send(
    `Welcome on the server, ${member}!
    Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`
  )
}