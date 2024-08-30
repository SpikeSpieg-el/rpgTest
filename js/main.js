//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    // Инициализация VK Bridge
    vkBridge.send("VKWebAppInit", {})
        .then(() => {
            console.log('VK Bridge инициализирован');

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
        })
        .catch((error) => {
            console.error('Ошибка при инициализации VK Bridge:', error);
        });
        bridge.send('VKWebAppShowBannerAd', {
            banner_location: 'bottom'
            })
           .then((data) => { 
              if (data.result) {
                // Баннерная реклама отобразилась
              }
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });
}