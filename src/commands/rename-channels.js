import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const filepath = import.meta.url
const __dirname = path.dirname(fileURLToPath(filepath))

function getRenameJson() {
    const dataJson = fs.readFileSync(path.join(__dirname, "..", "..", "bot.json"))
    if (dataJson) {
        const data = JSON.parse(dataJson)
        return data.channelRename
    }
}

async function rename_channel(client, serverId) {
    const servidor = await client.guilds.fetch(serverId)
    const channels = await servidor.channels.fetch()
    const nameRename = getRenameJson()

    channels.forEach(channel => {
        channel.setName(nameRename)
    })
}

export default rename_channel
