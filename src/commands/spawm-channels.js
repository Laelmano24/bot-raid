import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const filepath = import.meta.url
const __dirname = path.dirname(fileURLToPath(filepath))

function getMessageJson() {
    const dataJson = fs.readFileSync(path.join(__dirname, "..", "..", "bot.json"))
    if (dataJson) {
        const data = JSON.parse(dataJson)
        return data.messageSpawm
    }
}

async function spawmar_canal(client, serverId) {
    const servidor = await client.guilds.fetch(serverId)
    const channels = await servidor.channels.fetch()
    const message = getMessageJson()

    channels.forEach(channel => {
        if (channel && channel.isTextBased && channel.isTextBased()) {
            const botPerms = channel.permissionsFor(servidor.members.me)
            if (botPerms && botPerms.has("SendMessages")) {
                for (let i = 1; i <= 100; i ++ ) {
                    channel.send(message)
                }
            }
        }
    })
}

export default spawmar_canal
