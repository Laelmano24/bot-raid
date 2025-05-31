const servers_select = document.getElementById("servidores-id")

async function send_servers() {
    const host = window.location.origin
    const response = await fetch(`${host}/get-servers-bot`)
    const data = await response.json()

    servers_select.innerHTML = ""

    data.forEach(server => {
        const option = document.createElement("option")
        option.value = server.id
        option.textContent = server.name
        servers_select.appendChild(option)
    });
}

send_servers()
