var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    if (devices.length > 0)
      disableAirlink();
    else
      enableAirlink();
  })

client.trackDevices()
  .then(function(tracker) {
    tracker.on('add', function(device) {
      console.log('Device %s was plugged in', device.id)
      disableAirlink();
    })
    tracker.on('remove', function(device) {
      console.log('Device %s was unplugged', device.id)
      enableAirlink();
    })
    tracker.on('end', function() {
      console.log('Tracking stopped')
    })
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })

function enableAirlink() {
  console.log(`[AirLink-Automatic] Turning on Air Link...`);
  var settings = document.getElementsByClassName("navigation-pane__link--settings")[0];
  setTimeout(() => {
      settings.click();  
  }, 1);
  

  setTimeout(() => {
      const beta = document.getElementsByClassName("pivot-item__link")[4];
      beta.click();
      setTimeout(() => {
          const airLink = document.getElementsByClassName("polaris-option-input__invisible")[1];
          const airLinkoff = document.getElementsByClassName("polaris-option-input__component--toggle")[1];
          if (airLinkoff.classList.contains("polaris-option-input__component--checked")){
              console.log("[AirLink-Automatic] Air Link is already on, skipping...");
          } else {
              airLink.click();
              console.log("[AirLink-Automatic] Air Link turned on!");
              console.log(airLink);
      }},1);
      setTimeout(() => {
          const home = document.getElementsByClassName("navigation-pane__link--library")[0];
          home.click();
          console.log("[AirLink-Automatic] Returning to Library...");
      }, 2);    
  }, 1);

}

function disableAirlink() {
    console.log(`[AirLink-Automatic] Turning off Air Link...`);
    var settings = document.getElementsByClassName("navigation-pane__link--settings")[0];
    setTimeout(() => {
        settings.click();  
    }, 1);
    
  
    setTimeout(() => {
        const beta = document.getElementsByClassName("pivot-item__link")[4];
        beta.click();
        setTimeout(() => {
            const airLink = document.getElementsByClassName("polaris-option-input__invisible")[1];
            const airLinkoff = document.getElementsByClassName("polaris-option-input__component--toggle")[1];
            if (airLinkoff.classList.contains("polaris-option-input__component--checked")){
                console.log("[AirLink-Automatic] Air Link is now off.");
                airLink.click();
            } else {
                console.log("[AirLink-Automatic] Air Link already off.");
                console.log(airLink);
        }},1);
        setTimeout(() => {
            const home = document.getElementsByClassName("navigation-pane__link--library")[0];
            home.click();
            console.log("[AirLink-Automatic] Returning to Library...");
        }, 2);    
    }, 1);
  
}


module.exports = {
    id: "AirLink-Automatic",
    name: "Automatically toggle Airlink when headset is plugged in.",
    init() {
      console.log('[AirLink-Automatic] Enabling plugin.');
    },
    uninit() {
        console.log('[AirLink-Automatic] Disabling plugin.');
    }
};