import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { ChannelType } from 'discord.js'

const filepath = import.meta.url
const __dirname = path.dirname(fileURLToPath(filepath))

function getRenameJson() {
  try {
    const dataJson = fs.readFileSync(path.join(__dirname, "..", "..", "bot.json"), 'utf-8')
    const data = JSON.parse(dataJson)
    return data.channelRename || "canal-default"
  } catch (error) {
    console.error("Erro ao ler ou parsear bot.json:", error)
    return "canal-default"
  }
}

function create_channel(client, serverId) {
  return new Promise(async (resolve, reject) => {
        const servidor = await client.guilds.fetch(serverId)
        const channels = await servidor.channels.fetch()
        const nameRename = getRenameJson()

        for (let i = 1; i <= 100; i++) {
            try {
                await servidor.channels.create({
                    name: nameRename,
                    type: ChannelType.GuildText,
                })
                
            } catch (err) {
                console.log("Hello world erro mizera " + err)
                reject()
            }
        }
        resolve()
  })
}

export default create_channel
