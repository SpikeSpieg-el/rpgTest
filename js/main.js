//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    // Подключение VK Bridge
    vkBridge.send('VKWebAppInit');

    // Подключение к событиям VK Bridge
    vkBridge.subscribe((event) => {
        console.log(event);
        if (event.detail.type === 'VKWebAppUpdateConfig') {
            const schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = event.detail.data.scheme ? event.detail.data.scheme : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
        }
    });

    // Инициализация игры
    SceneManager.run(Scene_Boot);
};
