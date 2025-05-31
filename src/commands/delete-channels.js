function delete_canais(client, serverId) {
    return new Promise(async (resolve, reject) => {
        const servidor = await client.guilds.fetch(serverId)
        const channels = await servidor.channels.fetch()

        channels.forEach(channel => {
            if (channel) {
                channel.delete()
            }
        })
        resolve()
    })
}

export default delete_canais
